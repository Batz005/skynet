import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer } from './messengerUtils';

import 'stream-chat-react/dist/css/index.css';
import './Messenger.css';
import { useSelector } from 'react-redux';
const cookies = new Cookies();

const apiKey ='gf9sh7cj96nk';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);




const Messenger = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const id = useSelector(state=>state.user.id)
   
        client.connectUser({
            id: id,
            name: cookies.get('username'),
            fullName: cookies.get('fullName'),
            image: cookies.get('avatarURL'),
            hashedPassword: cookies.get('hashedPassword'),
            phoneNumber: cookies.get('phoneNumber'),
        }, client.devToken(id))
    
   


    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div>
    );

    // const [client, setClient] = useState(null)
    // const [channel, setChannel] = useState(null)
    // // const user = useSelector(state=>state.user)
    // useEffect(()=>{
    //     async function init() {
    //         const chatClient = StreamChat.getInstance(apiKey)

    //         await chatClient.connectUser({
    //                     id: "bharath",
    //                     name: "bharath",
    //                     fullName: "bharath kkkk",
    //                     phoneNumber: "9550205315",
    //                 }, chatClient.devToken("bharath"))

    //         const channel = chatClient.channel("team", "cbit-channel", {
    //             name: "Talk about cbit",
    //             members: ["bharath"]
    //         })

    //         await channel.watch()

    //         setChannel(channel)
    //         setClient(chatClient)
    //     }

    //     init()
    //     if (client) return () => client.disconnectUser()
    // }, [])

    // return (
    //     <Chat client={client} theme='messaging light'>
    //         <Channel channel={channel}>
    //         <Window>
    //             <ChannelHeader />
    //             <MessageList />
    //             <MessageInput />
    //         </Window>
    //         <Thread />
    //         </Channel>
    //     </Chat>
    // )
}

export default Messenger;