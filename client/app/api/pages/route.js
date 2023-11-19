import redis from 'lib/redis'

// GET handler for fetching pages
export async function GET(req) {
  try {
    const {searchParams} = new URL(req.url)
    const projectId = searchParams.get('projectId')

    // Fetch keys for all pages associated with the project
    const pageKeys = await redis.keys(`page:${projectId}:*`)

    // Retrieve details for each page
    const pagesPromises = pageKeys.map(async (key) => {
      const pageData = await redis.hgetall(key)
      return {
        pageId: key.split(':')[2],
        name: pageData.name,
      }
    })

    const pages = await Promise.all(pagesPromises)

    return new Response(JSON.stringify(pages), {status: 200})
  } catch (error) {
    console.error('Error fetching pages:', error)
    return new Response(JSON.stringify({message: 'Error fetching pages'}), {
      status: 500,
    })
  }
}
