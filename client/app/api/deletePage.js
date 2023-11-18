import redis from 'lib/redis'

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      // Extract user ID, project ID, and page UUID from the request body
      const {userId, projectId, pageId} = req.body

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

      // Delete the page
      await redis.del(pageKey)

      // Optionally, remove the pageId from the project's page list/set
      // Example: await redis.srem(`project:${projectId}:pages`, pageKey);

      res.status(200).json({message: 'Page deleted successfully'})
    } catch (error) {
      console.error('Error deleting page:', error)
      res.status(500).json({message: 'Error deleting page'})
    }
  } else {
    // Handle non-DELETE requests
    res.setHeader('Allow', ['DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
