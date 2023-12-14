import { useState } from "react";

function Comments({ postId, comments, onAddComment, onDeleteComment }) {
    const [newComment, setNewComment] = useState("");

    function handleAddComment() {
        if (newComment.trim()) {
            onAddComment(postId, newComment.trim());
            setNewComment("");
        }
    }

    let commentsArray = [];
    if (comments) {
        commentsArray = Object.entries(comments).map(([commentId, comment]) => ({
            id: commentId,
            ...comment,
        }));
    }

    let commentsContent;
    if (commentsArray.length === 0) {
        commentsContent = <p>No comments yet. Be the first to comment!</p>;
    } else {
        commentsContent = (
            <ul className="comments-list">
                {commentsArray.map((comment) => (
                    <li className="comments-list__item" key={comment.id}>
                        <span>
                            {comment.author}: {comment.content}
                        </span>
                        <button onClick={() => onDeleteComment(postId, comment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className="comments">
            {commentsContent}
            <div className="add-comment">
                <input
                    data-id={postId}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="add-comment-button" onClick={handleAddComment}>
                    Add Comment
                </button>
            </div>
        </div>
    );
}

export default Comments;
