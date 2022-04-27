import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Grid, styled, CssBaseline, Typography, Container } from '@mui/material';

import './Friends.css'

const PREFIX = 'Friends';

const classes = {
    heroContent: `${PREFIX}-heroContent`
};

const StyledContainer = styled(Container)((
    {
        theme
    }
) => ({
    [`& .${classes.heroContent}`]: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '15px',
        boxShadow: '3px 9px 21px -6px rgba(0,0,0,0.75)',
        padding: theme.spacing(8, 0, 6),
        marginTop: "1rem",
        marginBottom: "2rem",
        width: "100%"
    }
}));

const friendsList = [
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },

    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },

    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
]


const membersList = [
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },

    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },

    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
    {
        name: "karthik",
        image: "https://source.unsplash.com/random/?schoolkids",
        info: "V Sem CSE1",
    },
]

const groupsList = [
    {
        name: "Arts",
        image: "https://source.unsplash.com/random/?school",
        info: "V Sem CSE1",
    },
    {
        name: "Science",
        image: "https://source.unsplash.com/random/?school",
        info: "V Sem CSE1",
    },
    {
        name: "Anime",
        image: "https://source.unsplash.com/random/?school",
        info: "V Sem CSE1",
    },
    {
        name: "Manga",
        image: "https://source.unsplash.com/random/?school",
        info: "V Sem CSE1",
    },
    {
        name: "Photography",
        image: "https://source.unsplash.com/random/?school",
        info: "V Sem CSE1",
    },
    {
        name: "Literature",
        image: "https://source.unsplash.com/random/?school",
        info: "V Sem CSE1",
    },
    {
        name: "Paranormal Activity",
        image: "https://source.unsplash.com/random/?school",
        info: "V Sem CSE1",
    },
    {
        name: "Martial Arts",
        image: "https://source.unsplash.com/random/?school",
        info: "V Sem CSE1",
    },

]


function Friends() {


    return (
        <StyledContainer maxWidth = "md">
            <CssBaseline />
            <main>
                <div className = "friends">
                    <div id = "friends-friendsList" className = "friendsList">
                        {/* Hero unit */}
                        <div className={classes.heroContent}>
                            <Container maxWidth="sm">
                                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                    Friends
                                </Typography>
                                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                    Find all your friends and members of this site here.There's a section for groups where one can also find the groups for their clubs.
                                </Typography>
                            </Container>
                        </div>
                        {/* End hero unit */}
                        <div className = "friends__search">
                                <SearchIcon />
                                <input placeholder = "Search" type = "search" />
                        </div>
                        
                    
                        <Grid container spacing = {4} style = {{marginBottom: "2rem"}}>
                            {
                                friendsList.map((friend,i)=>{
                                    return <Grid item key = {i} xs = {6} sm = {4} md = {4} style = {{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <img src = {`${friend.image}/${i}`} alt = "friend's Pic" width = "160px" height = "160px" style = {{ borderRadius: "999px",boxShadow: "0px 9px 21px -6px rgba(0,0,0,0.75)"}}/>
                                        <Typography variant = "h5" align = "center" className = "friends__titles">
                                            <strong>{friend.name}</strong>
                                        </Typography>
                                        <Typography variant = "subtitle1" align = "center" style = {{ width: "10rem"}}>
                                            {friend.info}
                                        </Typography>
                                    </Grid>
                                })
                            }
                        </Grid>
                    </div>
                    <div id = "friends-members">
                        <div className={classes.heroContent}>
                            <Container maxWidth="sm">
                                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                    Members
                                </Typography>
                                
                            </Container>
                        </div>
                        <Grid container spacing = {4} style = {{marginBottom: "2rem"}}>
                            {
                                membersList.map((member,i)=>{
                                    return <Grid item key = {i} xs = {6} sm = {4} md = {4} style = {{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <img src = {`${member.image}/${i}`} alt = "member's Pic" width = "160px" height = "160px" style = {{ borderRadius: "999px",boxShadow: "0px 9px 21px -6px rgba(0,0,0,0.75)"}}/>
                                        <Typography variant = "h5" align = "center" className = "friends__titles">
                                            <strong>{member.name}</strong>
                                        </Typography>
                                        <Typography variant = "subtitle1" align = "center" style = {{ width: "10rem"}}>
                                            {member.info}
                                        </Typography>
                                    </Grid>
                                })
                            }
                        </Grid>
                    </div>


                    <div id = "friends-groups">
                        <div className={classes.heroContent}>
                            <Container maxWidth="sm">
                                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                    Groups
                                </Typography>
                            </Container>
                        </div>
                        <Grid container spacing = {10} style = {{marginBottom: "2rem"}}>
                            {
                                groupsList.map((Group,i)=>{
                                    return <Grid item key = {i} xs = {12} sm = {12} md = {6} style = {{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <img src = {`${Group.image}/${i}`} alt = "Group's Pic" width = "360px" height = "360px" style = {{ borderRadius: "999px",boxShadow: "0px 9px 21px -6px rgba(0,0,0,0.75)"}}/>
                                        <Typography variant = "h5" align = "center" className = "groups__titles">
                                            <strong>{Group.name}</strong>
                                        </Typography>
                                        <Typography variant = "subtitle1" align = "center" style = {{ width: "10rem"}}>
                                            {Group.info}
                                        </Typography>
                                    </Grid>
                                })
                            }
                        </Grid>
                    </div>    
                </div>
            </main>
        </StyledContainer>
    );
}

export default Friends
