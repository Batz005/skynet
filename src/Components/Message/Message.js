import { CardContent, Typography, Card, Avatar } from '@mui/material'
import React, { forwardRef} from 'react'
import { useSelector } from 'react-redux';
import Logo from '../../Logo.svg'; 
import './Message.css'

const Message = forwardRef(({ username, message }, ref) => {
    const isUser = username === message.username?true: false;
    const { avatar_url } = useSelector(state=>state.user)
    console.log(isUser)
    const renderAvatar = (position)=>{

        if(!isUser && position ==='before'){
            return <Avatar className = "message__avatar" alt = "chatbot" src = {Logo}></Avatar>
        }
        if(isUser && position ==='after'){
            return <Avatar className = "message__avatar" src = {avatar_url} alt = {username}>{username[0].toUpperCase()}</Avatar>
        }
    }
    return (
        <div ref = {ref} className = {`message ${isUser && "message__user"}`}>
            {renderAvatar('before')}
            <Card className = {isUser ? "message__userCard" : "message__botCard"}>
                <CardContent>
                    <Typography
                        variant = "h6" 
                        component = "h6"
                    >

                    {
                        message.isEntity?(

                            <div>
                                <a href={message.text} download>click here</a>
                            </div>
                        ):
                        message.isButton?(
                            <div>
                                {message.text()}
                            </div>
                        ):
                        message.text
                    }
                    </Typography>
                </CardContent>
            </Card> 
            {renderAvatar('after')} 
        </div>
    )
})

export default Message
