import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    posts: [],
    loading: false,
}

// sliceName/functionName
export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, { rejectWithValue, dispatch }) => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        dispatch(setPosts(res.data))
    }
)

export const deletePostById = createAsyncThunk(
    'posts/deletePostById',
    async (id, { rejectWithValue, dispatch }) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        dispatch(deletePost(id))
    }
)

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload)
        }
    },
    extraReducers: {
        // comes by using 'rejectWithValue'
        [getPosts.pending]: (state) => {
            state.loading = true;
            console.log('pending')
        },
        [getPosts.fulfilled]: (state) => {
            state.loading = false;
            console.log('fulfilled')
        },
        [getPosts.rejected]: (state) => {
            state.loading = false;
            console.log('rejected')
        },
        [deletePostById.pending]: () => console.log('deletePost pending'),
        [deletePostById.fulfilled]: () => console.log('deletePost fulfilled'),
        [deletePostById.rejected]: () => console.log('deletePost rejected'),
    }
})

export const { setPosts, deletePost } = postSlice.actions;
export default postSlice.reducer;