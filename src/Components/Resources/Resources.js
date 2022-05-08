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
  Box
} from '@mui/material';
import { Link as LinkRouter }from 'react-router-dom';

import { pageSelected } from '../../app/site';
import "./Resources.css"



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
     
      <main>
      <div id = "resources-resources">
         {/* Hero unit */}
         <Box sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            boxShadow: 10,
            borderRadius: '15px',
          }}>
          <Container  maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Resources
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              This section has many resources from a wide variety of disciplines like technology, humanities, marketing, mathematics etc. 
              Each topic has related lectures(videos), PDFs and other references. 
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card,i) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 2 }} >
                    <LinkRouter 
                      to = {`/resources/${resources[0]}`} 
                      style = {{ textDecoration: 'none', color: 'black'}} 
                      onClick = {()=>dispatch(pageSelected({active__page: 'RESOURCE__SECTION__ACTIVE'}))}
                    >
                        <CardMedia
                            
                            sx={{
                              // 16:9
                              pt: '56.25%',
                            }}
                            image={`https://source.unsplash.com/random/?collegesubjects/${i}`}
                            title="Image title"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {resources[i]}
                            </Typography>
                            <Typography>
                            Ullamco veniam officia deserunt Lorem fugiat fugiat sit qui dolor qui.
                            </Typography>
                        </CardContent>
                    </LinkRouter>
                    
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div> 

      

      
      </main>
      
      
    
  );
}


