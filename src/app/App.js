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
import {  Fab } from '@mui/material';

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
  console.log(isSignedIn)
  
  // const isLoading = useSelector((state) => state.site.isLoading);
  
  
  
  return (
    
      <ThemeProvider theme = {customTheme}>
        <div className="app">
        {/* {isLoading && <LinearIndeterminate /> } */}
        <Router>
          {(!isSignedIn)
          ?(<SignIn />)
          :(<>
              <Header />
              <div className = "app__body">
                <SideBar />
                <Fab color = "secondary" aria-label="chat">
                  <ChatIcon />
                </Fab>
                <MiddleSection />
                <RightSection />
                {/*Notices*/}
              </div>
            </>
          )}
        </Router>
            
      
        
          
        </div>
      </ThemeProvider>
   
  );
      
}

export default App;
