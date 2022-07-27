import React, { useState } from 'react'
import { postAPI } from '../services/PostService'
import PostListItem from './PostListItem';

function PostList() {
    const [limit, setLimit] = useState(5);
    const { data: posts, isLoading, refetch } = postAPI.useFetchAllPostsQuery(limit);
    // first is function, second is loading data 
    const [createPost, { isLoading: isPostLoading }] = postAPI.useCreatePostMutation();
    const [updatePost, {}] = postAPI.useUpdatePostMutation();
    const [deletePost, {}] = postAPI.useDeletePostMutation();

    const handleCreate = async () => {
        const title = prompt('Enter post title');
        await createPost({ title, body: title })
    }

    return (
        <>
            <div>PostList</div>
            <p>
            <button onClick={() => handleCreate()} className="btn px-2 py-2 bg-orange-500 rounded mb-3">Create Post</button>
            {isPostLoading && (<p>Creating post...</p>)}
            </p>
            { isLoading && <h3>Loading...</h3> }
            <p>
            <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="block  bg-gray-200 border border-gray-200 text-gray-700 py-2 px-2 pr-3 rounded  focus:bg-white focus:border-gray-500">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>
            </p>
            { posts && posts.map(post => <PostListItem {...post}  key={post.id} update={(post) => updatePost(post)} remove={(id) => deletePost(id)}/>) }
            <button onClick={() => refetch()} className="btn px-2 py-2 bg-green-500">Refetch list</button>
        </>
    )
}

export default PostList