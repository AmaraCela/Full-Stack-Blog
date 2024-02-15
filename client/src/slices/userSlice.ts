import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
    isLoggedIn:boolean;
    username:string|null;
    email:string|null;
    id:string | null;
}

const initialState:UserState = {
    isLoggedIn:false,
    username:null,
    email:null,
    id:null,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginUser:(state,action:PayloadAction<[{user_id:string,username:string,email:string}]>)=>{
            state.isLoggedIn = true; 
            state.id = action.payload[0].user_id;
            state.username = action.payload[0].username;
            state.email = action.payload[0].email;
           
        },
        logoutUser:(state)=>{
            state.isLoggedIn = false;
            state.username = null;
            state.email = null;
            state.id = null;
        }
    }
});

export const {loginUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;