import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        // query -> GET request
        // mutation -> POST/PUT...
        fetchAllPosts: build.query({
            query:(limit = 5) => ({
                url: '/posts',
                params: {
                    _limit: limit
                }
            }),
            providesTags: ['Post']
        }),
        createPost: build.mutation({
            query: (post) => ({
                url: '/posts',
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        updatePost: build.mutation({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        deletePost: build.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Post']
        })
    })
})