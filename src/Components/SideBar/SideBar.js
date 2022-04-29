import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import sideBarItemsList from './sideBarItemsList.json'
import {Link} from 'react-router-dom';
import { Container } from '@mui/material'
import "./SideBar.css";
import { pageSelected,subPageSelected } from '../../app/site';
import SideBarRow from './SideBarRow';
import MenuIcon from '@mui/icons-material/Menu';

function SideBar() {
    
    const active__page = useSelector(state => state.site.active__page);
    const dispatch = useDispatch();
    const sidebar__items = sideBarItemsList[active__page];
    console.log(sidebar__items,active__page);
    return (
        <Container className = "sidebar" style= {{ maxWidth: "15%"}}>
                <MenuIcon />
                {sidebar__items.map((item,i) => {
                    // if (active__page ==="HOME__ACTIVE" && item === "Profile"){
                    //     return <Link 
                    //             to = "/MyAccount/user" 
                    //             style = {{textDecoration: 'none', color: 'black'}}
                    //             onClick = {()=>{
                    //                 dispatch(pageSelected({active__page: 'MYACCOUNT__ACTIVE'}));
                    //                 dispatch(subPageSelected({active__subPage: 'MYACCOUNT__SUBPAGE__ACTIVE'}));
                    //             }}>
                    //         <SideBarRow title = {item} key = {item}/>
                    //     </Link> 
                    // }else{}
                        return <SideBarRow title = {item} key = {i}/>
                     
                    
                })    
                }
            
        </Container>    
            
    )
}

export default SideBar
