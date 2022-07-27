### redux-toolkit
```
yarn add @reduxjs/toolkit react-redux
```

Create src/features/user/userSlice
```
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: '',
    lastName: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload
        },
        setLastname: (state, action) => {
            state.lastName = action.payload
        }
    }
})

export const { setFirstName, setLastname } = userSlice.actions
export default userSlice.reducer
```

Access state params with `useSelector`
FirstName component
```
import React from 'react'
import { useSelector } from 'react-redux'


const FirstName = () => {
    const name = useSelector(state => state.user.firstName)
    return <div className='font-bold'>{name}</div>
}

export default FirstName

```

Change state params with `useDispatch`
```
import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleCompletedTodo, removeTodo } from '../features/todo/todoSlice';

const TodoItem = ({ id, text, completed }) => {
    const dispatch = useDispatch();
    return (
        <div>
            <div onClick={() => dispatch(toggleCompletedTodo(id))}
            >
                Complete
            </div>
            <div> {text}</div>
            <div onClick={() => dispatch(removeTodo(id))}
            > Delete </div>
        </div>
    )
}

export default TodoItem

```
todoSlice.js
```
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todos: []
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload)
        },
        toggleCompletedTodo: (state, action) => {
            const current = state.todos.find(todo => todo.id === action.payload);
            current && (current.completed = !current.completed)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        }
    }
})

export const { addTodo, toggleCompletedTodo, removeTodo } = todoSlice.actions
export default todoSlice.reducer
```
Make side effects in `createAsyncThunk`

```
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
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
        dispatch(setPosts(res.data))
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
        }

    }
})

export const { setPosts, deletePost } = postSlice.actions;
export default postSlice.reducer;
```

Use fake json server
```
npm install -g json-server
```

Start server
```
json-server --watch db.json --port 5000
```

To refetch data again need to use `tagTypes`
```
export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    tagTypes: ['Post'], // <-----
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
            providesTags: ['Post'] // <-----
        }),
        createPost: build.mutation({
            query: (post) => ({
                url: '/posts',
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Post'] // <-----
        })
    })
})
```
