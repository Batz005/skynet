import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user_id: '',
    username: '',
    email: '',
    defaultRole: '',
    section: '',
    branch: '',
    semester: 0,
    first_name: '',
    last_name: '',
    date_of_birth: '',
    father_name: '',
    mobile: '',
    mentor_name: '',
    mentor_email: '',
    roll_num: 0,
    profile_pic: ''
    // friends: '',
    // groups_joined: '',
    // clubs_joined: [],
    // activities_applied: [],
    // activities_completed: [],
    // resource_favourites: [],
    // calender_details: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserData(state, action) {
            // console.log(typeof action.payload,"payload");
            // state = Object.assign({}, action.payload);
            return action.payload;
        },
        handleUserLogOut(state, action) {
            state = initialState;
        },
        addProfilePic(state, action){
            const { profile_pic } = action.payload;
            state.profile_pic = profile_pic;
        }
    }
});


export const { addProfilePic, addUserData, handleUserLogOut } = userSlice.actions
export default userSlice.reducer