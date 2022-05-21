import { IconButton, FormControl, Input, InputLabel, ButtonGroup, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useState,useEffect } from 'react';
import Message from '../Message/Message'
import FlipMove from 'react-flip-move';
import Logo from '../../Logo.svg'; 
import axios from 'axios';
import { useSelector, useDispatch} from 'react-redux'
import './ChatBox.css';
import { categorySelected } from '../../app/category';

function ChatBox() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    
    const [logoPressed, setLogoPressed] = useState(true)
    // const dispatch = useDispatch();
    // const category = useSelector(state => state.category.category)
    // console.log(category)
    const username = useSelector(state => state.user.first_name)
    console.log(username)
    function ButtonMessage () {
        return (
        <div>
            <ButtonGroup>
                <Button onClick = {()=>{
                    
                    messages.push({username: "chatbot", text: "I'm glad that you've chosen to chat with me. We will talk about all kinds of things...", isEntity: false, isButton: false})
                    setMessages([...messages])
                    // dispatch(categorySelected({ category: 'chat'}));
                }}>Just Chat!</Button>
                <Button onClick = {()=>{
                    
                    messages.push({username: "chatbot", text: "You can ask me queries regarding the college. I will try my best to answer them correctly...", isEntity: false, isButton: false})
                    setMessages([...messages])
                    // dispatch(categorySelected({ category: 'college-enquiry'}));
                }}>College Enquiry</Button>
            </ButtonGroup>   
        </div>
        )
    }

    useEffect(()=>{
        messages.push({username: "chatbot", text: "Hi, I'm Skynet! I'm a chatbot. I'm here to help you...", isEntity: false, isButton: false})
        setMessages([...messages]);
        
        
        // messages.push({username: "chatbot", text: 'chatbot_buttonGroup', isEntity: false, isButton: true})
        // setMessages([...messages]);
    }, [logoPressed])
    
    const sendMessage = (e) => {
        e.preventDefault();
        messages.push({username: username, text: input, isEntity: false, isButton: false})
        setMessages([...messages]);
        console.log(messages)
        fetch('/.netlify/functions/getResponse/getResponse',{
            method: "POST",
            body: JSON.stringify({
                message: input
            })
            // category: category,
            
        }).then((response)=>response.json())
        .then(data=>{
            console.log(data)
            messages.push({username: "chatbot", text: data.data.text, isEntity: false, isButton: false})
            setMessages([...messages]);
            if (data.data.entity_result){
                messages.push({username: "chatbot", text: data.data.entity_result, isEntity: true, isButton: false})
                setMessages([...messages]);
            }
               
        // }
        console.log(data)
        })
            // if (category === 'chat'){
            //     messages.push({username: "chatbot", text: response.data, isEntity: false, isButton: false})
            //     setMessages([...messages]);
            // }
            // else if ( category === 'college-enquiry'){
                
        
        .catch((err)=>{
            console.log(err)
        })
        setInput('')
    }
    return (
        <div className = "chatbox">
            <div className = "chatbox__hero">
                <img src = {Logo} alt = "logo" className = "chatbox__logo" onClick = {()=>{setLogoPressed(!logoPressed)}}/>
                <h1><strong>ChatBot</strong></h1>
            </div>
            <div className = "chatbox__messages">
                <FlipMove >
                    {
                        messages.map((message,i)=>{
                            console.log(i)
                            // if (message.text === "chatbot_buttonGroup"){
                            //     message.text = ButtonMessage
                            // }
                            
                            return (<Message key = {i} username = {username} message = {message}/>);
                        })
                    }
                </FlipMove>
            </div>
            
            <form className = "chatbox__form">
                <FormControl className = "chatbox__formControl">
                    <InputLabel>Enter a message...</InputLabel>
                    <Input className = "chatbox__input" name = "message" value = {input} onChange = {e => setInput(e.target.value)} />
                    <IconButton 
                        type = 'submit' 
                        disabled = {!input} 
                        variant = 'contained' 
                        color = "secondary" 
                        className = "chatbox__iconButton"
                        onClick = {sendMessage}
                    >
                        <SendIcon />
                    </IconButton>
                </FormControl>    
            </form>
            
            
            
        </div>
    )
}

export default ChatBox;