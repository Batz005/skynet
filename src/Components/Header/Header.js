import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from './Logo.svg'; 
import SearchIcon from '@mui/icons-material/SearchOutlined';
//import { ReactComponent as HomeOutlinedIcon } from "./HomeIcon_Outlined.svg";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'; 
//import ClubsOutlinedIcon from "./ClubsIcon_Outlined.svg";
//import ClubsIcon from "./ClubsIcon_Filled.svg";
import GroupWorkOutlinedIcon from '@mui/icons-material/GroupWorkOutlined';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined'; 
import EventIcon from '@mui/icons-material/Event';
//import ActivitiesOutlinedIcon from "./ActivitiesIcon_Outlined.svg";
//import ActivitiesIcon from "./ActivitiesIcon_Filled.svg";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
//import ResourcesOutlinedIcon from "./ResourcesIcon_Outlined.svg";
//import ResourcesIcon from "./ResourcesIcon_Filled.svg";
import { Avatar, IconButton, Tooltip, Badge } from '@mui/material';
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import InvertColorsOutlinedIcon from '@mui/icons-material/InvertColorsOutlined';
import ForumIcon from "@mui/icons-material/Forum";
import MoreMenu from './MoreMenu';
import "./Header.css";
import { deepOrange, deepPurple } from '@mui/material/colors';
import { pageSelected,subPageSelected } from '../../app/site';


function Header() {
    
    const username = useSelector((state)=>state.user.first_name);
    console.log(username);
    const active__page = useSelector((state) => state.site.active__page);
    console.log(active__page);
    
    const dispatch = useDispatch();
    return (
        <div className = "header">
            
            <div className = "header__left">
                <Link to = "/home" onClick = {()=>{
                                dispatch(pageSelected({active__page: 'HOME__ACTIVE'}));
                                dispatch(subPageSelected({active__subPage: 'FEED__SUBPAGE__ACTIVE'}));
                            }}>
                    <img src = {Logo} className = "Logo" alt = "logo" />
                </Link>
                {/* <div className = "header__input">
                    <SearchIcon />
                    <input placeholder = "Search" type = "search" />
                </div> */}
            </div>

            <div className = "header__center">

                <Tooltip title = "Home" placement = "bottom">
                    <Link to = "/home">
                        <div 
                            id = "header__home" 
                            onClick = {()=>{
                                dispatch(pageSelected({active__page: 'HOME__ACTIVE'}));
                                dispatch(subPageSelected({active__subPage: 'FEED__SUBPAGE__ACTIVE'}));
                            }}
                            className = {`header__option ${(active__page==='HOME__ACTIVE')?'header__option--active':''}`}>
                        
                            { (active__page==='HOME__ACTIVE')?
                                <HomeIcon fontSize = "large"/>
                                :<HomeOutlinedIcon fontSize = "large"/>
                            }
                        </div>
                    </Link>
                </Tooltip>

                {/* <Tooltip title = "Friends" placement = "bottom">
                    <Link to = "/friends">
                        <div 
                            id = "header__friends" 
                            onClick = {()=>{
                                dispatch(pageSelected({active__page: 'FRIENDS__ACTIVE'}));
                                dispatch(subPageSelected({active__subPage: 'FRIENDS__SUBPAGE__ACTIVE'}));
                            }}
                            className = {`header__option ${(active__page==='FRIENDS__ACTIVE')?'header__option--active':''}`}>
                        
                            { (active__page==='FRIENDS__ACTIVE')?
                                <PeopleAltIcon fontSize = "large"/>
                                :<PeopleAltOutlinedIcon fontSize = "large"/>
                            }
                        </div>
                    </Link>     
                </Tooltip> */}

                <Tooltip title = "Clubs" placement = "bottom">
                    <Link to ="/clubs">
                        <div 
                            id = "header__clubs"
                            onClick = {()=>{
                                dispatch(pageSelected({active__page: 'CLUBS__ACTIVE'}));
                                dispatch(subPageSelected({active__subPage: 'CLUBS__SUBPAGE__ACTIVE'}));
                            }} 
                            className = {`header__option ${(active__page==='CLUBS__ACTIVE'||active__page ==="CLUB__INFO__ACTIVE")?'header__option--active':''}`}>
                       
                            { (active__page==='CLUBS__ACTIVE'||active__page ==="CLUB__INFO__ACTIVE")?
                                <GroupWorkIcon fontSize = "large"/>
                                :<GroupWorkOutlinedIcon fontSize = "large"/>
                            }
                        </div>
                    </Link>
                </Tooltip>

                <Tooltip title = "Events" placement = "bottom">
                    <Link to ="/Events" >
                        <div 
                            id = "header__events" 
                            onClick = {()=>{
                                dispatch(pageSelected({active__page: 'EVENTS__ACTIVE'}));
                                dispatch(subPageSelected({active__subPage: 'EVENTS__SUBPAGE__ACTIVE'}));
                            }}
                            className = {`header__option ${(active__page==='EVENTS__ACTIVE')?'header__option--active':''}`}>
                            { (active__page==='EVENTS__ACTIVE')?
                                <EventIcon fontSize = "large"/>
                                :<EventOutlinedIcon fontSize = "large"/>
                            }    
                        </div>
                    </Link>
                </Tooltip>

                <Tooltip title = "Activities" placement = "bottom">
                    <Link to = "/Activities" >
                        <div 
                            id = "header__activities"
                            onClick = {()=>{
                                dispatch(pageSelected({active__page: 'ACTIVITIES__ACTIVE'}));
                                dispatch(subPageSelected({active__subPage: 'ACTIVITIES__SUBPAGE__ACTIVE'}));
                            }} 
                            className = {`header__option ${(active__page==='ACTIVITIES__ACTIVE')?'header__option--active':''}`}>
                        {/* <img src = {ActivitiesOutlinedIcon} className = "ActivitiesIcon header__icon" alt = "ActivitiesIcon" /> */}
                        
                            { (active__page==='ACTIVITIES__ACTIVE')?
                                <AccountBalanceWalletIcon fontSize = "large"/>
                                :<AccountBalanceWalletOutlinedIcon fontSize = "large"/>
                            }
                    
                        </div>
                    </Link>
                        
                </Tooltip>

                <Tooltip title = "Resources" placement = "bottom"> 
                    <Link to="/resources">    
                        <div 
                            id = "header__resources" 
                            onClick = {()=>{
                                dispatch(pageSelected({active__page: 'RESOURCES__ACTIVE'}));
                                dispatch(subPageSelected({active__subPage: 'RESOURCES__SUBPAGE__ACTIVE'}));
                            }}
                            className = {`header__option ${(active__page==='RESOURCES__ACTIVE'||active__page==="RESOURCE__SECTION__ACTIVE")?'header__option--active':''}`}>
                        {/* <img src = {ResourcesOutlinedIcon} className = "ResourcesIcon header__icon" alt = "ResourcesIcon" /> */}  
                            { (active__page==='RESOURCES__ACTIVE'||active__page==="RESOURCE__SECTION__ACTIVE")?
                                <LibraryBooksIcon fontSize = "large"/>
                                :<LibraryBooksOutlinedIcon fontSize = "large"/>
                            }
                        </div>
                    </Link>
                </Tooltip>
                
            </div>
            <div className = "header__right">
                <Link 
                    to = "/MyAccount/user" 
                    style= {{textDecoration: 'none', color: 'black'}}
                    onClick = {()=>{
                        dispatch(pageSelected({active__page: 'MYACCOUNT__ACTIVE'}));
                        dispatch(subPageSelected({active__subPage: 'PROFILE__SUBPAGE__ACTIVE'}));
                    }}
                >
                    <div className = "header__info">
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>
                            {username[0]}
                        </Avatar>
                        <h4>{username}</h4>
                    </div>
                </Link>
                

                <div className = "header__buttons">
                    
                    <IconButton size="large">
                        <Badge badgeContent = {5} color = 'secondary'>
                            <NotificationsActiveIcon /> 
                        </Badge>
                    </IconButton>
                    <IconButton size="large">
                        <InvertColorsOutlinedIcon />
                    </IconButton>
                    <MoreMenu />
                </div>
            </div>
        </div>
    );
}

export default Header
