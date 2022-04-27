import React from 'react';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import resourcesList from "./resourcesList.json";
import { useDispatch } from 'react-redux';
import {
  Link as MaterialLink,
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
} from '@mui/material';
import { Link as LinkRouter }from 'react-router-dom';

import { pageSelected } from '../../app/site';

const PREFIX = 'Resources';

const classes = {
  heroContent: `${PREFIX}-heroContent`,
  heroButtons: `${PREFIX}-heroButtons`,
  cardGrid: `${PREFIX}-cardGrid`,
  card: `${PREFIX}-card`,
  cardMedia: `${PREFIX}-cardMedia`,
  cardContent: `${PREFIX}-cardContent`
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

  [`& .${classes.heroButtons}`]: {
    marginTop: theme.spacing(4),
  },

  [`& .${classes.cardGrid}`]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  [`& .${classes.card}`]: {
    height: '100%',
    display: 'flex',
    cursor: 'pointer',
    position: 'relative',
    flexDirection: 'column',
    paddingBottom: '20px',
  },

  [`& .${classes.cardMedia}`]: {
    paddingTop: '56.25%', // 16:9
  },

  [`& .${classes.cardContent}`]: {
    flexGrow: 1,
    paddingBottom: '20px',
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

const resources = resourcesList['resources'];
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


export default function Resources() {

  const dispatch = useDispatch();

  return (
    <Root>
      <CssBaseline />
      <main>
      <div id = "resources-resources">
         {/* Hero unit */}
         <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Resources
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              This section has many resources from a wide variety of disciplines like technology, humanities, marketing, mathematics etc. 
              Each topic has related lectures(videos), PDFs and other references. 
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card,i) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card} >
                    <LinkRouter 
                      to = {`/resources/${resources[0]}`} 
                      style = {{ textDecoration: 'none', color: 'black'}} 
                      onClick = {()=>dispatch(pageSelected({active__page: 'RESOURCE__SECTION__ACTIVE'}))}
                    >
                        <CardMedia
                            className={classes.cardMedia}
                            image={`https://source.unsplash.com/random/?collegesubjects/${i}`}
                            title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {resources[i]}
                            </Typography>
                            <Typography>
                            Ullamco veniam officia deserunt Lorem fugiat fugiat sit qui dolor qui.
                            </Typography>
                        </CardContent>
                    </LinkRouter>
                    <CardActions style = {{ position: "absolute",bottom: "5px"}}>
                        <IconButton size="small" color="primary">
                            <StarBorderRoundedIcon />
                        </IconButton>
                    </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div> 

      <div id = "resources-favourites" >

      </div>
      </main>
      
      
    </Root>
  );
}


