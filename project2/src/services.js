// // app.post("/api/v1/session",
// export function fetchLogin(username) {
//     return fetch('/api/v1/session', {
//         method: 'POST',
//         headers: new Headers({
//             'content-type': 'application/json'
//         }),
//         body: JSON.stringify({ username }),
//     }).catch(
//         () => Promise.reject({ error: 'network-error' })
//     ).then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         return response.json()
//             .catch(error => Promise.reject({ error }))
//             .then(err => Promise.reject(err));
//     })
// }

// // app.get("/api/v1/session",
// export function fetchSession() {
//     return fetch('/api/v1/session', {
//         method: 'GET',
//     }).catch(
//         () => Promise.reject({ error: 'network-error' })
//     ).then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         return response.json()
//             .catch(error => Promise.reject({ error }))
//             .then(err => Promise.reject(err));
//     });
// }

// // app.delete("/api/v1/session",
// export function fetchLogout() {
//     return fetch('/api/v1/session', {
//         method: 'DELETE',
//     }).catch(
//         () => Promise.reject({ error: 'network-error' })
//     ).then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         return response.json()
//             .catch(error => Promise.reject({ error }))
//             .then(err => Promise.reject(err));
//     });
// }

// export function fetchMessages() {
//     return fetch('/api/v1/message', {
//         method: 'GET',
//     }).catch(
//         () => Promise.reject({ error: 'network-error' })
//     ).then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         return response.json()
//             .catch(error => Promise.reject({ error }))
//             .then(err => Promise.reject(err));
//     });
// }

// // app.post("/api/v1/message",
// export function sendMessage(text) {
//     return fetch('/api/v1/message', {
//         method: 'POST',
//         headers: new Headers({
//             'content-type': 'application/json',
//         }),
//         body: JSON.stringify({ text }),
//     }).catch(
//         () => Promise.reject({ error: 'network-error' })
//     ).then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         return response.json()
//             .catch(error => Promise.reject({ error }))
//             .then(err => Promise.reject(err));
//     });
// }

// // app.patch("/api/v1/message/:id",
// export function fetchUpdateMessage(id, messageUpdates) {
//     return fetch(`/api/v1/message/${id}`, {
//         method: 'PATCH',
//         headers: new Headers({
//             'content-type': 'application/json',
//         }),
//         body: JSON.stringify(messageUpdates),
//     }).catch(
//         () => Promise.reject({ error: 'network-error' })
//     ).then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         return response.json()
//             .catch(error => Promise.reject({ error }))
//             .then(err => Promise.reject(err));
//     });
// }

// // app.delete("/api/v1/message/:id",
// export function fetchDeleteMessages(id) {
//     return fetch(`/api/v1/message/${id}`, {
//         method: 'DELETE',
//     }).catch(() => Promise.reject({ error: 'network-error' })
//     ).then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         return response.json()
//             .catch(error => Promise.reject({ error }))
//             .then(err => Promise.reject(err));
//     });
// }

// export function fetchLoggedInUsers() {
//     return fetch('/api/v1/users', {
//         method: 'GET',
//     }).catch(
//         () => Promise.reject({ error: 'network-error' })
//     ).then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         return response.json()
//             .catch(error => Promise.reject({ error }))
//             .then(err => Promise.reject(err));
//     });
// }

// app.post("/api/v1/session",
export async function fetchLogin(username) {
    try {
        const response = await fetch("/api/v1/session", {
            method: "POST",
            headers: new Headers({
                "content-type": "application/json",
            }),
            body: JSON.stringify({ username }),
        });

        if (!response.ok) {
            const err = await response.json();
            throw err;
        }
        return response.json();
    } catch (error) {
        throw new Error("network-error");
    }
}

// app.get("/api/v1/session",
export async function fetchSession() {
    try {
        const response = await fetch("/api/v1/session", {
            method: "GET",
        });

        if (!response.ok) {
            const err = await response.json();
            throw err;
        }
        return response.json();
    } catch (error) {
        throw new Error("network-error");
    }
}

// app.delete("/api/v1/session",
export async function fetchLogout() {
    try {
        const response = await fetch("/api/v1/session", {
            method: "DELETE",
        });

        if (!response.ok) {
            const err = await response.json();
            throw err;
        }
        return response.json();
    } catch (error) {
        throw new Error("network-error");
    }
}

export async function fetchMessages() {
    try {
        const response = await fetch("/api/v1/message", {
            method: "GET",
        });

        if (!response.ok) {
            const err = await response.json();
            throw err;
        }
        return response.json();
    } catch (error) {
        throw new Error("network-error");
    }
}

// app.post("/api/v1/message",
export async function sendMessage(text) {
    try {
        const response = await fetch("/api/v1/message", {
            method: "POST",
            headers: new Headers({
                "content-type": "application/json",
            }),
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            const err = await response.json();
            throw err;
        }
        return response.json();
    } catch (error) {
        throw new Error("network-error");
    }
}

// app.patch("/api/v1/message/:id",
export async function fetchUpdateMessage(id, messageUpdates) {
    try {
        const response = await fetch(`/api/v1/message/${id}`, {
            method: "PATCH",
            headers: new Headers({
                "content-type": "application/json",
            }),
            body: JSON.stringify(messageUpdates),
        });

        if (!response.ok) {
            const err = await response.json();
            throw err;
        }
        return response.json();
    } catch (error) {
        throw new Error("network-error");
    }
}

// app.delete("/api/v1/message/:id",
export async function fetchDeleteMessages(id) {
    try {
        const response = await fetch(`/api/v1/message/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const err = await response.json();
            throw err;
        }
        return response.json();
    } catch (error) {
        throw new Error("network-error");
    }
}

export async function fetchLoggedInUsers() {
    try {
        const response = await fetch("/api/v1/users", {
            method: "GET",
        });

        if (!response.ok) {
            const err = await response.json();
            throw err;
        }
        return response.json();
    } catch (error) {
        throw new Error("network-error");
    }
}
