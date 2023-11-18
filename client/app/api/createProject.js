import redis from 'lib/redis'
import {v4 as uuidv4} from 'uuid'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Extract user ID and project name from the request body
      const {userId, projectName} = req.body

      // Generate a unique project ID
      const projectId = uuidv4()

      // Store project ID and name in a Redis hash (e.g., 'projects')
      await redis.hset('projects', projectId, projectName)

      // Update the user's project list in Redis (e.g., 'user:{userId}:projects')
      await redis.hset(`user:${userId}:projects`, projectId, projectName)

      // Each project can have its own dict as well, which can be initialized here if needed
      // Example: await redis.hset(`project:${projectId}:details`, ...);

      // Send a successful response
      res
        .status(200)
        .json({projectId, projectName, message: 'Project created successfully'})
    } catch (error) {
      console.error('Error creating project:', error)
      res.status(500).json({message: 'Error creating project'})
    }
  } else {
    // Handle non-POST requests
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
