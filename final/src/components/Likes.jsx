function Likes({ postId, likeCount, onLike, onDislike }) {
    return (
        <div className="likes">
            <button onClick={() => onLike(postId)}>Like</button>
            <span>Likes: {likeCount}</span>
            <button onClick={() => onDislike(postId)}>Hate</button>
        </div>
    );
}

export default Likes;
