import React, { useState } from 'react';
import { supabase } from '../client';

const CreatePost = () => {
  const [post, setPost] = useState({ title: '', content: '', image_url: '', secret_key: '' });

  const createPost = async (e) => {
    e.preventDefault();
    await supabase.from('posts').insert(post);
    window.location = "/";
  };

  return (
    <div className="form-page">
      <form onSubmit={createPost}>
        <input type="text" placeholder="Title" required onChange={(e) => setPost({...post, title: e.target.value})} />
        <textarea placeholder="Content" onChange={(e) => setPost({...post, content: e.target.value})} />
        <input type="text" placeholder="Image URL (Optional)" onChange={(e) => setPost({...post, image_url: e.target.value})} />
        <input type="password" placeholder="Secret Key (to edit later)" onChange={(e) => setPost({...post, secret_key: e.target.value})} />
        <button type="submit">Post to SoccerHub</button>
      </form>
    </div>
  );
};

export default CreatePost;