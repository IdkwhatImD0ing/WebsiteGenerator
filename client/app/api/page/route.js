import redis from 'lib/redis'
import {v4 as uuidv4} from 'uuid'

// GET handler for fetching page content
export async function GET(req) {
  try {
    // Extract project ID and page ID from the search params
    const {searchParams} = new URL(req.url)
    const projectId = searchParams.get('projectId')
    const pageId = searchParams.get('pageId')

    // Construct the full page Redis key
    const pageKey = `page:${projectId}:${pageId}`

    // Fetch the page content
    const pageData = await redis.hget(pageKey, 'data')
    if (pageData === null) {
      return new Response(JSON.stringify({message: 'Page not found'}), {
        status: 404,
      })
    }

    // Parse the page data (assuming it's stored as a JSON string)
    const data = JSON.parse(pageData)

    return new Response(JSON.stringify({data}), {status: 200})
  } catch (error) {
    console.error('Error fetching page:', error)
    return new Response(JSON.stringify({message: 'Error fetching page'}), {
      status: 500,
    })
  }
}

// PUT handler for updating page content
export async function PUT(req) {
  try {
    const {userId, projectId, pageId, newData} = await req.json()

    // Check if the project belongs to the user
    const userProjectExists = await redis.hexists(
      `user:${userId}:projects`,
      projectId,
    )
    if (!userProjectExists) {
      return new Response(
        JSON.stringify({
          message: 'Project not found or does not belong to the user',
        }),
        {status: 404},
      )
    }

    // Construct the full page Redis key
    const pageKey = `page:${projectId}:${pageId}`

    // Check if the page exists
    const pageExists = await redis.exists(pageKey)
    if (!pageExists) {
      return new Response(JSON.stringify({message: 'Page not found'}), {
        status: 404,
      })
    }

    // Update the page data
    await redis.hset(pageKey, 'data', JSON.stringify(newData))

    return new Response(
      JSON.stringify({message: 'Page updated successfully'}),
      {status: 200},
    )
  } catch (error) {
    console.error('Error updating page:', error)
    return new Response(JSON.stringify({message: 'Error updating page'}), {
      status: 500,
    })
  }
}

// POST handler for creating a page
export async function POST(req) {
  try {
    const {userId, projectId, pageName} = await req.json()

    // Check if the project belongs to the user
    const userProjectExists = await redis.hexists(
      `user:${userId}:projects`,
      projectId,
    )
    if (!userProjectExists) {
      return new Response(
        JSON.stringify({
          message: 'Project not found or does not belong to the user',
        }),
        {status: 404},
      )
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

    return new Response(
      JSON.stringify({pageId, message: 'Page created successfully'}),
      {status: 200},
    )
  } catch (error) {
    console.error('Error creating page:', error)
    return new Response(JSON.stringify({message: 'Error creating page'}), {
      status: 500,
    })
  }
}

// DELETE handler for deleting a page
export async function DELETE(req) {
  try {
    const {userId, projectId, pageId} = await req.json()

    // Check if the project belongs to the user
    const userProjectExists = await redis.hexists(
      `user:${userId}:projects`,
      projectId,
    )
    if (!userProjectExists) {
      return new Response(
        JSON.stringify({
          message: 'Project not found or does not belong to the user',
        }),
        {status: 404},
      )
    }

    // Construct the full page Redis key
    const pageKey = `page:${projectId}:${pageId}`

    // Check if the page exists
    const pageExists = await redis.exists(pageKey)
    if (!pageExists) {
      return new Response(JSON.stringify({message: 'Page not found'}), {
        status: 404,
      })
    }

    // Delete the page
    await redis.del(pageKey)

    return new Response(
      JSON.stringify({message: 'Page deleted successfully'}),
      {status: 200},
    )
  } catch (error) {
    console.error('Error deleting page:', error)
    return new Response(JSON.stringify({message: 'Error deleting page'}), {
      status: 500,
    })
  }
}
