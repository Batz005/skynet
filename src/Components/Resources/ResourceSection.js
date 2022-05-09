import React, { useState } from 'react'
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



// function generate(element) {
//     return [0, 1, 2].map((value) =>
//       React.cloneElement(element, {
//         key: value,
//       }),
//     );
//   }
  
  
  

  



function ResourceSection() {
    
    let [open, setOpen] = useState(false);
    let [input, setInput] = useState("")
    const {resourceName} = useParams();
    let [data, setData] = useState({});
    let [isRefEditEnabled, setIsRefEditEnabled] = useState(false);
    console.log(resourceName);
    const resource = resourcesList[resourceName];
    console.log(resource);

    
    const handleOpenModal = () => {   
        setOpen(true) 
    }

    const handleClose = () => setOpen(false);

    const fetchVideoData =  (videoId) => {
        const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
        const BASE_URL = "youtube.googleapis.com/youtube/v3";
        
        let videoData = {}
        axios.get(
          `https://${BASE_URL}/videos?key=${YOUTUBE_API_KEY}&part=snippet&id=${videoId}`
        ).then(res => {
            videoData = res.data;
            console.log(videoData)
            setData(videoData)
            const { title,  publishedAt } = data.items[0].snippet;
            const thumbnailUrl = data.items[0].snippet.thumbnails.default.url;
            const publishedDateArray = publishedAt.substr(0,10).split("-");
            const publishedDate = publishedDateArray.reverse().join("-")
            
            console.log(title,  publishedDate, thumbnailUrl, publishedDateArray)
          })
        
        // .then(data => {
        //     console.log(data)
        //     videoData = data
        // })
        
        // const jsonData = await response.json();
        // const videoData = await jsonData
        
      };

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        const videoId = getVideoId(input)
        fetchVideoData(videoId)
        console.log(data)
        
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
                            onClick = {handleOpenModal}
                            style = {{ position: "absolute", top: "5%", right: "5%", zIndex: "5"}}
                            size="large">
                            <AddIcon style = {{ color: "blue"}}/>
                        </IconButton>
                        <hr className ="style__one" />
                        
                        <Lectures lectureLinks = {resource.lectures}/>
                        
                    </div>
                    <Modal
                        open = {open}
                        onClose={handleClose}
                        
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box sx = {modalStyle} >
                            <form  style = {{width: "100%", display: "flex", flexDirection: "row"}}>
                                <input 
                                type = 'text' 
                                id = "url__input"
                                defaultValue = ""
                                onChange = {(e)=> setInput(e.target.value)}
                                placeholder = "Enter the youtube video URL" 
                                    />
                                <Button variant = "contained" type = "submit" onClick = {handleUrlSubmit} color = "primary" endIcon = {<AddIcon />}>Add</Button>
                            </form>
                            
                        </Box>
                        
                    </Modal>
                
                    {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/DGQA4gxjLr8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                
                    <div id = "resource-section-downloads" className = "resource__section__item resource__section__downloads">
                        <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                            Downloads
                        </Typography>
                        <hr className ="style__one" />
                    </div>
                 

                
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
                        <hr className ="style__one" />
                        
                        <List dense={true} sx = {{ width: "100%"}}>
                        { 
                            resource.references.map((reference,id)=>{
                                return (
                                <ListItem key = {id} sx = {{ width: "100%"}}>
                                    {
                                        isRefEditEnabled ? 
                                        (<Box sx = {{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            width: "100%"
                                        }}>
                                            <input type = "text" defaultValue = {reference} id = "ref__input"/>
                                            <IconButton
                                                onClick = {handleReferenceEdit}
                                                style = {{ position: "absolute", top: "5%", right: "5%", zIndex: "5"}}
                                                size="small">
                                                <DeleteForeverTwoToneIcon style = {{color: "red"}}/>
                                            </IconButton>
                                        </Box>
                                        
                                        ):
                                        <a href={reference} style = {{ font: "sans-serif 10px", color: "blue"}}target="_blank" rel="noopener noreferrer" >{reference}</a>
                                    }
                                    
                                </ListItem>)
                            })
                        }
                        </List> 
                    </div>
                  
            </div>
        </Container>
            
    )
}

export default ResourceSection
