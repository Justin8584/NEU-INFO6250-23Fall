import { useState } from "react";

function AddPost({ onAddPost }) {
    const [postContent, setPostContent] = useState("");

    function onSubmit(e) {
        e.preventDefault();
        setPostContent("");
        onAddPost(postContent);
    }

    function onTyping(e) {
        setPostContent(e.target.value);
    }

    return (
        <form className="add-post__form" action="#/add" onSubmit={onSubmit}>
            <label className="add-post__label">Want Post Something? Just Share !</label>
            <input className="add-post__input" value={postContent} onChange={onTyping} />
            <button type="submit" className="add-post__button">
                Send
            </button>
        </form>
    );
}

export default AddPost;
