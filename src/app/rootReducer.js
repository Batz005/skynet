import { combineReducers } from '@reduxjs/toolkit'
import siteReducer from './site'
import userReducer from './user'
import postsReducer from './posts'


export default combineReducers({
    site: siteReducer,
    user: userReducer,
    posts: postsReducer
})
