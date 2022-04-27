import React from 'react'
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
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

import "./MiddleSection.css";
import SignIn from '../../Components/SignIn/SignIn';

function MiddleSection() {
    const isSignedIn = useSelector(state => state.site.isSignedIn);
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
            <Switch>
                {
                    !isSignedIn &&
                    <Route path = "/signin" exact component = {SignIn} />
                }
                
                <Route path ="/home" exact component = {Feed} />

                {
                    isSignedIn &&
                    <Route path = "/signInHome" exact>
                        <Redirect to = "/home" />
                    </Route>
                }
                
                <Route path ="/friends" exact component = {Friends} />
                <Route path = "/clubs" exact component = {Clubs} />
                <Route path = "/clubs/clubinfo/:clubName" exact component = {ClubInfo} />
                <Route path = "/events" exact component = {Events}/>
                <Route path = "/activities" exact component = {Activities} />
            
                <Route path = "/resources" exact component = {Resources} />
                <Route path = "/resources/:resourceName" exact component = {ResourceSection} />    
                <Route path = "/myaccount/:userId" exact component = {MyAccount} />
                <Route path = "/help" exact component = {Help} />   
            </Switch>
        </Container>
    )
}

export default MiddleSection
