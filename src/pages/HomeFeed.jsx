import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import PostCard from '../components/PostCard';

const HomeFeed = () => {
    const [posts, setPosts] = useState([]);
    const [orderBy, setOrderBy] = useState('created_at');
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('posts')
                .select()
                .order(orderBy, { ascending: false });
            
            if (error) {
                console.error("Error fetching soccer posts:", error.message);
                setPosts([]); // Safety: prevents .filter() crash
            } else {
                setPosts(data || []);
            }
            setLoading(false);
        };
        fetchPosts();
    }, [orderBy]);

    // Safety check: ensure posts is an array before filtering
    const filteredPosts = (posts || []).filter(post => 
        post.title && post.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (loading) {
        return <div className="loading">Checking the pitch for posts... ⚽</div>;
    }

    return (
        <div className="feed-container">
            <div className="feed-header">
                <div className="search-section">
                    <input 
                        type="text" 
                        placeholder="Search match discussions..." 
                        className="search-input"
                        onChange={(e) => setSearchInput(e.target.value)} 
                    />
                </div>
                
                <div className="sort-section">
                    <span>Order by: </span>
                    <button 
                        className={orderBy === 'created_at' ? 'active-sort' : ''}
                        onClick={() => setOrderBy('created_at')}
                    >
                        Newest
                    </button>
                    <button 
                        className={orderBy === 'upvotes' ? 'active-sort' : ''}
                        onClick={() => setOrderBy('upvotes')}
                    >
                        Most Popular
                    </button>
                </div>
            </div>
            
            <div className="posts-grid">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))
                ) : (
                    <div className="no-posts">
                        <h2>No soccer posts found.</h2>
                        <p>Be the first to start a discussion about the game!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeFeed;