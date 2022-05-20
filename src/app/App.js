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
import {  Fab, Modal, Box } from '@mui/material';
import SignUp from '../Components/SignUp/SignUp';

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
  let [open, setOpen] = useState(false);

  const handleChatClicked = (e) =>{
    setIsChatClicked(false)
  }
  const handleOpenModal = () => {   
    setOpen(true) 
}

const handleClose = () => setOpen(false);

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "row"
}


  return (
    <ApolloProvider client = {apolloClient}>
      <ThemeProvider theme = {customTheme}>
        <div className="app">
        {/* {isLoading && <LinearIndeterminate /> } */}
        <Router>
          {(!isSignedIn)
          ?(<SignIn />)
          :(
          <>  
            <Modal
                          open = {open}
                          onClose={handleClose}

                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          >
                          <Box sx = {modalStyle} >
                              <Messenger />
                              
                          </Box>
                          
              </Modal>
              <Header />
              <div className = "app__body">
                <SideBar />
                <Fab color = "secondary" aria-label="chat" onClick={handleOpenModal}>
                  <ChatIcon />
                </Fab>
                <MiddleSection />
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
