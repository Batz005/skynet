import React,{ useEffect } from 'react';
import './Feed.css';
import PostSender from './PostSender';
import { Container, Paper, styled } from '@mui/material';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux'
import { updatePostsList } from '../../app/posts'
import axios from 'axios';



const PREFIX = 'Feed';

const classes = {
    mainFeaturedPost: `${PREFIX}-mainFeaturedPost`,
    overlay: `${PREFIX}-overlay`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.mainFeaturedPost}`]: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random/960x540)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: "33px",
        boxShadow: "3px 9px 21px -6px rgba(0,0,0,0.75)",
        width: "100%"
       
      },

    [`& .${classes.overlay}`]: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    }
}));

function Feed() {

    const postsList = useSelector((state)=>state.posts.postsList)
    const dispatch = useDispatch()
    console.log(postsList);


    const wall = {
        image: 'https://source.unsplash.com/random/?scenary',
        imgText: 'main image description',
      };


    useEffect(() => {
        axios.get('api/getPosts').then(response=>{
            dispatch(updatePostsList(response.data))
        })
    },[])
    console.log("hjflnsdlfn");
    return (
        <Root className = 'feed'>
            <Container maxWidth = "lg" className = "feed__header" disableGutters = {true}>
              <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${wall.image})` }}>
                  {/* Increase the priority of the hero background image */}
                  {<img  style={{ display: 'none' }} src={wall.image} alt={wall.imageText} />}
                  <div className={classes.overlay} />
              </Paper>
            </Container>
            <PostSender />
            {   
            
                postsList.slice(0).reverse().map((post,i)=>{
                   
                    return <Post key = {i} postDetails = {post} />
                })
            }
            
        </Root>
    );
}

export default Feed
