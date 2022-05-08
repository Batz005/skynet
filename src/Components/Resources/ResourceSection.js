import React, { useState } from 'react'
import Lectures from './Lectures'
import { Container, List, ListItem, Typography, IconButton } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import resourcesList from './resourcesList.json'
import './ResourceSection.css';



function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }
  

function ResourceSection() {
    let [isAddEnabled, setIsAddEnabled] = useState(false);
    const {resourceName} = useParams();
    console.log(resourceName);
    const resource = resourcesList[resourceName];
    console.log(resource);

    const handleAdd = () => {

    }




    return (
        <Container maxWidth = "lg">
            <div className = "resource__section">
               
                    <div id= "resource-section-lectures" className = "resource__section__item">
                        <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                            Lectures
                        </Typography>
                        <hr className ="style__one" />
                        <IconButton
                            onClick = {handleAdd}
                            style = {{ position: "absolute", top: "50px", right: "15%"}}
                            size="large">
                            {isAddEnabled ? <CloseIcon color = "secondary"/> : <AddIcon style = {{ color: "#002984"}}/>} 
                        </IconButton>
                        <Lectures lectureLinks = {resource.lectures}/>
                        
                    </div>
                
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
                        <hr className ="style__one" />
                        
                        <List dense={true}>
                        { 
                            resource.references.map((reference,id)=>{
                                return (
                                <ListItem key = {id}>
                                    <a href={reference} style = {{ font: "sans-serif 12px", color: "blue"}}target="_blank" rel="noopener noreferrer" >{reference}</a>
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
