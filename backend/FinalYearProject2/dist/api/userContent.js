"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cloudinary_1 = require("../infrastructure/cloudinary");
const UserContent = require("../infrastructure/db/entities/usercontent");
const User = require("../infrastructure/db/entities/user");
const router = (0, express_1.Router)();
// ── Helper: upload buffer to Cloudinary ──────────────────────────────────────
const uploadToCloudinary = (buffer, mimetype) => {
    return new Promise((resolve, reject) => {
        const resourceType = mimetype.startsWith("video/") ? "video" : "image";
        const stream = cloudinary_1.cloudinary.uploader.upload_stream({ folder: "visit-sri-lanka/user-content", resource_type: resourceType }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result.secure_url);
        });
        stream.end(buffer);
    });
};
// ── POST /api/user-content  (create a post) ──────────────────────────────────
router.post("/", cloudinary_1.upload.single("media"), async (req, res) => {
    try {
        const { caption, location, mediaType } = req.body;
        const userId = req.user?._id;
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
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
// ── GET /api/user-content  (fetch all approved posts) ────────────────────────
router.get("/", async (_req, res) => {
    try {
        const posts = await UserContent.find({ status: "approved" })
            .populate("userId", "fullName avatar")
            .sort({ createdAt: -1 });
        return res.status(200).json({ success: true, posts });
    }
    catch (err) {
        console.error("POST /api/user-content error:", err); // ← add this line
        return res.status(500).json({ message: err.message });
    }
});
// ── POST /api/user-content/:id/like  (toggle like) ───────────────────────────
router.post("/:id/like", async (req, res) => {
    try {
        const userId = req.user?._id;
        const post = await UserContent.findById(req.params.id);
        if (!post)
            return res.status(404).json({ message: "Post not found" });
        const alreadyLiked = post.likes.users.includes(userId);
        if (alreadyLiked) {
            post.likes.users.pull(userId);
            post.likes.count = Math.max(0, post.likes.count - 1);
        }
        else {
            post.likes.users.push(userId);
            post.likes.count += 1;
        }
        await post.save();
        return res.status(200).json({ success: true, likes: post.likes.count });
    }
    catch (err) {
        console.error("POST error:", err.message); // ← POST catch block
        return res.status(500).json({ message: err.message });
    }
});
exports.default = router;
//# sourceMappingURL=userContent.js.map