import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import {CardHeader, makeStyles} from '@mui/material';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Appointments,
    Toolbar,
    ViewSwitcher,
    MonthView,
    DayView,
    AllDayPanel,
    AppointmentTooltip,
    AppointmentForm,
    DateNavigator,
    TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';
import {
  Link as MaterialLink,
  styled,
  Button,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  DialogContentText,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import BuyPassesDialog from './BuyPassesDialog';


import './Events.css';

import appointments from './appointments.js';

const PREFIX = 'Events';

const classes = {
  root: `${PREFIX}-root`,
  root2: `${PREFIX}-root2`,
  root3: `${PREFIX}-root3`,
  closeButton: `${PREFIX}-closeButton`,
  cardHeader: `${PREFIX}-cardHeader`,
  cardPricing: `${PREFIX}-cardPricing`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.cardHeader}`]: {
    backgroundColor: "whitesmoke"
  },

  [`& .${classes.cardPricing}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
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

const DialogTitle = ((props) => {
        const { children,  onClose, ...other } = props;
        return (
          <MuiDialogTitle disableTypography className={classes.root} {...other}>
              <Typography variant="h6">{children}</Typography>
              {onClose ? (
              <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={onClose}
                size="large">
                  <CloseIcon />
              </IconButton>
              ) : null}
          </MuiDialogTitle>
        );
});

const DialogContent = MuiDialogContent;

const DialogActions = MuiDialogActions;


//FUNCTION FOR LEARN MORE DIALOG
function LearnMoreDialog({buttonName}) {
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button size = "small" color="primary" onClick={handleClickOpen}>
            <strong>{buttonName}</strong>
        </Button>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Event title
          </DialogTitle>
          <DialogContent
            dividers
            classes={{
              root: classes.root
            }}>
            <Typography gutterBottom>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
              in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </Typography>
            <Typography gutterBottom>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor.
            </Typography>
            <Typography gutterBottom>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </Typography>
          </DialogContent>
          <DialogActions
            onClose = {handleClose}
            classes={{
              root: classes.root2
            }}>
            <BuyPassesDialog buttonName = "Buy Passes" onClick = {()=>{
              setOpen(false);
            }}/>
          </DialogActions>
        </Dialog>
      </div>
    );
  }



const tiers = [
  {
    title: 'Single Passes',
    price: '1000',
    description: ['Passes for 1 person'],
    buttonText: 'Buy Passes',
    buttonVariant: 'outlined',
  },
  {
    title: 'Group Passes',
    subheader: "Most Popular",
    price: '2500',
    description: [
      "Passes for 4 people"
    ],
    buttonText: 'Buy Passes',
    buttonVariant: 'contained',
  },
  {
    title: 'Couple Passes',
    price: '1500',
    description: [
      "Passes for 2 people"
    ],
    buttonText: 'Buy Passes',
    buttonVariant: 'outlined',
  },
];


// const passesStyles = styled('div')(({theme}) => ({
//   [`& .${classes.cardHeader}`]: {
//     backgroundColor: "whitesmoke"
//   },

//   [`& .${classes.cardPricing}`]: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'baseline',
//     marginBottom: theme.spacing(2),
//   }
// }))
//FUNCTION FOR BUY PASSES DIALOG
// function BuyPassesDialog({buttonName}) {
//   const [open, setOpen] = React.useState(false);
//   const classes = passesStyles();

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button size = "small" color="secondary" variant = "contained" onClick={handleClickOpen}>
//           <strong>{buttonName}</strong>
//       </Button>
//       <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
//         <DialogTitle id="customized-dialog-title" onClose={handleClose}>
//           <Typography variant="h2" align="center" color="textPrimary" gutterBottom style ={{margin: "0"}}>
//             <strong>Pricing</strong>
//           </Typography>
//         </DialogTitle>
//         <DialogContent
//           dividers
//           fullWidth = {true}
//           classes={{
//             root: classes.root
//           }}>
//         <Container maxWidth="md" component="main">
//             <Grid container spacing={3} alignItems="flex-end">
//               {tiers.map((tier) => (
//                 // Enterprise card is full width at sm breakpoint
//                 <Grid item key={tier.title} xs={12} sm={tier.title === 'Group Passes' ? 12 : 6} md={4}>
//                   <Card>
//                     <CardHeader
//                       title={tier.title}
//                       subheader={tier.subheader}
//                       titleTypographyProps={{ align: 'center' }}
//                       subheaderTypographyProps={{ align: 'center' }}
//                       className={classes.cardHeader}
//                     />
//                     <CardContent>
//                       <div className={classes.cardPricing}>
//                         <Typography component="h2" variant="h3" color="textPrimary">
//                           &#8377;{tier.price}
//                         </Typography>
//                       </div>
//                       <ul>
//                         {tier.description.map((line) => (
//                           <Typography variant="subtitle1" align="left" key={line}>
//                             {line}
//                           </Typography>
//                         ))}
//                       </ul>
//                     </CardContent>
//                     <CardActions>
//                       <Button fullWidth variant={tier.buttonVariant} color="primary">
//                         {tier.buttonText}
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Container>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }



//FUNCTION FOR CALENDER
const Calender = (props) => {
    const [ data, setData ] = useState(appointments);
    const [ currentDate, setCurrentDate ] = useState('2018-06-23');
    

    return (
        <Paper>
          <Scheduler
            data={data}
            height={660}
          >
            <ViewState
              defaultCurrentDate={currentDate}
              
              defaultCurrentViewName="Month"
            />
  
            <DayView
              startDayHour={8}
              endDayHour={22}
            />
            <WeekView
              startDayHour={9}
              endDayHour={19}
            />
            <MonthView
                startDayHour = {9}
                endDayHour = {19}
            />
  
            <Toolbar />
            <ViewSwitcher />
            <Appointments />
            <AppointmentTooltip
            showCloseButton
            showOpenButton
          />
          <AppointmentForm
            
          />
            <AllDayPanel />
            <DateNavigator />
            <TodayButton />
          </Scheduler>
        </Paper>
      );
}


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Activities() {



    return (
      (<Root>
        <div>
            <CssBaseline />
            <main>
                <div id = "events-calender" >
                    {/* Hero unit */}
                    <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Events
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            This section has the list of events occuring in the college.It has details regarding each event and if an event needs passes, you can buy the passes here. 
                        </Typography>
                    </Container>
                    </div>
                    {/* End hero unit */}

                    <div>
                        <Container className = "events__calender" maxwidth = "lg">
                            <Calender />
                        </Container>
                    </div> 
                </div>
                    
                
                
                
               
                    <Container id = "events-events" className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card,i) => (
                        <Grid item key={card} xs={12} sm={12} md={6} >
                            
                                <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={`https://source.unsplash.com/random/?school/${i}`}
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    <strong>Some Event</strong> 
                                    </Typography>
                                    <Typography>
                                        Ullamco veniam officia deserunt Lorem fugiat fugiat sit qui dolor qui.
                                    </Typography>
                                    <Typography>
                                        <strong>Date:</strong> 11/02/31
                                    </Typography>
                                    <Typography>
                                        <strong>Timings:</strong> 6:00 AM to 1:00 PM
                                    </Typography>
                                    <Typography className= "events__ticketsInfo">
                                        <strong>Passes:</strong> Rs. 10k per person
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <BuyPassesDialog button_name = "Buy Passes" passes_tiers = {tiers}/>
                                    <LearnMoreDialog buttonName = "learn more"/>
                                    <StarBorderRoundedIcon style = {{position: "absolute", bottom: "5px", right: "5px"}}/>
                                </CardActions>
                                </Card>
                        </Grid>
                        ))}
                    </Grid>
                    </Container>
                
            </main>
        </div>
      </Root>)
    );
    }