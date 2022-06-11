import React,{ useState, useEffect } from 'react';

import { useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import SignIn from '../Components/SignIn/SignIn';
import SideBar from '../Components/SideBar/SideBar';
import Header from '../Components/Header/Header';
import ChatIcon from '@mui/icons-material/Chat';
import MiddleSection from '../Containers/MiddleSection/MiddleSection';
import RightSection from '../Containers/RightSection/RightSection';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
// import LinearIndeterminate from '../utils/LinearIndertiminate';
import {  Fab, Modal, Box, SpeedDial, SpeedDialAction, SpeedDialIcon, Backdrop } from '@mui/material';
import SignUp from '../Components/SignUp/SignUp';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ChatBox from '../Components/ChatBox/ChatBox';
import ForumIcon from '@mui/icons-material/Forum';
import { Close, Translate } from '@mui/icons-material';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import Messenger from '../Components/Messenger/Messenger';

const customTheme = createTheme(({
  palette: {
    
    background: {
      dark: {
        Main: '#011627',
        contrastText: '#eff2f5',
        contrastAccent: '#38F495'
      },
      light: {
        Main: '#eff2f5',
        contrastMain: 'white',
        contrastText: 'black',
        contrastAccent: '#38F495'
      },
      paper: 'white',
      contrastText: 'black'
    },
    text: {
      dark: {
        primary: '#eff2f5',
        secondary: '#38F495'
      },
      light: {
        primary: 'black',
        secondary: '#011627'
      }
    }
  }
}))

const theme = createTheme()

const actions = [
  { icon: <SmartToyIcon />, name: 'Bot' },
  { icon: <ChatIcon />, name: 'Chat' },
  
  
];

const App = () => {
  
  const active__page = useSelector((state)=>state.site.active__page);
  const isSignedIn= useSelector((state)=>state.site.isSignedIn);
  const token= useSelector((state)=>state.user.token);
  console.log(isSignedIn)
  
  // const isLoading = useSelector((state) => state.site.isLoading);
  
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://skynet.hasura.app/v1/graphql',
      headers: {
        "x-hasura-admin-secret": `notasecretanymore`,
        "Content-Type": "application/json"
      }
    }),
  });
  const [ isChatClicked, setIsChatClicked ] = useState(false)
  let [open, setOpen] = useState(false)
  let [openChat, setOpenChat] = useState(false);
  let [openBot, setOpenBot] = useState(false);
  const handleChatClicked = (e) =>{
    setIsChatClicked(false)
  }
  const handleOpenChatModal = () => {   
    setOpenChat(true) 
    handleClose()
}

const handleOpenBotModal = () => {   
  setOpenBot(true) 
  handleClose()
}

const handleCloseChat = () => setOpenChat(false);
const handleCloseBot = () => setOpenBot(false);
const handleClose = () => setOpen(false);
const handleOpen = () => setOpen(true);

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgColor: "transparent",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "row"
}

const modalBotStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '55%',
  height: '80%',
  p: 4,
  borderRadius: "10px",
  boxShadow: 24,
 
  display: "flex",
  flexDirection: "row"
}


  return (
    <ApolloProvider client = {apolloClient}>
      <ThemeProvider theme = {theme}>
        <div className="app">
        {/* {isLoading && <LinearIndeterminate /> } */}
        <Router>
          {(!isSignedIn)
          ?(<SignIn />)
          :(
          <>  
            <Modal
                          open = {openChat}
                          onClose={handleCloseChat}
                          sx = {{
                            width: "80%", 
                            height: "80%",
                            position: "fixed",
                            
                            
                            m: "auto auto"
                            

                        }}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          >
                          
                              <Messenger />
                              
                          
                          
              </Modal>
              <Modal
                          open = {openBot}
                          onClose={handleCloseBot}
                          sx = {{
                            width: "50%", 
                            height: "80%",
                            position: 'fixed',
                            m: "auto auto"
                            
                        }}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          >
                         
                              <ChatBox style = {{width: "30%"}}/>
                              
                          
                          
              </Modal>
              <Header />
              <div className = "app__body">
                <SideBar />
                {/* <Fab color = "secondary" aria-label="chat" onClick={handleOpenChatModal}>
                  <ChatIcon />
                </Fab> */}
                
                <MiddleSection />
                
                  <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    sx={{ position: 'fixed', bottom: "2em", right: "2em" }}
                    icon={<SpeedDialIcon icon = {<ChatIcon />} openIcon = {<Close />}/>}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    variant = "secondary"
                    open={open}
                  >
                    
                      <SpeedDialAction
                        key="bot"
                        icon={<SmartToyIcon />}
                        tooltipTitle="Bot"
                        tooltipOpen
                        onClick={handleOpenBotModal}
                      />
                      <SpeedDialAction
                        key="chat"
                        icon={<ForumIcon />}
                        tooltipTitle="Chat"
                        tooltipOpen
                        onClick={handleOpenChatModal}
                      />
                    
                  </SpeedDial>
                
                <RightSection />
               
              </div>
            </>
          
          )}
        </Router>
            
        {/* <Messenger /> */}
        {/* <SignUp /> */}
          
        </div>
      </ThemeProvider>
   </ApolloProvider>
  );
      
}

export default App;
