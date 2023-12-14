const express = require("express");
const cookieParser = require("cookie-parser");

const users = require("./users");
const sessions = require("./sessions");
const posts = require("./posts").makePostList();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static("./dist"));
app.use(express.json());

/// ------------------ User Authentication ------------------ ///

// Login users
app.get("/api/v1/session", (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if (!sid || !username) {
        res.status(401).json({ error: "auth-missing" });
        return;
    }
    res.json({ username });
});

// User login/signup
app.post("/api/v1/session", (req, res) => {
    const { username } = req.body;
    if (!users.isValidUsername(username)) {
        res.status(400).send({ error: "require-username" });
        return;
    }
    if (String(username).toLowerCase() === "dog") {
        res.status(403).send({ error: "auth-insufficient" });
        return;
    }
    const existingUser = users.getUserData(username);
    if (!existingUser) {
        users.createUser(username, posts);
    }
    const sid = sessions.addSession(username);
    res.cookie("sid", sid, { httpOnly: true, sameSite: "lax" });
    res.json({ message: "session-created", username, sessionId: sid });
});

// User logout
app.delete("/api/v1/session", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (sid) {
        res.clearCookie("sid");
    }
    if (username) {
        sessions.deleteSession(sid);
    }
    res.json({ username });
});

/// ------------------ Post Management ------------------ ///

// Create Post
app.post("/api/v1/posts", (req, res) => {
    try {
        const sid = req.cookies.sid;
        const username = sessions.getSessionUser(sid);
        if (!sid || !username) {
            res.status(401).send({ error: "auth-missing" });
            return;
        }
        const { content } = req.body;
        if (typeof content !== "string" || content.trim() === "") {
            res.status(400).json({ error: "invalid-content" });
            return;
        }
        const newPostId = posts.addPost(username, content);
        const newPost = posts.getPost(newPostId);
        res.status(201).json({ message: "post-add-success", post: newPost });
    } catch (error) {
        res.status(500).json({ error: "internal-server-error" });
    }
});

// Read all Posts
app.get("/api/v1/posts", (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);

    if (!sid || !username) {
        res.status(401).send({ error: "auth-missing" });
        return;
    }
    res.json(posts.getPosts());
});

// Read one Post by postId
app.get("/api/v1/posts/:postId", (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if (!sid || !username) {
        res.status(401).send({ error: "auth-missing" });
        return;
    }
    const { postId } = req.params;
    const post = posts.getPost(postId);
    if (!post) {
        res.status(404).send({ error: "post-not-found", message: `No Post with id ${id}` });
        return;
    }
    res.json(post);
});

// Update Post
app.put("/api/v1/posts/:postId", (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if (!sid || !username) {
        res.status(401).send({ error: "auth-missing" });
        return;
    }
    const postId = req.params.postId;
    const { content } = req.body;
    if (!posts.contains(postId)) {
        res.status(404).send({ error: "post-not-found" });
        return;
    }
    posts.editPost(postId, content);
    res.json(posts.getPost(postId));
});

// Partial Update (PATCH) Post
app.patch("/api/v1/posts/:postId", (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if (!sid || !username) {
        res.status(401).send({ error: "auth-missing" });
        return;
    }
    const postId = req.params.postId;
    const { content } = req.body;
    if (!posts.contains(postId)) {
        res.status(404).send({ error: "post-not-found" });
        return;
    }
    if (content !== undefined) {
        posts.editPost(postId, content);
    }
    res.json(posts.getPost(postId));
});

// Delete Post
app.delete("/api/v1/posts/:postId", (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if (!sid || !username) {
        res.status(403).send({ error: "auth-missing" });
        return;
    }
    const postId = req.params.postId;
    if (!posts.contains(postId)) {
        res.status(404).send({ error: "post-not-found" });
        return;
    }
    posts.deletePost(postId);
    res.status(200).send({ message: "post-delete-success" });
});

/// ------------------ Comment Management ------------------ ///

// Add comment on a post
app.post("/api/v1/posts/:postId/comments", (req, res) => {
    try {
        const sid = req.cookies.sid;
        const username = sessions.getSessionUser(sid);
        if (!sid || !username) {
            res.status(401).send({ error: "auth-missing" });
            return;
        }
        const postId = req.params.postId;
        const { content } = req.body;
        if (!posts.contains(postId) || typeof content !== "string" || content.trim() === "") {
            res.status(400).json({ error: "invalid-request" });
            return;
        }
        posts.addCommentToPost(postId, content, username);
        res.status(201).json({
            message: "comment-add-success",
            postId,
            comment: content,
            username,
        });
    } catch (error) {
        res.status(500).json({ error: "internal-server-error" });
    }
});

// delete comment
app.delete("/api/v1/posts/:postId/comments/:commentId", (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if (!sid || !username) {
        res.status(401).send({ error: "auth-missing" });
        return;
    }
    const { postId, commentId } = req.params;
    const post = posts.getPost(postId);
    if (!post) {
        res.status(404).json({ error: "post-not-found" });
        return;
    }
    if (!post.comments[commentId]) {
        res.status(404).json({ error: "comment-not-found" });
        return;
    }
    posts.deleteCommentFromPost(postId, commentId);
    res.status(200).json({ message: "comment-delete-success" });
});

/// ------------------ Like Management ------------------ ///

// Add Like on a post
app.post("/api/v1/posts/:postId/likes", (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if (!sid || !username) {
        res.status(401).json({ error: "auth-required" });
        return;
    }
    const postId = req.params.postId;
    if (!posts.contains(postId)) {
        res.status(404).json({ error: "post-not-found" });
        return;
    }
    posts.addLikeToPost(postId, username);
    res.status(201).json({ message: "like-add-success", postId });
});

// get likes on a post
app.get("/api/v1/posts/:postId/likes", (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if (!sid || !username) {
        res.status(401).json({ error: "auth-required" });
        return;
    }
    const postId = req.params.postId;
    if (!!posts.contains(postId)) {
        res.status(404).json({ error: "post-not-found" });
        return;
    }
    const likeCount = posts.countLikeInPost(postId);
    res.status(201).json(likeCount);
});

// Remove a like from a post
app.delete("/api/v1/posts/:postId/likes", (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if (!sid || !username) {
        res.status(401).json({ error: "auth-required" });
        return;
    }
    const postId = req.params.postId;
    if (!posts.contains(postId)) {
        res.status(404).json({ error: "post-not-found" });
        return;
    }
    posts.removeLikeFromPost(postId, username);
    res.status(200).json({ message: "like-remove-success", postId });
});
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
