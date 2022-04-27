import React from 'react'
import {
  Container,
  TextField,
  styled,
  Typography,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Hidden,
} from '@mui/material';
import "./ClubInfo.css"
import AlertDialog from '../utils/AlertDialog';


const PREFIX = 'ClubInfo';

const classes = {
  mainFeaturedPost: `${PREFIX}-mainFeaturedPost`,
  overlay: `${PREFIX}-overlay`,
  mainFeaturedPostContent: `${PREFIX}-mainFeaturedPostContent`,
  card: `${PREFIX}-card`,
  cardGrid: `${PREFIX}-cardGrid`,
  cardDetails: `${PREFIX}-cardDetails`,
  cardMedia: `${PREFIX}-cardMedia`,
  achievementRoot: `${PREFIX}-achievementRoot`,
  paper: `${PREFIX}-paper`,
  image: `${PREFIX}-image`,
  img: `${PREFIX}-img`,
  galleryRoot: `${PREFIX}-galleryRoot`,
  gridList: `${PREFIX}-gridList`,
  titleBar: `${PREFIX}-titleBar`,
  halloffameRoot: `${PREFIX}-halloffameRoot`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.mainFeaturedPost}`]: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random/960x540)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: "15px",
    boxShadow: "3px 9px 21px -6px rgba(0,0,0,0.75)",
    width: "100%"
  },

  [`& .${classes.overlay}`]: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },

  [`& .${classes.mainFeaturedPostContent}`]: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },

  [`& .${classes.card}`]: {
    display: 'flex',
  },

  [`& .${classes.cardGrid}`]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  [`& .${classes.cardDetails}`]: {
    flex: 1,
  },

  [`& .${classes.cardMedia}`]: {
    width: 160,
  },

  [`& .${classes.achievementRoot}`]: {
    flexGrow: 1,
  },

  [`& .${classes.paper}`]: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },

  [`& .${classes.image}`]: {
    width: 240,
    height: 240,
  },

  [`& .${classes.img}`]: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },

  [`& .${classes.galleryRoot}`]: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: '3',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },

  [`& .${classes.gridList}`]: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },

  [`& .${classes.titleBar}`]: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },

  [`& .${classes.halloffameRoot}`]: {
    margin: "2rem"
  }
}));


const mainFeaturedPost = {
  title: 'Name of the Club',
  description:
    "Brief of the Club.Cillum nisi cupidatat amet aute cupidatat pariatur in voluptate mollit irure sit adipisicing.In quis deserunt consequat laborum eu ea in.",
  image: 'https://source.unsplash.com/random/?scenary/1366x768',
  imgText: 'main image description',
};

const latestEvents = [
  {
    id: "1",
    title: 'latest Event 1',
    date: 'Nov 12',
    description:
      'Exercitation reprehenderit Lorem do nisi.',
    image: 'https://source.unsplash.com/random/?school',
    imageText: 'Image Text',
  },
  {
    id: "2",
    title: 'Latest Event 2',
    date: 'Nov 11',
    description:
      'Eiusmod quis laborum veniam consequat anim cillum sunt.',
    image: 'https://source.unsplash.com/random/?school',
    imageText: 'Image Text',
  },
];

const achievements = [
  {
    id: "1",
    title: 'Achievement 1',
    date: 'Nov 12',
    type: "Achievement",
    description:
      'Aliqua culpa eu in Lorem sint labore sunt nulla ut irure anim consequat. Nostrud consequat et amet amet id proident. Nisi magna Lorem labore labore dolore.',
    image: 'https://source.unsplash.com/random/?winner',
    imageText: 'Image Text',
  },
  {
    id: "2",
    title: 'Event 1',
    date: 'Nov 11',
    type: "Event",
    description:
      'Non veniam ut enim sint sit amet ipsum do id ullamco id laborum et pariatur. Mollit irure ex consequat culpa velit quis sit veniam. Fugiat consectetur reprehenderit ad ex qui consequat.',
    image: 'https://source.unsplash.com/random/?winner',
    imageText: 'Image Text',
  },
  {
    id: "3",
    title: 'Achievement 2',
    date: 'Nov 11',
    type: 'Achievement',
    description:
      'commodo consequat sunt id sint. Reprehenderit labore culpa dolore non dolor deserunt consectetur mollit nulla occaecat do dolore. Commodo labore elit do laboris laboris nisi voluptate. Incididunt minim minim ad aute. Incididunt velit Lorem enim aute veniam.',
    image: 'https://source.unsplash.com/random/?winner',
    imageText: 'Image Text',
  },
];

const hallOfFame = [
  {
    id: "1",
    title: 'Name of the Member',
    description:
      'Aliqua culpa eu in Lorem sint labore sunt nulla ut irure anim consequat. Nostrud consequat et amet amet id proident. Nisi magna Lorem labore labore dolore.magna Lorem labore labore dolore.',
    image: 'https://source.unsplash.com/random/?schoolkids',
    imageText: 'Image Text',
  },
  {
    id: "2",
    title: 'Name of the Member',
    description:
      'Non veniam ut enim sint sit amet ipsum do id ullamco id laborum et pariatur. Mollit irure ex consequat culpa velit quis sit veniam. Fugiat consectetur reprehenderit ad ex qui consequat.',
    image: 'https://source.unsplash.com/random/?schoolkids',
    imageText: 'Image Text',
  },
  
  {
    id: "3",
    title: 'Name of the Member',
    description:
      'commodo consequat sunt id sint. Reprehenderit labore culpa dolore non dolor deserunt consectetur mollit nulla occaecat do dolore. Commodo labore elit do laboris laboris nisi voluptate. Incididunt minim minim ad aute. Incididunt velit Lorem enim aute veniam.',
    image: 'https://source.unsplash.com/random/?schoolkids',
    imageText: 'Image Text',
  },
  {
    id: "4",
    title: 'Name of the Member',
    description:
      'commodo consequat sunt id sint. Reprehenderit labore culpa dolore non dolor deserunt consectetur mollit nulla occaecat do dolore. Commodo labore elit do laboris laboris nisi voluptate. Incididunt minim minim ad aute. Incididunt velit Lorem enim aute veniam.',
    image: 'https://source.unsplash.com/random/?schoolkids',
    imageText: 'Image Text',
  },
];


const galleryData =  [
  {
    id: 1,
    img: "https://source.unsplash.com/random/1",
    title: 'Image',
    author: 'author',
    featured: true,
  },
  {
    id: 2,
    img: "https://source.unsplash.com/random/2",
    title: 'Image',
    author: 'author',
    featured: false,
  },
  {
    id: 3,
    img: "https://source.unsplash.com/random/3",
    title: 'Image',
    author: 'author',
    featured: false,
  },{
    id: 4,
    img: "https://source.unsplash.com/random/4",
    title: 'Image',
    author: 'author',
    featured: false,
  },{
    id: 5,
    img: "https://source.unsplash.com/random/5",
    title: 'Image',
    author: 'author',
    featured: false,
  },{
    id: 6,
    img: "https://source.unsplash.com/random/6",
    title: 'Image',
    author: 'author',
    featured: true,
  },{
    id: 7,
    img: "https://source.unsplash.com/random/7",
    title: 'Image',
    author: 'author',
    featured: false,
  },{
    id: 8,
    img: "https://source.unsplash.com/random/8",
    title: 'Image',
    author: 'author',
    featured: false,
  },{
    id: 9,
    img: "https://source.unsplash.com/random/9",
    title: 'Image',
    author: 'author',
    featured: true,
  },
];
function ClubInfo() {

    const question = "Are you sure?"
    const description = "Your details along with your motivation will be sent to the corresponding authorities.Thank you for showing interest in joining this club."
    return (
      <Root style= {{display: "flex",flexDirection: "column", alignItems: "center"}}>
      <div id = "clubinfo-introduction" style = {{ margin: "1rem 0px"}}>
          <Container maxWidth = "lg" className = "clubinfo__header" disableGutters = {true}>
              <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${mainFeaturedPost.image})` }}>
                  {/* Increase the priority of the hero background image */}
                  {<img style={{ display: 'none' }} src={mainFeaturedPost.image} alt={mainFeaturedPost.imageText} />}
                  <div className={classes.overlay} />
                  <Grid container>
                      <Grid item md={6}>
                        <div className={classes.mainFeaturedPostContent}>
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {mainFeaturedPost.title}
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                            {mainFeaturedPost.description}
                            </Typography>
                        </div>
                      </Grid>
                  </Grid>
              </Paper>
          </Container>

          <Container maxWidth = "md" className = "clubinfo__latest__events" disableGutters = {true}>
            <Grid container spacing={4}>
              {
                latestEvents.map((event,i)=>{
                  return (
                    <Grid item key={i} xs={12} md={6}>
                              <CardActionArea component="a" href="#">
                                <Card className={classes.card}>
                                  <div className={classes.cardDetails}>
                                    <CardContent>
                                      <Typography component="h2" variant="h5">
                                        {event.title}
                                      </Typography>
                                      <Typography variant="subtitle1" color="textSecondary">
                                        {event.date}
                                      </Typography>
                                      <Typography variant="subtitle1" paragraph>
                                        {event.description}
                                      </Typography>
                                    </CardContent>
                                  </div>
                                  <Hidden smDown>
                                    <CardMedia className={classes.cardMedia} image={event.image} title={event.imageTitle} />
                                  </Hidden>
                                </Card>
                              </CardActionArea>
                            </Grid>
                  );
                })
              }
            </Grid>      
          </Container>

          <Container maxWidth = "md" className = "clubinfo__item">
              <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                  Introduction
              </Typography>
              <hr className ="style__one" />
              <Typography variant="h5" color="inherit" paragraph align = "center">
                  Proident irure ipsum elit do ex est sit proident ipsum mollit nulla ex velit aliqua. Sint reprehenderit sit nisi ullamco mollit adipisicing occaecat consectetur elit. Do laboris ea fugiat ex ut culpa Lorem eiusmod. Magna commodo duis excepteur anim sint velit. Ut laboris cupidatat anim amet cupidatat laborum quis nisi Lorem exercitation officia ipsum est quis.
              </Typography>
              <Typography variant="h5" color="inherit" paragraph align = "center">
                  odo occaecat est duis in Lorem. Veniam eiusmod veniam fugiat duis nulla est qui mollit aliquip. Consectetur occaecat commodo eu et voluptate. Esse reprehenderit ex consequat consequat veniam cupidatat cupidatat exercitation. Velit voluptate quis dolore magna ex ad aute reprehenderit. Voluptate irure fugiat ipsum tempor.
              </Typography>
              <Typography variant="h5" color="inherit" paragraph align = "center">
                  Proident adipisicing nostrud sit elit culpa ut Lorem Lorem commodo. Mollit mollit fugiat magna do nostrud id pariatur. Magna ullamco dolor sunt elit excepteur pariatur non.
              </Typography>    
          </Container>
        </div>

        <div id = "clubinfo-achievements" style= {{display: "flex",flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
          <Container maxWidth = "md" id = "clubinfo-achievements" className = "clubinfo__item">
              <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                  Achievements
              </Typography>
              <hr className ="style__one" />
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                  Achievements include all the events conducted and the competitions won by the club (or) the members of the club.
              </Typography>
              
          </Container>
        

        
          <Container >
            <Grid container spacing = {4} justifyContent = "center" alignItems = "center" style = {{width: "100%"}}>
              {
                achievements.map((achievement,i)=>{
                  return (<Grid item key = {i} lg = {12} style = {{width: "100%"}} className = "clubinfo__achievements__cards">
                            <div className={classes.achievementRoot} style = {{width: "100%"}}>
                              <Paper className={classes.paper} style = {{width: "100%", margin: "0", maxWidth: "100%"}}>
                                <Grid container spacing={2} style = {{width: "100%", margin: "0px"}}>
                                  <Grid item>
                                    <img className={classes.img} alt={achievement.imageText} src={`${achievement.image}/${i}`} width = "360" height = "240"/>  
                                  </Grid>
                                  <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                      <Grid item xs>
                                        <Typography  component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
                                          {achievement.title}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                          {achievement.description}
                                        </Typography>
                                        
                                      </Grid>
                                      <Grid item>
                                        <Typography variant="body2" >
                                          {achievement.type}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <Typography variant="subtitle1">{achievement.date}</Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Paper>
                            </div>
                          </Grid>)
                })
              }
            </Grid>
          </Container>
        </div>


        <div id = "clubinfo-halloffame" >
          <Container maxWidth = "md" className = "clubinfo__item">
              <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                  Hall of Fame
              </Typography>
              <hr className ="style__one" />
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                  Hall of Fame showcases the members who made great((or) everlasting) contributions to the club.
              </Typography>
          </Container>
          <Container maxWidth="md">
            <Grid container spacing = {4} justifyContent = {"center"} style = {{width: "100%"}}>
              {
                hallOfFame.map((member,i)=>{
                  return (<Grid item key = {i} md = {6} xs = {12} style = {{width: "100%"}} className = "clubinfo__halloffame__cards">
                            <div className={classes.halloffameRoot} >
                              <Paper className={classes.paper} style = {{width: "100%", margin: "0", maxWidth: "100%"}}>
                                <Grid container fixed spacing={2} style = {{width: "100%", margin: "0px"}}>
                                  <Grid item>
                                    <img className={classes.img} alt={member.imageText} src={`${member.image}/${i}`} width = "320" height = "320" style = {{ borderRadius: "999px", boxShadow: "0px 5px -5px -2px rgba(0,0,255,0.75)"}}/>  
                                  </Grid>
                                  <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                      <Grid item xs>
                                        <Typography  component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
                                          {member.title}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                          {member.description}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Paper>
                            </div>
                          </Grid>)
                })
              }
            </Grid>
          </Container>
        </div>     
        

          <Container maxWidth = "md" id = "clubinfo-gallery" className = "clubinfo__item" disableGutters = {true}>
              <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                  Gallery
              </Typography>
              <hr className ="style__one" />
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                  This is a photos gallery. You can find pics of various events etc.
              </Typography>

              <div className={classes.galleryRoot} style = {{ width: "100%"}}>
                <ImageList cellHeight={200}  spacing={1} className={classes.gridList} style = {{ width: "100%", margin: "20px"}}>
                  {galleryData.map((tile) => (
                    <ImageListItem key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
                      <img src={tile.img} alt={tile.title} />
                      <ImageListItemBar
                        title={tile.title}
                        titlePosition="top"
                        className={classes.titleBar}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
          </Container>


          <Container maxWidth = "md" id = "clubinfo-join" className = " clubinfo__join">
                <div style = {{ display: "flex", alignItems: 'center', flexDirection: "column"}}>
                    <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                        Join
                    </Typography>
                    <hr className ="style__one" />
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Fill the form to apply for the club. All the other details will be automatically sent to the concerned personnel.
                    </Typography>
                </div>
                <div style = {{ display: "flex", alignItems: 'center', justifyContent: "start"}}>
                    <Typography variant="h5" color="inherit" paragraph align = "left" display = "inline" style = {{flex: 1}}>
                        Name:
                    </Typography>
                    <TextField variant = "outlined" color = "primary" label = "Name" style = {{ margin: "20px", flex: 3}} />
                </div>      
                <div style = {{ display: "flex", alignItems: 'center', justifyContent: "start"}}>
                    <Typography variant="h5" color="inherit" paragraph align = "left" display = "inline" style = {{flex: 1}}>
                        Motivation:
                    </Typography>
                    <TextField variant="outlined" label="Multiline Placeholder" placeholder="Placeholder" multiline style = {{ margin: "20px", flex: 3, width: "100%  "}} rows = "8" columns = "100"/>
                </div>
                <div style = {{ display: "flex", alignItems: 'center', justifyContent: "center"}}>
                  <AlertDialog buttonName = "Apply" question = {question} description = {description} style = {{ position: "absolute", bottom: "20px", right: "20px"}}/>
                </div> 
                   
          </Container>  
      </Root>
    );
}

export default ClubInfo
