import redis from 'lib/redis'
import {v4 as uuidv4} from 'uuid'

// POST handler for creating a project
export async function POST(req) {
  try {
    // Extract user ID and project name from the request body
    const {userId, projectName} = await req.json()

    // Generate a unique project ID
    const projectId = uuidv4()

    // Store project ID and name in a Redis hash (e.g., 'projects')
    await redis.hset('projects', projectId, projectName)

    // Update the user's project list in Redis
    await redis.hset(`user:${userId}:projects`, projectId, projectName)

    // Additional project initialization can be done here

    // Return a successful response
    return Response.json({
      projectId,
      projectName,
      message: 'Project created successfully',
    })
  } catch (error) {
    console.error('Error creating project:', error)
    return new Response(JSON.stringify({message: 'Error creating project'}), {
      status: 500,
    })
  }
}

// DELETE handler for deleting a project
export async function DELETE(req) {
  try {
    // Extract project ID and user ID from the request body
    const {projectId, userId} = await req.json()

    // Check if the project exists
    const projectExists = await redis.hexists('projects', projectId)
    if (!projectExists) {
      return new Response(JSON.stringify({message: 'Project not found'}), {
        status: 404,
      })
    }

    // Delete the project from the 'projects' hash
    await redis.hdel('projects', projectId)

    // Update the user's project list
    await redis.hdel(`user:${userId}:projects`, projectId)

    // Delete all pages associated with the project
    const pagesKeyPattern = `page:${projectId}:*`
    const pageKeys = await redis.keys(pagesKeyPattern)
    for (const pageKey of pageKeys) {
      await redis.del(pageKey)
    }

    return new Response(
      JSON.stringify({message: 'Project and its pages deleted successfully'}),
      {status: 200},
    )
  } catch (error) {
    console.error('Error deleting project:', error)
    return new Response(JSON.stringify({message: 'Error deleting project'}), {
      status: 500,
    })
  }
}

// GET handler for fetching projects for a specific user
export async function GET(req) {
  try {
    // Extract searchParams from the request URL
    const {searchParams} = new URL(req.url)
    const userId = searchParams.get('userId')

    // Validate the userId
    if (!userId) {
      return new Response(JSON.stringify({message: 'User ID is required'}), {
        status: 400,
      })
    }

    // Fetch projects associated with the user
    const userProjects = await redis.hgetall(`user:${userId}:projects`)
    if (!userProjects) {
      return new Response(
        JSON.stringify({message: 'No projects found for this user'}),
        {status: 404},
      )
    }

    // Format the response
    const formattedProjects = Object.entries(userProjects).map(
      ([projectId, projectName]) => ({
        projectId,
        projectName,
      }),
    )

    return Response.json(formattedProjects)
  } catch (error) {
    console.error('Error fetching user projects:', error)
    return new Response(
      JSON.stringify({message: 'Error fetching user projects'}),
      {status: 500},
    )
  }
}
