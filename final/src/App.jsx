import "./App.css";
import { useReducer, useEffect } from "react";
import Status from "./components/Status";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Posts from "./components/Posts";
import AddPost from "./components/AddPost";
import {
    fetchLogin,
    fetchSession,
    fetchLogout,
    fetchPosts,
    deletePost,
    addLike,
    removeLike,
    createPost,
    addCommentToPost,
    deleteComment,
} from "./services";

// Initial state
const initialState = {
    username: "",
    error: "",
    isLogin: false,
    posts: {},
    polling: null,
};

// Reducer function
function reducer(state, action) {
    switch (action.type) {
        case "SET_USERNAME":
            return { ...state, username: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "SET_LOGIN_STATUS":
            return { ...state, isLogin: action.payload };
        case "SET_POSTS":
            return { ...state, posts: action.payload };
        case "SET_POLLING":
            return { ...state, polling: action.payload };
        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Start polling
    function startPolling() {
        if (!state.polling) {
            const interval = setInterval(() => {
                fetchAndSetPosts();
            }, 5000); // Poll every 5 seconds
            dispatch({ type: "SET_POLLING", payload: interval });
        }
    }

    // Stop polling
    function stopPolling() {
        if (state.polling) {
            clearInterval(state.polling);
            dispatch({ type: "SET_POLLING", payload: null });
        }
    }

    function fetchAndSetPosts() {
        fetchPosts()
            .then((fetchedPosts) => dispatch({ type: "SET_POSTS", payload: fetchedPosts }))
            .catch((error) => dispatch({ type: "SET_ERROR", payload: error?.error || "ERROR" }));
    }

    function onLogin(username) {
        fetchLogin(username)
            .then(() => {
                dispatch({ type: "SET_ERROR", payload: "" });
                dispatch({ type: "SET_USERNAME", payload: username });
                dispatch({ type: "SET_LOGIN_STATUS", payload: true });
                fetchAndSetPosts();
            })
            .catch((err) => dispatch({ type: "SET_ERROR", payload: err?.error || "ERROR" }));
    }

    function onLogout() {
        dispatch({ type: "SET_ERROR", payload: "" });
        dispatch({ type: "SET_USERNAME", payload: "" });
        dispatch({ type: "SET_LOGIN_STATUS", payload: false });
        dispatch({ type: "SET_POSTS", payload: {} });
        fetchLogout().catch((err) =>
            dispatch({ type: "SET_ERROR", payload: err?.error || "ERROR" })
        );
    }

    function onAddComment(postId, comment) {
        addCommentToPost(postId, state.username, comment)
            .then(() => {
                fetchAndSetPosts();
            })
            .catch((err) => dispatch({ type: "SET_ERROR", payload: err?.error || "ERROR" }));
    }

    function onLikePost(postId) {
        addLike(postId)
            .then(() => fetchAndSetPosts())
            .catch((err) => dispatch({ type: "SET_ERROR", payload: err?.error || "ERROR" }));
    }

    function onDislikePost(postId) {
        removeLike(postId)
            .then(() => fetchAndSetPosts())
            .catch((err) => dispatch({ type: "SET_ERROR", payload: err?.error || "ERROR" }));
    }

    function onDeletePost(postId) {
        deletePost(postId)
            .then(() => fetchAndSetPosts())
            .catch((err) => dispatch({ type: "SET_ERROR", payload: err?.error || "ERROR" }));
    }

    function onDeleteComment(postId, commentId) {
        deleteComment(postId, commentId)
            .then(() => fetchAndSetPosts())
            .catch((err) => dispatch({ type: "SET_ERROR", payload: err?.error || "ERROR" }));
    }

    function onAddPost(postContent) {
        createPost(state.username, postContent)
            .then(() => fetchAndSetPosts())
            .catch((err) => dispatch({ type: "SET_ERROR", payload: err?.error || "ERROR" }));
    }

    function checkForSession() {
        fetchSession()
            .then((session) => {
                dispatch({ type: "SET_USERNAME", payload: session.username });
                dispatch({ type: "SET_LOGIN_STATUS", payload: true });
                fetchAndSetPosts();
            })
            .catch((err) => {
                if (err?.error === SERVER.AUTH_MISSING) {
                    dispatch({ type: "SET_LOGIN_STATUS", payload: false });
                } else {
                    dispatch({ type: "SET_ERROR", payload: err?.error || "ERROR" });
                }
            });
    }

    useEffect(() => {
        checkForSession();
        return () => stopPolling();
    }, []);

    useEffect(() => {
        if (state.isLogin) startPolling();
        else stopPolling();
    }, [state.isLogin]);

    return (
        <div className="App">
            {state.error && <Status error={state.error} />}

            {state.isLogin ? (
                <>
                    <p>Welcome, {state.username}</p>
                    <Logout onLogout={onLogout} />
                    <Posts
                        posts={state.posts}
                        onLikePost={onLikePost}
                        onDislikePost={onDislikePost}
                        onAddComment={onAddComment}
                        onDeletePost={onDeletePost}
                        onDeleteComment={onDeleteComment}
                    />
                    <AddPost onAddPost={onAddPost} />
                </>
            ) : (
                <Login onLogin={onLogin} />
            )}
        </div>
    );
}

export default App;
