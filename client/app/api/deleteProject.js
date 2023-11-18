import redis from "lib/redis";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      // Extract project ID and user ID from the request body
      const { projectId, userId } = req.body;

      // Check if the project exists
      const projectExists = await redis.hexists("projects", projectId);
      if (!projectExists) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Delete the project from the 'projects' hash
      await redis.hdel("projects", projectId);

      // Update the user's project list
      await redis.hdel(`user:${userId}:projects`, projectId);

      // Additional cleanup can be done here if the project has its own dict
      // Example: await redis.del(`project:${projectId}:details`);

      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Error deleting project" });
    }
  } else {
    // Handle non-DELETE requests
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
