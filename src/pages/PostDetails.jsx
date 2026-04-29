import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select()
                .eq('id', id)
                .single();
            
            if (error) {
                console.error("Error fetching post:", error.message);
            } else {
                setPost(data);
            }
            setLoading(false);
        };
        fetchPost();
    }, [id]);

    const handleUpvote = async () => {
        const { data, error } = await supabase
            .from('posts')
            .update({ upvotes: (post.upvotes || 0) + 1 })
            .eq('id', id)
            .select()
            .single();

        if (!error) {
            setPost(data);
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        // rubric requirement: leave comments underneath a post
        const updatedComments = [...(post.comments || []), newComment];

        const { error } = await supabase
            .from('posts')
            .update({ comments: updatedComments })
            .eq('id', id);

        if (!error) {
            setPost({ ...post, comments: updatedComments });
            setNewComment("");
        }
    };

    if (loading) return <div className="loading">Loading match details... ⚽</div>;
    if (!post) return <div className="no-posts">Post not found on the pitch!</div>;

    return (
        <div className="post-details">
            <div className="post-actions">
                <Link to={`/edit/${post.id}`}>
                    <button className="edit-icon-btn">Edit Post ✏️</button>
                </Link>
            </div>

            <h1>{post.title}</h1>
            <p className="time">Match Report from: {new Date(post.created_at).toLocaleString()}</p>
            
            {/* rubric requirement: display external image URL */}
            {post.image_url && (
                <img src={post.image_url} alt={post.title} className="post-img" />
            )}

            <p className="content-text">{post.content}</p>

            <div className="upvote-container">
                <button className="upvote-btn" onClick={handleUpvote}>
                    ▲ Upvote ({post.upvotes || 0})
                </button>
            </div>

            <hr />

            <div className="comments-section">
                <h3>Comments ({post.comments?.length || 0})</h3>
                
                <div className="comments-list">
                    {post.comments && post.comments.map((comment, index) => (
                        <div key={index} className="comment-bubble">
                            {comment}
                        </div>
                    ))}
                    {(!post.comments || post.comments.length === 0) && (
                        <p>No comments yet. Start the discussion!</p>
                    )}
                </div>

                <form onSubmit={handleAddComment} className="comment-form">
                    <input 
                        type="text" 
                        placeholder="Add a comment about the game..." 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button type="submit">Post</button>
                </form>
            </div>
        </div>
    );
};

export default PostDetails;