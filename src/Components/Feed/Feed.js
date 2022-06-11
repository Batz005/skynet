import React, { useEffect, useState } from 'react';
import './Feed.css';
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, IconButton, Icon, Button, TextField, Popover, Container, Paper } from '@mui/material';
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





function Feed() {

    // const postsList = useSelector((state)=>state.posts.postsList)
    // const dispatch = useDispatch()
    // console.log(postsList);
    const [posts, setPosts] = useState([])
    const [postStats, setPostStats] = useState([])
    const [input, setInput] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { first_name, id, avatar_url } = useSelector((state) => state.user);
    const [imageUrl, setImageUrl] = useState("")
    const [thumbUrl, setThumbUrl] = useState("")


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const pid = open ? 'simple-popover' : undefined;

    

    const handlePostSubmit = (e) => {
        e.preventDefault();
        // const today = new Date();

        // const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        // const dateTime = date+'@'+time;
        // const d = new Date();
        // console.log(d.getUTCDate());
        axios.post('/.netlify/functions/newPost/newPost', {
            body: input,
            user_id: id,
            avatar_url: avatar_url,
            username: first_name,
            image: imageUrl,
            poll: null
        }).then(response => {
            console.log(response)
            
            // response.data.insert_Posts_one["is_liked"] = false
            // response.data.insert_Posts_one["is_disliked"] = false
            setPosts([
                response.data.insert_Posts_one,
                ...posts
                
            ]

            )
            console.log(posts)
        })

        setInput("");
        setThumbUrl("")
        setImageUrl("")
    }

    const handleEmojiClicked = (emoji, e) => {
        setInput(input + emoji.native);
    }

    const handleEmojiSelected = (emoji) => {
        setInput(input + emoji.native);
    }


    const wall = {
        image: 'https://source.unsplash.com/random/?scenary',
        imgText: 'main image description',
    };

    function showUploadWidget() { 
        window.cloudinary.openUploadWidget({ 
            cloudName: "cbit-skynet", 
            uploadPreset: "cbitskynet", 
            sources: [
                "local", 
                "url", 
                "camera", 
                "facebook", 
                "unsplash", 
                "google_drive", 
                "image_search", 
                "dropbox", 
                "instagram", 
                "shutterstock"], 
            googleApiKey: "AIzaSyCJ47LgwNQNrUlfWZKmJChvlpn1OKi-f-U", 
            showAdvancedOptions: true, 
            cropping: true, 
            multiple: false, 
            defaultSource: "local", 
            styles: { 
                palette: { 
                    window: "#10173a", 
                    sourceBg: "#20304b", 
                    windowBorder: "#7171D0", 
                    tabIcon: "#79F7FF", 
                    inactiveTabIcon: "#8E9FBF", 
                    menuIcons: "#CCE8FF", 
                    link: "#72F1FF", 
                    action: "#5333FF", 
                    inProgress: "#00ffcc", 
                    complete: "#33ff00", 
                    error: "#cc3333", 
                    textDark: "#000000", 
                    textLight: "#ffffff" }, 
                    fonts: { 
                        default: null, "'IBM Plex Sans', sans-serif": { url: "https://fonts.googleapis.com/css?family=IBM+Plex+Sans", active: true } } 
            } }, 
            (err, result) => {  if (!err && result && result.event === "success") {
                setThumbUrl(result.info.thumbnail_url)
                setImageUrl(result.info.url)
                console.log("Done! Here is the image info: ", result.info);
              } }); 
        }

    useEffect(() => {
        axios.post('/.netlify/functions/getPosts/getPosts', { id: id }).then(response => {
            console.log(response)
            setPostStats(response.data.Post_Stats)
            console.log(response.data.Post_Stats)
            if (response.data) {
                // response.data.Posts.sort((a, b) => new Date(a.date_created) - new Date(b.date_created))
                setPosts(response.data.Posts)

            }
            if (response?.data?.Post_Stats) {
                // response.data.Post_Stats.filter
                
                setPostStats(response.data.Post_Stats)
                console.log(response.data.Post_Stats)
            }

            console.log(posts, postStats)
        })
    }, [])



    return (
        <>
            <Container maxWidth="lg" className="feed__header" disableGutters={true}>
                <Paper
                    sx={{
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
                    {<img style={{ display: 'none' }} alt={wall.imageText} />}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0
                    }} />
                </Paper>
            </Container>

            <Container className="postsender">
                <div className="postsender__top">

                    <form>
                        <Avatar alt = {first_name} src = {avatar_url} />
                        <input
                            type='text'
                            value =  {input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type something idiot!"
                        />
                        <Button variant="contained" type="submit" onClick={handlePostSubmit} color="secondary" endIcon={<Icon>send</Icon>}>Post</Button>
                    </form>

                </div>
                <div className='postsender__bottom'>

                    <Button
                        className='postsender__option'

                        onClick={handleClick}
                        size="large">
                        <EmojiEmotionsIcon fontSize="large" style={{ color: "#fcc83f" }} />
                        <h4>Emojis</h4>
                    </Button>
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
                            set="google"
                            data={data}
                            title='Pick your emoji…'
                            emoji='point_up'
                            size={36}
                            emojiTooltip={true}
                            onClick={handleEmojiClicked}
                            onSelect={handleEmojiSelected}
                        />
                    </Popover>
                    {/* <IconButton className = 'postsender__option' size="large">
                        <PollIcon fontSize="large" color = "secondary"/>
                        <h4>Polls</h4>
                    </IconButton> */}
                    
                   
                    <Button className='postsender__option' size="large" onClick={showUploadWidget}>
                        <PhotoLibraryIcon style={{ color: "#002984" }} fontSize="large" />


                        <h4>Image</h4>
                    </Button>
                    

                </div>
                {thumbUrl.length !== 0 && <img src = {thumbUrl} alt = "thumbnail"/>}

            </Container>




            {
                // posts.sort((a,b)=>a.getTime()-b.getTime())
                posts.map((post, i) => {
                    const stats = postStats.filter((stat, i) => {
                        if (stat.post_id === post.id && id === stat.user_id)
                            return stat.post_id === post.id

                    })
                    console.log(stats, postStats)
                    // post['is_liked'] = stats[0]?.is_liked ?? false
                    // post['is_disliked'] = stats[0]?.is_disliked ?? false
                    return <Post key={i} postDetails={post} stats={stats} />
                })
            }
        </>



    );
}

export default Feed
