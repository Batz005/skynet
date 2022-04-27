import { createSlice } from '@reduxjs/toolkit';


// const initialState = {
//     post_id: '',
//     user_id: '',
//     body: '',
//     author: '',
//     date_created: '',
//     upvotes: 0,
//     downvotes: 0,
//     upvoted_users_id: [],
//     downvoted_users_id: [],
//     profile_pic: null,
//     image: null,
//     poll: null,
// };

const initialState = {
    postsList: []
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        updatePostsList(state,action) {
            state.postsList = action.payload
        },
        addNewPost(state, action) {
            state.postsList.push(action.payload)

        },
        upVotePost(state, action) {
            
        },
        downVotePost(state, action) {
            
        },
        addComments(state, action){

        },
        sharePost(state, action){

        },
        reportPost(state, action){

        }
    }
});


export const { updatePostsList, addNewPost, addComments, likePost, sharePost, reportPost } = postsSlice.actions
export default postsSlice.reducer