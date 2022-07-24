import React from 'react'
import PostItem from './PostItem'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../features/post/postSlice'

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.post.posts);
    const isLoading = useSelector(state => state.post.loading)
    const loadingBlock = <p>Loading posts...</p>
    return (
        <div>
            <button
                type='submit'
                className='bg-lime-300  hover:bg-lime-400 transition-all p-2 text-sm'
                onClick={() => dispatch(getPosts())}
            >
                Get posts
            </button>
            {
                isLoading ? loadingBlock : (posts.map(post => <PostItem key={post.id} {...post}/>))
            }
            
        </div>
    )
}

export default Posts
