import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link} from 'react-scroll';
import { subPageSelected } from '../../app/site';
import { Container } from '@mui/material'
import './SideBarRow.css';

 

function SideBarRow({  Icon, title }) {
    const dispatch = useDispatch();
    const active__page = useSelector((state) => state.site.active__page);
    const active__subPage = useSelector(state => state.site.active__subPage);
    const temp = `${title}__SUBPAGE__ACTIVE`.toUpperCase();
    // console.log(temp, active__subPage,temp===active__subPage)
    // const sideBarItemClass = `sidebar__row ${temp===active__subPage?'sidebar__row--active':''}`;
    let scrollToLink = "";
    let offSet = 0;
    console.log(title)
    switch(title){
        case "Calender":
            scrollToLink = "events-calender";
            offSet = -200;
            break;
        case "Events":
            scrollToLink = "events-events";
            offSet = -230;
            break;
        case "Activities":
            scrollToLink = "activities-activities";
            offSet = -200;
            break;
        case "Accomplishments":
            scrollToLink = "activities-accomplishments";
            offSet = -200;
            break;
        case "Lectures":
            scrollToLink = "resource-section-lectures";
            offSet = -230;
            break;
        case "Downloads":
            scrollToLink = "resource-section-downloads";
            offSet = -230;
            break;
        case "References":
            scrollToLink = "resource-section-references";
            offSet = -230;
            break;
        case "Resources":
            scrollToLink = "resources-resources";
            offSet = -200;
            break;
        case "Favourites":
            scrollToLink = "resources-favourites";
            offSet = 0;
            break;
        case "FAQs": 
            scrollToLink = "help-faq";
            offSet = -200;
            break;
        case "Feedback":
            scrollToLink = "help-feedback";
            offSet = -300;
            break;
        case "Introduction":
            scrollToLink = "clubinfo-introduction";
            offSet = -200;
            break;
        case "Achievements":
            scrollToLink = "clubinfo-achievements";
            offSet = -230;
            break;
        case "Hall of Fame":
            scrollToLink = "clubinfo-halloffame";
            offSet = -210;
            break;
        case "Gallery":
            scrollToLink = "clubinfo-gallery";
            offSet = -210;
            break;
        case "Join":
            scrollToLink = "clubinfo-join";
            offSet = -210;
            break;
        case "Clubs":
            scrollToLink = "clubs-clubs";
            offSet = -210;
            break;
        case "MyAccount":
            if(active__page !=="HOME__ACTIVE"){
                scrollToLink = "myaccount-myaccount";
                offSet = -230;
            }
            
            break;
        case "Friends":
            scrollToLink = "friends-friendsList";
            offSet = -230;
            break;
        case "Members":
            scrollToLink = "friends-members";
            offSet = -210;
            break;
        case "Groups":
            scrollToLink = "friends-groups";
            offSet = -210;
            break;
        case "Feed":
            scrollToLink = "home-feed";
            offSet = -210;
            break;
        default:
            scrollToLink = "";
            break;
    }
    console.log(scrollToLink)
    console.log(temp)
    return (
        <Link 
            to ={scrollToLink} 
            style={{ textDecoration: "none", color: "black"}}
            spy={true} 
            smooth={true} 
            duration={750} 
            className='sidebar__row' 
            activeClass='sidebar__row--active'
            offset = {offSet}
            onClick = {() => {dispatch(subPageSelected({active__subPage: temp}))}}
        >
            <Container  >
                {Icon && <Icon />}
                <h4><strong>{title}</strong></h4>
            </Container>
        </Link>
            
    )
}

export default SideBarRow
