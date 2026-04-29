import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <p className="time">Posted {new Date(post.created_at).toLocaleDateString()}</p>
      <Link to={`/post/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
      <p>{post.upvotes} upvotes</p>
    </div>
  );
};

export default PostCard;