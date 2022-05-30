import { Avatar, Button } from '@mui/material'
import React, {useState} from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { Container } from '@mui/material';
import './Post.css'
import axios from 'axios';
import { blue, green, red } from '@mui/material/colors';
import { useSelector } from 'react-redux';


function Post({ postDetails, stats }) {
    console.log(postDetails, stats)
    const date = new Date(postDetails.date_created)
    const [upvotes, setUpVotes] = useState(postDetails.likes)
    const [isLiked, setIsLiked] = useState(postDetails.is_liked)
    const { id } = useSelector((state)=>state.user)
    const [isDisLiked, setIsDisLiked] = useState(postDetails.is_disliked)
    console.log(isDisLiked)
    const [downvotes, setDownVotes] = useState(postDetails.dislikes)
    const formatted_date = date.getDate()+ "-" + date.getMonth() + "-" + date.getFullYear() + " " + date.getHours() + ":" +  date.getMinutes() + ":" + date.getSeconds()
    
    const handleUpVote = () =>{
        if(isDisLiked)
            handleDownVote()
        axios.post('/.netlify/functions/upvote/upvote',{
            id: postDetails.id,
            user_id: id,
            post_id:postDetails.post_id,
            likes: postDetails.likes,

            dislikes:postDetails.dislikes
        }).then(response=>{
            console.log(response)
            if(response.data){
                setUpVotes(response.data.likes)
                setIsLiked(response.data.is_liked)
                console.log(isLiked)
            }
               

        }
        )

    }

    const handleDownVote = () =>{
        if(isLiked)
            handleUpVote()
        axios.post('/.netlify/functions/downvote/downvote',{
            id: postDetails.id,
            user_id: id,
            post_id:postDetails.post_id,
            likes: postDetails.likes,

            dislikes:postDetails.dislikes
        }).then(response=>{
            if(response.data)
                setDownVotes(response.data.dislikes)
                setIsDisLiked(response.data.is_disliked)
                console.log(isDisLiked)
        }
        )
    }


    return (
        <Container sx = {{
            width: "100%",
            mt: 2,
            borderRadius: 2,
            bgcolor: "white",
            boxShadow: 4
        }}>
            <div className = "post__top">
                <Avatar className = "post__avatar">
                {postDetails.profile_pic ? <img src = "postDetails.profile_pic"/> : postDetails.username[0]} 
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
                <Button className = "post__option" onClick={handleUpVote} >
                    
                    <strong style={{color: isLiked? "green": "blue"}}>{upvotes}</strong>
                    <KeyboardArrowUpIcon fontSize = "large" style = {{color: isLiked? "green": "blue"}}/>
                </Button>
                <Button className = "post__option" onClick = {handleDownVote} >
                    <strong style={{color: isDisLiked? "red": "blue"}}>{downvotes}</strong>
                    <KeyboardArrowDownIcon fontSize = "large" style={{color: isDisLiked? "red": "blue"}}/>
                </Button>
                <Button className = "post__option">
                    <CommentIcon />
                    <p>Comment</p>
                </Button>
                  
            </div>
        </Container>
    )
}

export default Post
