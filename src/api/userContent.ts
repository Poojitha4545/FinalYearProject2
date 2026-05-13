import { Router, Request, Response } from "express";
import { upload, cloudinary } from "../infrastructure/cloudinary";

const UserContent = require("../infrastructure/db/entities/usercontent");
const User = require("../infrastructure/db/entities/user");

const router = Router();

// ── Helper: upload buffer to Cloudinary ──────────────────────────────────────
const uploadToCloudinary = (buffer: Buffer, mimetype: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const resourceType = mimetype.startsWith("video/") ? "video" : "image";
    const stream = cloudinary.uploader.upload_stream(
      { folder: "visit-sri-lanka/user-content", resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    );
    stream.end(buffer);
  });
};

// ── POST /api/user-content  (create a post) ──────────────────────────────────
router.post(
  "/",
  upload.single("media"),
  async (req: Request, res: Response) => {
    try {
      const { caption, location, mediaType } = req.body;
      const userId = (req as any).user?._id;

      if (!req.file) {
        return res.status(400).json({ message: "Media file is required" });
      }

      // Upload buffer to Cloudinary and get back the URL
      const mediaUrl = await uploadToCloudinary(req.file.buffer, req.file.mimetype);

      const newPost = await UserContent.create({
        userId,
        destinationId: null,
        mediaUrl,
        mediaType: mediaType || "image",
        caption,
        location,
        status: "approved",
        isUploaded: true,
      });

      return res.status(201).json({ success: true, post: newPost });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }
);

// ── GET /api/user-content  (fetch all approved posts) ────────────────────────
router.get("/", async (_req: Request, res: Response) => {
  try {
    const posts = await UserContent.find({ status: "approved" })
      .populate("userId", "fullName avatar")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, posts });
  } catch (err: any) {
  console.error("POST /api/user-content error:", err); // ← add this line
  return res.status(500).json({ message: err.message });
}
});

// ── POST /api/user-content/:id/like  (toggle like) ───────────────────────────
router.post("/:id/like", async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?._id;
    const post   = await UserContent.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.users.includes(userId);
    if (alreadyLiked) {
      post.likes.users.pull(userId);
      post.likes.count = Math.max(0, post.likes.count - 1);
    } else {
      post.likes.users.push(userId);
      post.likes.count += 1;
    }
    await post.save();
    return res.status(200).json({ success: true, likes: post.likes.count });
  } catch (err: any) {
  console.error("POST error:", err.message); // ← POST catch block
  return res.status(500).json({ message: err.message });
}
});

export default router;