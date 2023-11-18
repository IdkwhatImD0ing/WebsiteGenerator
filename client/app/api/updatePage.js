import redis from 'lib/redis'

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      // Extract user ID, project ID, page UUID, and new page data from the request body
      const {userId, projectId, pageId, newData} = req.body

      // Optionally, add authentication and authorization checks here

      // Check if the project belongs to the user
      const userProjectExists = await redis.hexists(
        `user:${userId}:projects`,
        projectId,
      )
      if (!userProjectExists) {
        return res
          .status(404)
          .json({message: 'Project not found or does not belong to the user'})
      }

      // Construct the full page Redis key
      const pageKey = `page:${projectId}:${pageId}`

      // Check if the page exists
      const pageExists = await redis.exists(pageKey)
      if (!pageExists) {
        return res.status(404).json({message: 'Page not found'})
      }

      // Update the page data
      await redis.hset(pageKey, 'data', JSON.stringify(newData))

      res.status(200).json({message: 'Page updated successfully'})
    } catch (error) {
      console.error('Error updating page:', error)
      res.status(500).json({message: 'Error updating page'})
    }
  } else {
    // Handle non-PUT requests
    res.setHeader('Allow', ['PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
