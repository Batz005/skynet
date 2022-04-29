import React from 'react'
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Feed from '../../Components/Feed/Feed';
import Resources from '../../Components/Resources/Resources';
import ResourceSection from '../../Components/Resources/ResourceSection';
import Help from '../../Components/Help/Help';
import Activities from '../../Components/Activities/Activities';
import Events from '../../Components/Events/Events'
import ClubInfo from '../../Components/Clubs/ClubInfo'
import Clubs from '../../Components/Clubs/Clubs'
import MyAccount from '../../Components/MyAccount/MyAccount'
import Friends from '../../Components/Friends/Friends'
import { Container } from '@mui/material'
import nhost from '../../lib/nhost'

import "./MiddleSection.css";
import SignIn from '../../Components/SignIn/SignIn';

function MiddleSection() {
    // const isSignedIn = useSelector(state => state.site.isSignedIn);
    const {isSignedIn } = nhost.auth

    // const pageFinder = (active__page) =>{
    //     switch(active__page){
    //         case 'HOME__ACTIVE':
    //             return <Feed />
    //             break;
    //         case 'FRIENDS__ACTIVE':
                
    //             break;
    //         case 'CLUBS__ACTIVE':
    //             //Use a function to check which is active Joined clubs or the clubs page.
    //                 //if the student joined a club, then this should be loaded.
    //                 //if the student didn't join any club and isn't in a particular club's page then nothing should be loaded.

    //             break;
    //         case 'EVENTS__ACTIVE':
               
    //             break;
    //         case 'ACTIVITIES__ACTIVE':
                    
    //             break;
    //         case 'RESOURCES__ACTIVE':
                   
    //             break;
    //         case 'HELP__ACTIVE':
    //             return <Help />
    //         default:
                    
    //             break;
    //     }
    // }
        
    
    
    
    return (
        <Container className = "middlesection" style ={{ marginLeft: "2rem", maxWidth: "90%"}} disableGutters = {true}>
            <Routes>
                {
                    !isSignedIn &&
                    <Route path = "/signin" exact element = {<SignIn />} />
                }
                
                <Route path ="/home" exact element = {<Feed />} />

                {/* {
                    isSignedIn &&
                    <Route path = "/signInHome" exact>
                        <Route path="/signInHome" render={() => <Navigate to="/home" />} />

                    </Route>
                } */}
                
                <Route path ="/friends" exact element = {<Friends />} />
                <Route path = "/clubs" exact element = {<Clubs />} />
                <Route path = "/clubs/clubinfo/:clubName" exact element = {<ClubInfo />} />
                <Route path = "/events" exact element = {<Events />}/>
                <Route path = "/activities" exact element = {<Activities />} />
            
                <Route path = "/resources" exact element = {<Resources />} />
                <Route path = "/resources/:resourceName" exact element = {<ResourceSection />} />    
                <Route path = "/myaccount/:userId" exact element = {<MyAccount />} />
                <Route path = "/help" exact element = {<Help />} />   
            </Routes>
        </Container>
    )
}

export default MiddleSection
