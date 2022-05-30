import React, { useEffect, useState } from 'react'
import Lectures from './Lectures'
import { Container, List, ListItem, Typography, IconButton, Modal, Box, Button } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import resourcesList from './resourcesList.json'
import getVideoId from '../utils/getVideoId';
import './ResourceSection.css';
import axios from 'axios';
import { useAuthQuery } from '@nhost/react-apollo';
import { useMutation, gql, useQuery  } from '@apollo/client';
import { useSelector } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Carousel } from 'react-responsive-carousel';


import ReactPlayer from 'react-player/youtube'

  
const GET_RESOURCE_DATA = gql`
query GetResourceData($resource_id: uuid!) {
    Resources_by_pk(id: $resource_id) {
      id
      Lectures {
        id
        title
        video_id
      }
      References {
        id
        url
          }
    }
  }

`
  
const INSERT_REFERENCE = gql`
mutation MyMutation($added_by: uuid!, $resource_id: uuid!, $url:String) {
    insert_References_one(object: {added_by: $added_by, resource_id: $resource_id, url: $url}){
      id
      url
    }
  }

`

const INSERT_LECTURE = gql`
mutation MyMutation($added_by: uuid!, $resource_id: uuid!, $video_id:String, $title: String) {
    insert_Lectures_one(object: {added_by: $added_by, resource_id: $resource_id, video_id: $video_id, title: $title}){
      id

      video_id
    }
  }

`
  
const YoutubeSlide = ({ url, isSelected }) => (
    <ReactPlayer width="100%" url={url} playing={isSelected} controls = {true} light = {true} pip = {true}/>
  );


function ResourceSection() {
    
    let [openLectureModal, setOpenLectureModal] = useState(false);
    let [openReferenceModal, setOpenReferenceModal] = useState(false);
    let [lectureInput, setLectureInput] = useState("")
    let [referenceInput, setReferenceInput] = useState("")
    const {resourceId} = useParams();
    // let [data, setData] = useState({});
    let [isRefEditEnabled, setIsRefEditEnabled] = useState(false);
    let [resourceData, setResourceData] = useState({})
    let [url, setUrl] = useState("")
    const userId = useSelector((state)=>state.user.id);

    const queryResults = useQuery(GET_RESOURCE_DATA, {
        variables: {
            resource_id: resourceId
        }
    })
    
   const [insertReference, { data, loading, error}] = useMutation(INSERT_REFERENCE)

   const [insertLecture, lectureResults] = useMutation(INSERT_LECTURE)

    useEffect(() => {
        if(queryResults.data){
          setResourceData(queryResults.data.Resources_by_pk)
        }
        else{
            setResourceData({
                "References": [],
                "Lectures": []

            })
        }
            
          
      }, [queryResults.data])

    const handleOpenLectureModal = () => {   
        setOpenLectureModal(true) 
    }

    const handleCloseLectureModal = () => {setOpenLectureModal(false);}

    const handleOpenReferenceModal = () => {   
        setOpenReferenceModal(true) 
    }

    const handleCloseReferenceModal = () => {setOpenReferenceModal(false);}

    const fetchVideoData = async (videoId) => {
       
        // let videoData = {}
        const response = axios.post(
            "/.netlify/functions/getVideoData/getVideoData", {
                videoId: videoId
            }
        )
        let videoData = await response
        console.log((videoData))
        
        // .then(res => {
        //     videoData = res.data;
        //     console.log(videoData)
        //     setData(videoData)
            // const { title,  publishedAt } = data.items[0].snippet;
            // const thumbnailUrl = data.items[0].snippet.thumbnails.default.url;
            // const publishedDateArray = publishedAt.substr(0,10).split("-");
            // const publishedDate = publishedDateArray.reverse().join("-")
            
            
        //   })
        
        // .then(data => {
        //     console.log(data)
        //     videoData = data
        // })
        
        // const jsonData = await response.json();
        // const videoData = await jsonData
        return videoData.data
      };

     

    const handleLectureUrlSubmit = async (e) => {
        e.preventDefault();
        const videoId = getVideoId(lectureInput)
        const data = await fetchVideoData(videoId)
        console.log(data)
        const new_lecture = await insertLecture({
            variables: {
                added_by: userId,
                 resource_id: resourceId,
                 title: data.title,
                 video_id: videoId
                 
            }
        })
        resourceData.Lectures.push({
            added_by: userId,
                 resource_id: resourceId,
                 title: data.title,
                 video_id: videoId
        })
        handleCloseLectureModal()
    }

    const customRenderItem = (item, props) => <item.type {...item.props} {...props} />;

    const getVideoThumb = (video_id) => `https://img.youtube.com/vi/${video_id}/default.jpg`;
  
    // const getVideoId = (url) => url.substr('https://www.youtube.com/embed/'.length, url.length);
  
    const customRenderThumb = (children) =>
        children.map((item, i) => {
            const video_id = getVideoId(item.props.url);
            return <img key = {i} src={getVideoThumb(video_id)} />;
        });

    const handleReferenceUrlSubmit = async (e) => {
        e.preventDefault();
        
        const response = await insertReference({
            variables: {
                 added_by: userId,
                 resource_id: resourceId,
                 url: referenceInput
            }
        })
        const new_reference = await response
        console.log(queryResults.data.Resources_by_pk.References)
        console.log(resourceData)
        console.log(new_reference)
        resourceData.References.push(new_reference.data.insert_References_one)
        console.log(queryResults)
        handleCloseReferenceModal();
    }
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
        borderRadius: "10px",
        boxShadow: 24,
        m: 0,
        p: 4,
        display: "flex",
        flexDirection: "row"
    }

    const handleReferenceEdit = (e) => {
            setIsRefEditEnabled(!isRefEditEnabled)
    }
    return (
        <Container maxWidth = "lg">
            <div className = "resource__section">
               
                    <div id= "resource-section-lectures" className = "resource__section__item">
                        <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                            Lectures
                        </Typography>
                        <IconButton
                            onClick = {handleOpenLectureModal}
                            style = {{ position: "absolute", top: "5%", right: "5%", zIndex: "5"}}
                            size="large">
                            <AddIcon style = {{ color: "blue"}}/>
                        </IconButton>
                        <hr className ="style__one" />
                        
                        {/* <Lectures resourceId = {resourceId} lectures = {resourceData.lectures}/> */}
                        <Carousel renderItem={customRenderItem} renderThumbs={customRenderThumb}>
                            {
                                resourceData?.Lectures?.map((lecture, i) => (

                                    <YoutubeSlide key={`youtube-${i}`} url={`https://www.youtube.com/embed/${lecture.video_id}`}  />
                                        // <iframe 
                                        //   width="560" 
                                        //   height="315" 
                                        //   src="https://www.youtube.com/embed/{lectureLink}" 
                                        //   title="YouTube video player" 
                                        //   frameborder="0" 
                                        //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        //   allowfullscreen="allowfullscreen">

                                        // </iframe>
                                ))
                            }
                
          
          
                        </Carousel>
                        
                    </div>
                    <Modal
                        open = {openLectureModal}
                        onClose={handleCloseLectureModal}
                        
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box sx = {modalStyle} >
                            <form  style = {{width: "100%", display: "flex", flexDirection: "row"}}>
                                <input 
                                type = 'text' 
                                className = "url__input"
                                defaultValue = ""
                                onChange = {(e)=> setLectureInput(e.target.value)}
                                placeholder = "Enter the youtube video URL" 
                                    />
                                <Button variant = "contained" type = "submit" onClick = {handleLectureUrlSubmit} color = "primary" endIcon = {<AddIcon />}>Add</Button>
                            </form>
                            
                        </Box>
                        
                    </Modal>
                
                    {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/DGQA4gxjLr8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                
                    {/* <div id = "resource-section-downloads" className = "resource__section__item resource__section__downloads">
                        <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                            Downloads
                        </Typography>
                        <hr className ="style__one" />
                    </div>
                  */}

                
                    <div id = "resource-section-references" className = "resource__section__item resource__section__references">
                        <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                            References
                        </Typography>
                        <IconButton
                            onClick = {handleReferenceEdit}
                            style = {{ position: "absolute", top: "5%", right: "5%", zIndex: "5"}}
                            size="large">
                            {isRefEditEnabled ? <CloseIcon style = {{ color: "red"}}/> : <EditIcon style = {{ color: "blue"}}/>} 
                        </IconButton>
                        {
                        isRefEditEnabled && 
                        <IconButton
                            onClick = {handleOpenReferenceModal}
                            style = {{ position: "absolute", top: "5%", right: "10%", zIndex: "5"}}
                            size="large">
                            {<AddIcon style = {{ color: "blue"}}/>} 
                        </IconButton>}

                        <hr className ="style__one" />
                        <Modal
                        open = {openReferenceModal}
                        onClose={handleCloseReferenceModal}
                        
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box sx = {modalStyle} >
                            <form  style = {{width: "100%", display: "flex", flexDirection: "row"}}>
                                <input 
                                type = 'text' 
                                className = "url__input"
                                defaultValue = ""
                                onChange = {(e)=> setReferenceInput(e.target.value)}
                                placeholder = "Enter reference link" 
                                    />
                                <Button variant = "contained" type = "submit" onClick = {handleReferenceUrlSubmit} color = "primary" endIcon = {<AddIcon />}>Add</Button>
                            </form>
                            
                        </Box>
                        
                    </Modal>
                        <List dense={true} sx = {{ width: "100%"}}>
                        { 
                            (resourceData?.References?.map((reference,id)=>{
                                return (
                                <ListItem key = {id} sx = {{ width: "100%"}}>
                                    {
                                        isRefEditEnabled ? 
                                        (<Box sx = {{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            width: "100%"
                                        }}>
                                            <input type = "text" defaultValue = {reference.url} id = "ref__input"/>
                                            <IconButton
                                                onClick = {handleReferenceEdit}
                                                style = {{ position: "absolute", top: "5%", right: "5%", zIndex: "5"}}
                                                size="small">
                                                <DeleteForeverTwoToneIcon style = {{color: "red"}}/>
                                            </IconButton>
                                        </Box>
                                        
                                        ):
                                        <a href={reference.url} style = {{ font: "sans-serif 10px", color: "blue", overflow: "hidden"}}target="_blank" rel="noopener noreferrer" >{reference.url}</a>
                                    }
                                    
                                </ListItem>)
                            })
                        )
                        }
                        
                        </List> 
                    </div>
                  
            </div>
        </Container>
            
    )
}

export default ResourceSection
