import React, { useState } from 'react';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import AddIcon from '@mui/icons-material/Add'
import { useDispatch } from 'react-redux';
import {
  Link as MaterialLink,
  Paper,
  styled,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Typography,
  Container,
  Box,
  Modal,
  Button
} from '@mui/material';
import { Link }from 'react-router-dom';

import { pageSelected } from '../../app/site';

const PREFIX = 'Clubs';

const classes = {
  heroContent: `${PREFIX}-heroContent`,
  cardGrid: `${PREFIX}-cardGrid`,
  clubsList: `${PREFIX}-clubsList`,
  overlay: `${PREFIX}-overlay`,
  clubsListContent: `${PREFIX}-clubsListContent`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.heroContent}`]: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '15px',
    boxShadow: '3px 9px 21px -6px rgba(0,0,0,0.75)',
    padding: theme.spacing(8, 0, 6),
  },

  [`& .${classes.cardGrid}`]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  [`& .${classes.clubsList}`]: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: "15px",
    boxShadow: "0px 3px 7px -2px rgba(0,0,0,0.75)"
  },

  [`& .${classes.overlay}`]: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },

  [`& .${classes.clubsListContent}`]: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MaterialLink color="inherit" href="https://material-ui.com/">
        Your Website
      </MaterialLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const clubsList = [
    {
        title: 'CyberSecurity Club',
        image: 'https://source.unsplash.com/random/?cybersecurity',
        imgText: 'CyberSecurity',
    },
    {
        title: 'Photography Club',
        image: 'https://source.unsplash.com/random/?Photography',
        imgText: 'Photography',
    },
    {
        title: 'CBIT Open Source Community',
        image: 'https://source.unsplash.com/random/?Open%20Source',
        imgText: 'CBIT Open Source Community',
    },
    {
        title: 'BasketBall Club',
        image: 'https://source.unsplash.com/random/?BasketBall',
        imgText: 'BasketBall Club',
    },
    
]

export default function Clubs() {
  let [open, setOpen] = useState(false);

  const handleOpenModal = () => {   
    setOpen(true) 
  }

  const handleClose = () => setOpen(false);
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    borderRadius: "10px",
    boxShadow: 24,
    m: 0,
    p: 4,
    display: "flex",
    flexDirection: "row"
}
  const dispatch = useDispatch();

  return (
    <Root>
      <CssBaseline />
      <main>
      <div id = "clubs-clubs">
         {/* Hero unit */}
         <Box sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                        boxShadow: 10,
                        borderRadius: '15px',
                        position: 'relative'
                      }}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Clubs
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              This section has all the clubs available in the college. You can select a club and see all the details regarding the club. Clubs that a student has already joined will be shown to the right.
            </Typography>
            <IconButton
                              onClick = {handleOpenModal}
                              style = {{ position: "absolute", top: "5%", right: "5%"}}
                              size="large">
                              <AddIcon style = {{ color: "blue"}}/>
            </IconButton>
          </Container>
        </Box>
        <Modal
                          open = {open}
                          onClose={handleClose}

                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          >
                          <Box sx = {modalStyle} >
                              <form  style = {{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", margin: "1em", padding: "0"}}>
                                  <div className = "resource__add__items">
                                    <input 
                                    type = 'text' 
                                    className='resource__title'
                                    defaultValue = ""
                                    
                                    placeholder = "Title of the Resource" 
                                    style = {{ fontColor: "black"}}
                                        />
                                  </div>
                                  <div className = "resource__add__items">
                                    <input 
                                      type = 'text' 
                                      className='resource__imgUrl'
                                      defaultValue = ""
                                      
                                      placeholder = "ImageUrl (optional)" 
                                          />
                                  </div>
                                  <div className='resource__add__items'>
                                    <textarea 
                                      className='resource__description' 
                                      name = "description"
                                      
                                      placeholder = "Type your description here!" 
                                      rows = "10" 
                                      columns = "100"
                                      />
                                  </div>
                                  
                                  <Button variant = "contained" type = "submit"  color = "primary" >Submit</Button>
                              </form>
                              
                          </Box>
                          
                    </Modal>
        <Container sx={{ py: 8 }} maxWidth="md" style = {{ width: "100%"}}>
          {/* End hero unit */}
          <Grid container spacing={4} style = {{ width: "100%"}}>
            {clubsList.map((clubsList,i) => (
              <Grid item key={i} xs={12} sm={6} md={6} >
                  <Link 
                    to ={`/clubs/clubinfo/${clubsList.title}`}
                    style = {{ textDecoration: 'none', color: 'black'}}
                    onClick = {()=>dispatch(pageSelected({active__page: 'CLUB__INFO__ACTIVE'}))}>

                        <Paper className={classes.clubsList} style={{ backgroundImage: `url(${clubsList.image})` }}>
                            {/* Increase the priority of the hero background image */}
                            {<img style={{ display: 'none' }} src={clubsList.image} alt={clubsList.imageText} height = "100px" />}
                            <div className={classes.overlay} />
                                <Grid container>
                                    <Grid item md={6}>
                                        <div className={classes.clubsListContent}>
                                            <Typography variant="h4" color="inherit" gutterBottom>
                                            <strong>{clubsList.title}</strong>
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                        </Paper>

                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div> 
      </main>
      
      
    </Root>
  );
}


