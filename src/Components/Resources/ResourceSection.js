import React from 'react'
import Lectures from './Lectures'
import { Container, List, ListItem, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'

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
    const {resourceName} = useParams();
    console.log(resourceName);
    const resource = resourcesList[resourceName];
    console.log(resource);
    return (
        <Container maxWidth = "lg">
            <div className = "resource__section">
               
                    <div id= "resource-section-lectures" className = "resource__section__item">
                        <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                            Lectures
                        </Typography>
                        <hr className ="style__one" />
                        <Lectures lectureLinks = {resource.lectures}/>
                        
                    </div>
                

                
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
