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