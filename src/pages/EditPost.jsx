import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({ title: "", content: "", image_url: "", secret_key: "" });
    const [inputKey, setInputKey] = useState(""); // For the stretch feature check

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('posts')
                .select()
                .eq('id', id)
                .single();
            
            if (data) setPost(data);
        };
        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    };

    const updatePost = async (e) => {
        e.preventDefault();

        // STRETCH FEATURE: Only update if secret key matches
        if (inputKey !== post.secret_key) {
            alert("Incorrect Secret Key! You cannot edit this match report.");
            return;
        }

        const { error } = await supabase
            .from('posts')
            .update({ 
                title: post.title, 
                content: post.content, 
                image_url: post.image_url 
            })
            .eq('id', id);

        if (error) {
            console.error(error);
        } else {
            navigate(`/post/${id}`);
        }
    };

    const deletePost = async () => {
        // STRETCH FEATURE: Only delete if secret key matches
        if (inputKey !== post.secret_key) {
            alert("Incorrect Secret Key! You cannot delete this match report.");
            return;
        }

        const confirmed = window.confirm("Are you sure you want to delete this post from the pitch?");
        if (confirmed) {
            await supabase.from('posts').delete().eq('id', id);
            navigate('/');
        }
    };

    return (
        <div className="form-page">
            <h2>Edit Soccer Post</h2>
            <form onSubmit={updatePost}>
                <label>Title</label>
                <input type="text" name="title" value={post.title} onChange={handleChange} required />

                <label>Content</label>
                <textarea name="content" rows="5" value={post.content} onChange={handleChange}></textarea>

                <label>Image URL</label>
                <input type="text" name="image_url" value={post.image_url} onChange={handleChange} />

                <div className="auth-box">
                    <label>Enter Secret Key to Confirm Changes:</label>
                    <input 
                        type="password" 
                        placeholder="Key used during creation"
                        value={inputKey}
                        onChange={(e) => setInputKey(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="update-btn">Update Post</button>
                <button type="button" className="delete-btn" onClick={deletePost}>Delete Post</button>
            </form>
        </div>
    );
};

export default EditPost;