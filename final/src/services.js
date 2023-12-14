/// ------------------ Sessions ------------------ ///

export function fetchSession() {
    return fetch("/api/v1/session", {
        method: "GET",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .catch((error) => Promise.reject({ error }))
                .then((err) => Promise.reject(err));
        });
}

export function fetchLogin(username) {
    return fetch("/api/v1/session", {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify({ username }),
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .catch((error) => Promise.reject({ error }))
                .then((err) => Promise.reject(err));
        });
}

export function fetchLogout() {
    return fetch("/api/v1/session", {
        method: "DELETE",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .catch((error) => Promise.reject({ error }))
                .then((err) => Promise.reject(err));
        });
}

export function fetchLoggedInUsers() {
    return fetch("/api/v1/users", {
        method: "GET",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .catch((error) => Promise.reject({ error }))
                .then((err) => Promise.reject(err));
        });
}

/// ------------------ Posts ------------------ ///

export function createPost(username, content) {
    return fetch("/api/v1/posts", {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify({ username, content }),
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .catch((error) => Promise.reject({ error }))
                .then((err) => Promise.reject(err));
        });
}

// fetch all posts
export function fetchPosts() {
    return fetch("/api/v1/posts", {
        method: "GET",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .catch((error) => Promise.reject({ error }))
                .then((err) => Promise.reject(err));
        });
}

// fetch single post
export function fetchSinglePost(postId) {
    return fetch(`/api/v1/posts/${postId}`, {
        method: "GET",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .catch((error) => Promise.reject({ error }))
                .then((err) => Promise.reject(err));
        });
}

// Update a post
export function updatePost(postId, content) {
    return fetch(`/api/v1/posts/${postId}`, {
        method: "PUT",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify({ content }),
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .catch((error) => Promise.reject({ error }))
                .then((err) => Promise.reject(err));
        });
}

export function patchPost(postId, updates) {
    return fetch(`/api/v1/posts/${postId}`, {
        method: "PATCH",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(updates),
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .catch((error) => Promise.reject({ error }))
                .then((err) => Promise.reject(err));
        });
}

// delete a post
export function deletePost(postId) {
    return fetch(`/api/v1/posts/${postId}`, {
        method: "DELETE",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .catch((error) => Promise.reject({ error }))
                .then((err) => Promise.reject(err));
        });
}

/// ------------------ Comments ------------------ ///

export function fetchCommentsForPost(postId) {
    return fetch(`/api/v1/posts/${postId}/comments`, {
        method: "GET",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .catch((error) => Promise.reject({ error }))
                .then((err) => Promise.reject(err));
        });
}

// export function addCommentToPost(postId, content) {
//     return fetch(`/api/v1/posts/${postId}/comments`, {
//         method: "POST",
//         headers: new Headers({
//             "Content-Type": "application/json",
//         }),
//         body: JSON.stringify({ content }),
//     })
//         .catch(() => Promise.reject({ error: "network-error" }))
//         .then((response) => {
//             if (response.ok) {
//                 return response.json();
//             }
//             return response
//                 .json()
//                 .catch((error) => Promise.reject({ error }))
//                 .then((err) => Promise.reject(err));
//         });
// }

export function addCommentToPost(postId, username, content) {
    return fetch(`/api/v1/posts/${postId}/comments`, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify({ username, content }),
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .catch((error) => Promise.reject({ error }))
                .then((err) => Promise.reject(err));
        });
}

export function deleteComment(postId, commentId) {
    return fetch(`/api/v1/posts/${postId}/comments/${commentId}`, {
        method: "DELETE",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .catch((error) => Promise.reject({ error }))
                .then((err) => Promise.reject(err));
        });
}

/// ------------------ Likes ------------------ ///

export function addLike(postId) {
    return fetch(`/api/v1/posts/${postId}/likes`, {
        method: "POST",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .catch((error) => Promise.reject({ error }))
                .then((err) => Promise.reject(err));
        });
}

export function getLike(postId) {
    return fetch(`/api/v1/posts/${postId}/likes`, {
        method: "GET",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .catch((error) => Promise.reject({ error }))
                .then((err) => Promise.reject(err));
        });
}

export function removeLike(postId) {
    return fetch(`/api/v1/posts/${postId}/likes`, {
        method: "DELETE",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .catch((error) => Promise.reject({ error }))
                .then((err) => Promise.reject(err));
        });
}
