import React,{ useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, IconButton, Icon, Button, TextField,Popover,  } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PollIcon from '@mui/icons-material/Poll';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import 'emoji-mart/css/emoji-mart.css'
import data from 'emoji-mart/data/google.json'
import { NimblePicker } from 'emoji-mart'
import { v4 as uuidv4 } from 'uuid';
import { addNewPost } from '../../app/posts'
import axios from 'axios'


import './PostSender.css';

function PostSender() {
    const [input, setInput] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { username, uid, profile_pic } = useSelector((state)=> state.user);
    const dispatch = useDispatch();


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleImageVideoClicked = (e)=>{

    }

    const handlePostSubmit = (e) =>{
        e.preventDefault();
        // const today = new Date();

        // const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        // const dateTime = date+'@'+time;
        // const d = new Date();
        // console.log(d.getUTCDate());
        axios.post('/api/newPost',{
            post_id: uuidv4(),
            body: input,
            user_id: uid,
            author: username,
            profile_pic: "jflksjfl",
            image: null,
            poll: null
        }).then(response=>{
            dispatch(addNewPost(
                response.data[0]
            ))
        })
        
        setInput("");
    }

    const handleEmojiClicked = (emoji, e)=>{
        setInput(input + emoji.native);
    }

    const handleEmojiSelected = (emoji) =>{
        setInput(input + emoji.native);
    }
    return (
        <div className = "postsender">
            <div className = "postsender__top">
                
                <form>
                <Avatar />
                    <input 
                        type = 'text' 
                        value = {input}
                        onChange = {(e)=> setInput(e.target.value)}
                        placeholder = "Type something idiot!" 
                    />
                    <Button variant = "contained" type = "submit" onClick = {handlePostSubmit} color = "secondary" endIcon = {<Icon>send</Icon>}>Post</Button>
                </form>
                
            </div>  
            <div className = 'postsender__bottom'>
                
                <IconButton
                    className = 'postsender__option'
                    aria-describedby={id}
                    onClick = {handleClick}
                    size="large">
                    <EmojiEmotionsIcon fontSize = "large" style = {{ color: "#fcc83f"}}/>
                    <h4>Emojis</h4>
                </IconButton>
                <Popover 
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <NimblePicker 
                        set = "google" 
                        data = {data} 
                        title='Pick your emoji…' 
                        emoji='point_up' 
                        size={36}
                        emojiTooltip = {true}
                        onClick = {handleEmojiClicked}
                        onSelect = {handleEmojiSelected}
                    />
                </Popover>
                <IconButton className = 'postsender__option' size="large">
                    <PollIcon fontSize="large" color = "secondary"/>
                    <h4>Polls</h4>
                </IconButton>
                <IconButton className = 'postsender__option' size="large">
                    <PhotoLibraryIcon style = {{ color: "#002984"}} fontSize = "large"/>
                    <h4>Photo/Video</h4>
                </IconButton>
            </div>
                
            
        </div>
    );
}


export default PostSender
