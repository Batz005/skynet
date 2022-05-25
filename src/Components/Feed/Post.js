import { Avatar } from '@mui/material'
import React from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { Container } from '@mui/material';
import './Post.css'


function Post({ postDetails }) {

    const date = new Date(postDetails.date_created)
    const formatted_date = date.getDate()+ "-" + date.getMonth() + "-" + date.getFullYear() + " " + date.getHours() + ":" +  date.getMinutes() + ":" + date.getSeconds()
    
    return (
        <Container className = "post">
            <div className = "post__top">
                <Avatar className = "post__avatar">
                {postDetails.profile_pic ? postDetails.profile_pic : postDetails.username[0]} 
                </Avatar>
                <div className = "post__topInfo">
                    <h3>{postDetails.username}</h3>
    <p>{formatted_date}</p>
                </div>
            </div>
            <div className = "post__bottom">
                <p>{postDetails.body}</p>
            </div>

            <div className = "post__image">
                <img src = {'https://source.unsplash.com/random/?scenary'} alt = "" />
            </div>

            <div className = "post__options">
                <div className = "post__option">
                    
                    <p>{postDetails.upvotes}</p>
                    <KeyboardArrowUpIcon fontSize = "large"/>
                </div>
                <div className = "post__option" >
                    <p>{`${postDetails.downvotes}`}</p>
                    <KeyboardArrowDownIcon fontSize = "large"/>
                </div>
                <div className = "post__option">
                    <CommentIcon />
                    <p>Comment</p>
                </div>
                <div className = "post__option">
                    <ShareIcon />
                    <p>Share</p>
                </div>    
            </div>
        </Container>
    )
}

export default Post
