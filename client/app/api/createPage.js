import redis from 'lib/redis'
import {v4 as uuidv4} from 'uuid'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Extract project ID and user ID from the request body
      const {userId, projectId, pageName} = req.body

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

      // Generate a unique UUID for the page
      const pageId = uuidv4()

      // Initialize the page with an empty object and store the page name
      await redis.hset(
        `page:${projectId}:${pageId}`,
        'data',
        '{}',
        'name',
        pageName,
      )

      // Optionally, store the pageId in a set/list under the project
      // Example: await redis.sadd(`project:${projectId}:pages`, `page:${projectId}:${pageId}`);

      res.status(200).json({pageId, message: 'Page created successfully'})
    } catch (error) {
      console.error('Error creating page:', error)
      res.status(500).json({message: 'Error creating page'})
    }
  } else {
    // Handle non-POST requests
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
