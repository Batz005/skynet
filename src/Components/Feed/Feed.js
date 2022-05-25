import React,{ useEffect, useState } from 'react';
import './Feed.css';
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, IconButton, Icon, Button, TextField,Popover, Container, Paper } from '@mui/material';
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


import Post from './Post';

import { updatePostsList } from '../../app/posts'
import axios from 'axios';
import { grey } from '@mui/material/colors';
import { spacing } from '@mui/system';



// const PREFIX = 'Feed';

// const classes = {
//     mainFeaturedPost: `${PREFIX}-mainFeaturedPost`,
//     overlay: `${PREFIX}-overlay`
// };

// const Root = styled('div')((
//     {
//         theme
//     }
// ) => ({
//     [`& .${classes.mainFeaturedPost}`]: {
//         position: 'relative',
//         backgroundColor: theme.palette.grey[800],
//         color: theme.palette.common.white,
//         marginBottom: theme.spacing(4),
//         backgroundImage: 'url(https://source.unsplash.com/random/960x540)',
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center',
//         borderRadius: "33px",
//         boxShadow: "3px 9px 21px -6px rgba(0,0,0,0.75)",
//         width: "100%"
       
//       },

//     [`& .${classes.overlay}`]: {
//       position: 'absolute',
//       top: 0,
//       bottom: 0,
//       right: 0,
//       left: 0,
//     }
// }));


function PostSender() {
    
}


function Feed() {

    // const postsList = useSelector((state)=>state.posts.postsList)
    // const dispatch = useDispatch()
    // console.log(postsList);
    const [posts, setPosts] = useState([])
    const [input, setInput] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { first_name, id, profile_pic } = useSelector((state)=> state.user);

    


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const pid = open ? 'simple-popover' : undefined;

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
        axios.post('/.netlify/functions/newPost/newPost',{
            body: input,
            user_id: id,
            
            username: first_name,
            image: null,
            poll: null
        }).then(response=>{
            console.log(response)
            if(response?.data?.insert_Posts_one)
                setPosts([
                    ...posts,
                    response.data.insert_Posts_one
                ]
                    
                )
        })
        
        setInput("");
    }

    const handleEmojiClicked = (emoji, e)=>{
        setInput(input + emoji.native);
    }

    const handleEmojiSelected = (emoji) =>{
        setInput(input + emoji.native);
    }
    

    const wall = {
        image: 'https://source.unsplash.com/random/?scenary',
        imgText: 'main image description',
      };


    useEffect(() => {
        axios.post('/.netlify/functions/getPosts/getPosts', { id: id}).then(response=>{
            console.log(response)
            if(response?.data?.Posts)
                setPosts(response.data.Posts)
                
        })
    },[])

    
    
    return (
        <>
        <Container maxWidth = "lg" className = "feed__header" disableGutters = {true}>
              <Paper 
               sx = {{
                position: 'relative',
                backgroundColor: grey,
                color: "white",
                marginBottom: 4,
                
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                borderRadius: "33px",
                boxShadow: "3px 9px 21px -6px rgba(0,0,0,0.75)",
                width: "100%"  
               }}
               >
                  {/* Increase the priority of the hero background image */}
                  {<img  style={{ display: 'none' }} alt={wall.imageText} />}
                  <div style ={{position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0 }} />
              </Paper>
            </Container>
            
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
                        
                        onClick = {handleClick}
                        size="large">
                        <EmojiEmotionsIcon fontSize = "large" style = {{ color: "#fcc83f"}}/>
                        <h4>Emojis</h4>
                    </IconButton>
                    <Popover 
                        id={pid}
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




            {   
            
                posts.slice(0).reverse().map((post,i)=>{
                   
                    return <Post key = {i} postDetails = {post} />
                })
            }
        </>
            
            
       
    );
}

export default Feed
