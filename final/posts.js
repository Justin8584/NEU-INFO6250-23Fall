const uuid = require("uuid").v4;
function makePostList() {
    const id1 = uuid();
    const id2 = uuid();

    const postsList = {};
    const posts = {
        [id1]: {
            id: id1,
            author: "user2",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            likes: ["user1"],
            comments: {},
        },
        [id2]: {
            id: id2,
            author: "user1",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            likes: [],
            comments: {},
        },
    };

    postsList.contains = function contains(id) {
        return !!posts[id];
    };

    postsList.addPost = function addPost(username, content) {
        const postId = uuid();
        posts[postId] = {
            id: postId,
            author: username,
            content,
            likes: [],
            comments: {},
        };
        return postId;
    };

    postsList.getPosts = function getPosts() {
        return posts;
    };

    postsList.getPost = function getPost(id) {
        return posts[id];
    };

    postsList.editPost = function editPost(id, newContent) {
        posts[id].content = newContent;
    };

    postsList.deletePost = function deletePost(id) {
        delete posts[id];
    };

    postsList.addCommentToPost = function addCommentToPost(postId, commentContent, username) {
        if (posts[postId]) {
            const commentId = uuid();
            if (!posts[postId].comments) {
                posts[postId].comments = {};
            }
            posts[postId].comments[commentId] = {
                author: username,
                content: commentContent,
            };
            return commentId;
        }
        return null;
    };

    postsList.deleteCommentFromPost = function deleteCommentFromPost(postId, commentId) {
        const post = posts[postId];
        if (post && post.comments[commentId]) {
            delete post.comments[commentId];
        }
    };

    postsList.countLikeInPost = function countLikeInPost(postId) {
        const post = posts[postId];
        if (!post) {
            return 0;
        }
        return post.likes.length;
    };

    postsList.addLikeToPost = function addLikeToPost(postId, username) {
        const post = posts[postId];
        if (post && !post.likes.includes(username)) {
            post.likes.push(username);
        }
    };

    postsList.removeLikeFromPost = function removeLikeFromPost(postId, username) {
        const post = posts[postId];
        if (post) {
            const index = post.likes.indexOf(username);
            if (index > -1) {
                post.likes.splice(index, 1);
            }
        }
    };

    postsList.isUserLikedPost = function isUserLikedPost(postId, username) {
        const post = posts[postId];
        return post && post.likes.includes(username);
    };

    return postsList;
}

module.exports = {
    makePostList,
};
