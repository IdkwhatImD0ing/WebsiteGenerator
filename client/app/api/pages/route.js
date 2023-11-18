import redis from 'lib/redis'

// GET handler for fetching pages
export async function GET(req) {
  try {
    const {searchParams} = new URL(req.url)
    const projectId = searchParams.get('projectId')

    // Fetch pages associated with the project
    const pages = await redis.hgetall(`project:${projectId}:pages`)
    if (!pages) {
      return new Response(
        JSON.stringify({message: 'No pages found for this project'}),
        {status: 404},
      )
    }

    // Format the response
    const formattedPages = Object.entries(pages).map(([uuid, name]) => ({
      uuid,
      name,
    }))

    return new Response(JSON.stringify(formattedPages), {status: 200})
  } catch (error) {
    console.error('Error fetching pages:', error)
    return new Response(JSON.stringify({message: 'Error fetching pages'}), {
      status: 500,
    })
  }
}
