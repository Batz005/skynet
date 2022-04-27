import React from 'react'
import faqList from './faqList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Accordion, AccordionDetails, AccordionSummary, Icon, Fab, Typography } from '@mui/material';



import './Help.css';

function Help() {
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        console.log(expanded)
      };
    console.log("hsdhfsdhfkjsdhkhdfkshfksh")
    return (
        <Container maxWidth = "lg">
            <div className = "help">
               
                    <div id = "help-faq" className = "help__item faq">
                        <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                            FAQs
                        </Typography>
                        <hr className ="style__one" />
                        {
                            faqList.map((faqObject)=>{
                                return (
                                
                                        <Accordion className = "faq__item" key = {faqObject.id} expanded={expanded === `panel${faqObject.id}`} onChange={handleChange(`panel${faqObject.id}`)}>
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`panel${faqObject.id}bh-content`}
                                            id={`panel${faqObject.id}bh-header`}
                                            >
                                                <Typography sx={{ width: '33%', flexShrink: 0 }}>{faqObject.question}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    {faqObject.answer}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                   

                                    
                                )
                                    
                                
                            })
                        }
                    </div>
                
                    <div id = "help-feedback" className = "help__item feedback">
                        
                        <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                            Feedback
                        </Typography>
                        <hr className ="style__one" />
                        
                        <div className = "feedback__content">
                            <div className = "feedback__item">
                                <h4>Name:</h4>
                                <input type= "text" id= "feedback-name" name = "Name" placeholder = "Enter your name here!"/>
                            </div>
                            <div className = "feedback__item">
                                <h4>Feedback:</h4>
                                <textarea id = "feedback-feedback" name = "Feedback" placeholder = "Type your feedback here!" rows = "10" columns = "100"/>
                            </div>
                            
                            <Fab color = "secondary" aria-label="chat">
                                <Icon>send</Icon>
                            </Fab>
                        </div>
                    </div>  
                   
              
            </div>
        </Container>
        
            
        
    )
}

export default Help


// <Accordion key = {faqObject.id} className = "faq__item">
                                    //     <AccordionSummary
                                    //     expandIcon={<ExpandMoreIcon />}
                                    //     aria-controls="panel1a-content"
                                    //     id={`panel${faqObject.id}a-question`}
                                    //     >
                                    //         <h3 className = "faq__question">{faqObject.question}</h3>
                                    //     </AccordionSummary>
                                    //     <AccordionDetails id = {`panel${faqObject.id}a-answer`}>
                                    //         <h4 className = "faq__answer">{faqObject.answer}</h4>
                                    //     </AccordionDetails>
                                    // </Accordion>