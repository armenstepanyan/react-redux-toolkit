import { configureStore } from '@reduxjs/toolkit'
import postSlice from '../features/post/postSlice'
import todoSlice from '../features/todo/todoSlice'
import userSlice from '../features/user/userSlice'
import { postAPI } from '../services/PostService'

export const store = configureStore({
    reducer: {
        user: userSlice,
        todo: todoSlice,
        post: postSlice,
        [postAPI.reducerPath]: postAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postAPI.middleware) 
})