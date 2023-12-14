import PostItem from "./PostItem";

function Posts({ posts, onAddComment, onLikePost, onDislikePost, onDeletePost, onDeleteComment }) {
    let content;

    if (!posts || Object.keys(posts).length === 0) {
        content = <p>No posts available yet. Add some!</p>;
    } else {
        content = (
            <ul className="posts">
                {Object.values(posts).map((post) => (
                    <li key={post.id} className="post-item">
                        <PostItem
                            post={post}
                            onAddComment={onAddComment}
                            onLikePost={onLikePost}
                            onDislikePost={onDislikePost}
                            onDeletePost={onDeletePost}
                            onDeleteComment={onDeleteComment}
                        />
                    </li>
                ))}
            </ul>
        );
    }

    return <div className="content">{content}</div>;
}

export default Posts;
