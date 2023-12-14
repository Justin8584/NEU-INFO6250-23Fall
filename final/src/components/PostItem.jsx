import Likes from "./Likes";
import Comments from "./Comments";

function PostItem({
    post,
    onAddComment,
    onLikePost,
    onDislikePost,
    onDeletePost,
    onDeleteComment,
}) {
    const likeCount = post.likes && post.likes.length ? post.likes.length : 0;

    let commentsArray = [];
    if (post.comments) {
        commentsArray = Object.entries(post.comments).map(([commentId, comment]) => ({
            id: commentId,
            ...comment,
        }));
    }

    return (
        <>
            <div className="post-author">Posted by: {post.author}</div>
            <div className="post-content">{post.content}</div>
            <button onClick={() => onDeletePost(post.id)}>Delete Post</button>
            <Likes
                postId={post.id}
                likeCount={likeCount}
                onLike={onLikePost}
                onDislike={onDislikePost}
            />
            <Comments
                postId={post.id}
                comments={commentsArray}
                onAddComment={onAddComment}
                onDeleteComment={onDeleteComment}
            />
        </>
    );
}

export default PostItem;
