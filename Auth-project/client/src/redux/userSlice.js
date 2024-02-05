import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = createSlice(
    {
        name: "user",
        initialState,
        reducers: {
            loginStart: (state) => {
                state.loading = true
            },
            loginSuccess: (state, action) => {
                state.loading = false,
                    state.error = false
                state.currentUser = action.payload
            },
            loginFailure: (state, action) => {
                state.loading = false,
                    state.error = action.payload
            },
            updateUserStart: (state) => {
                state.loading = false
            },
            updateUserSuccess: (state, action) => {
                state.loading = false,
                    state.error = false
                state.currentUser = action.payload
            },
            updateUserFailure: (state, action) => {
                state.loading = false,
                    state.error = action.payload
            },
            deleteUserStart: (state) => {
                state.loading = false
            },
            deleteUserSuccess: (state) => {
                state.loading = false,
                    state.error = false
                state.currentUser = null
            },
            deleteUserFailure: (state, action) => {
                state.loading = false,
                    state.error = action.payload
            },
            logout:(state)=>{
                state.currentUser = null;
                state.loading = false
                state.error = false
            }

        }
    }
)

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure, 
    updateUserFailure, 
    updateUserStart, 
    updateUserSuccess, 
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    logout
} = userSlice.actions

export default userSlice.reducer