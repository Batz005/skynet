import { useState, useEffect } from 'react';
import * as React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import {CardHeader, makeStyles} from '@mui/material';
import PropTypes from 'prop-types';
import { EditingState, ViewState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
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
    TodayButton,
    ConfirmationDialog
    
} from '@devexpress/dx-react-scheduler-material-ui';
import {
  Link as MaterialLink,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  Modal,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch
} from '@mui/material';
import { styled } from '@mui/material/styles';
import BuyPassesDialog from './BuyPassesDialog';
import axios from 'axios'

import './Events.css';

import appointments from './appointments.js';
import { useSelector } from 'react-redux';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function LearnMoreDialog({buttonName, title, passRequired = false}) {
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
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
            { passRequired &&
                <BuyPassesDialog button_name = "Buy Passes" passes_tiers = {tiers}/>
              }
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}


// //FUNCTION FOR LEARN MORE DIALOG
// function LearnMoreDialog({buttonName, title, passRequired = false}) {
//     const [open, setOpen] = React.useState(false);
    
//     const handleClickOpen = () => {
//       setOpen(true);
//     };
//     const handleClose = () => {
//       setOpen(false);
//     };
  
//     return (
//       <div>
//         <Button size = "small" color="primary" onClick={handleClickOpen}>
//             <strong>{buttonName}</strong>
//         </Button>
//         <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
//           <DialogTitle id="customized-dialog-title" onClose={handleClose}>
//               {title}
//           </DialogTitle>
//           <DialogContent
//             dividers
//             classes={{
//               root: classes.root
//             }}>
//             <Typography gutterBottom>
//               Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
//               in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
//             </Typography>
//             <Typography gutterBottom>
//               Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
//               lacus vel augue laoreet rutrum faucibus dolor auctor.
//             </Typography>
//             <Typography gutterBottom>
//               Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
//               scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
//               auctor fringilla.
//             </Typography>
//           </DialogContent>
//           <DialogActions
//             onClose = {handleClose}
//             classes={{
//               root: classes.root2
//             }}>
//               { passRequired &&
//                 <BuyPassesDialog button_name = "Buy Passes" passes_tiers = {tiers}/>
//               }
//           </DialogActions>
//         </Dialog>
//       </div>
//     );
//   }



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
    const [ currentDate, setCurrentDate ] = useState(new Date());
    
    const commitChanges = ({ added, changed, deleted }) => {
        let newData = data;
        if (added) {
          const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
          newData = [...data, { id: startingAddedId, ...added }];
        }
        if (changed) {
          newData = data.map(appointment => (
            changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
        }
        if (deleted !== undefined) {
          newData = data.filter(appointment => appointment.id !== deleted);
        }
        setData(newData)
        console.log(newData)
        
    }

    return (
        <Container>
          <Scheduler
            data={data}
            height={660}
          >
            <ViewState
              defaultCurrentDate={currentDate}
              
              defaultCurrentViewName="Month"
            />
            
            <EditingState
            onCommitChanges={commitChanges}
          />
            <IntegratedEditing />
  
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
            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip
            showCloseButton
            showOpenButton
          />
          <AppointmentForm
            hideDeleteButton = {false}
            onDeleteButtonClicked = {commitChanges}
          />
            <AllDayPanel />
            <DateNavigator />
            <TodayButton />
          </Scheduler>
        </Container>
      );
}


// const cards = [
//   {
//     "title": "ML Hackathon",
//     "description": "We welcome everyone to come and participate in our hackathon. Teams need to create solutions for real-time problems using ML",
//     "date": "22/06/22",
//     "timings": "9:00AM to 5:00pm",
//     "passRequired": false,
//     "passes": ""
//   },
//   {
//     "title": "SHRUTHI",
//     "description": "We welcome everyone to come and participate in SHRUTHI Fest. Interested students can participate in curricular and non-curricular activities.",
//     "date": "25/03/23 - 26/03/23",
//     "timings": "9:00AM to 5:00pm",
//     "passRequired": false,
//     "passes": ""
//   },
//   {
//     "title": "SUDHEE",
//     "description": "We welcome everyone to come and participate in SUDHEE. It is a technical fest. Interested students can participate.",
//     "date": "23/03/23 - 24/03/23",
//     "timings": "9:00AM to 5:00pm",
//     "passRequired": false,
//     "passes": ""
//   },
//   {
//     "title": "Carpedium",
//     "description": "We welcome everyone to come and participate in Carpedium. Interested students can participate in carpedium. Students need to buy passes to participate in this event.",
//     "date": "23/04/23 - 24/04/23",
//     "timings": "9:00AM to 6:00pm",
//     "passRequired": true,
//     "passes": "Rs. 10k per person"
//   },
// ];


export default function Events() {
  let [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dates, setDates] = useState("");
  const [timings, setTimings] = useState("");
  let [imgUrl, setImgUrl] = useState("")
  const [passes, setPasses] = useState("");
  const [isPassRequired, setIsPassRequired] = useState(false);
  const [cards, setCards] = useState([])
  const { id } = useSelector(state => state.user)
    const handleOpenModal = () => {   
      setIsPassRequired(false)
      setTitle("")
      setDates("")
      setTimings("")
      setDescription("")
      setPasses("")
      setImgUrl("")
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

  useEffect(async () => {
    const response = axios.post("/.netlify/functions/getEvents/getEvents", {
      
      
        id:id
      
    })
    const data = await response
     
    
    
   console.log(data)
   setCards(data.data.Events)
    console.log(cards)
  
    
  }, [])

    const handleEventSubmit = async (e) => {
      e.preventDefault()
      const new_response = axios.post("/.netlify/functions/insertEvent/insertEvent", { 
        added_by: id,
        title: title,
        description: description,
        img_url: imgUrl,
        dates: dates,
        timings: timings,
        passes: passes,
        isPassRequired: isPassRequired
      })
      const new_data = await new_response
      const new_card = new_data.data.insert_Events_one
      
      console.log(new_data)
      setCards([...cards, new_card])
      
      handleClose()
    } 

    return (
      (
        <div>
            <CssBaseline />
            <main>
                <div id = "events-calender" >
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
                        Events
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            This section has the list of events occuring in the college.It has details regarding each event and if an event needs passes, you can buy the passes here. 
                        </Typography>
                    </Container>
                    <IconButton
                              onClick = {handleOpenModal}
                              style = {{ position: "absolute", top: "5%", right: "5%"}}
                              size="large">
                              <AddIcon style = {{ color: "blue"}}/>
                          </IconButton>
                    </Box>
                    {/* End hero unit */}
                    <Modal
                          open = {open}
                          onClose={handleClose}

                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          >
                          <Box sx = {modalStyle} >
                              <form  style = {{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", margin: "1em", padding: "0"}}>
                                  <Box sx = {{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    width: "100%"
                                  }}>
                                    <TextField 
                                      type = 'text' 
                                      sx = {{ my: 1}}
                                      defaultValue = ""
                                      onChange = {(e)=> setTitle(e.target.value)}
                                      label = "Title" 
                              
                                      
                                      fullWidth
                                      style = {{ fontColor: "black"}}
                                          />
                                  
                                  
                                    <TextField 
                                      type = 'text' 
                                      fullWidth
                                      defaultValue = ""
                                      onChange = {(e)=> setDates(e.target.value)}
                                      label = "Dates" 
                                      sx = {{ my: 1}}
                                          />
                                  
                                  
                                    <TextField 
                                      type = 'text' 
                                      fullWidth
                                      defaultValue = ""
                                      onChange = {(e)=> setTimings(e.target.value)}
                                      label = "Timings" 
                                      sx = {{ my: 1}}
                                          />
                                 <TextField 
                                      type = 'text' 
                                      fullWidth
                                      defaultValue = ""
                                      onChange = {(e)=> setImgUrl(e.target.value)}
                                      label = "ImageUrl (optional)" 
                                      
                                          />

                                    <TextField 
                                      fullWidth
                                      name = "description"
                                      onChange = {(e)=> setDescription(e.target.value)} 
                                      label = "Description" 
                                      multiline
                                      minRows = {4}
                                      maxRows = {8}
                                      columns = "100"
                                      sx = {{ my: 1}}
                                      />
                                    <FormGroup sx = {{ my: 2}}>
                                      <FormControlLabel control={<Switch onChange = {()=>setIsPassRequired(!isPassRequired)}/>} label="isPassRequired" />
                                      
                                    </FormGroup>
                                    { isPassRequired && <TextField 
                                      type = 'text' 
                                      fullWidth
                                      defaultValue = ""
                                      onChange = {(e)=> setPasses(e.target.value)}
                                      label = "Passes" 
                                      sx = {{ my: 1}}
                                          />}
                                  </Box>
                                    
                                  
                                  
                                  <Button variant = "contained" type = "submit"  onClick = {handleEventSubmit} color = "primary" >Submit</Button>
                              </form>
                              
                          </Box>
                          
                    </Modal>
                    <div>
                        <Container className = "events__calender" maxwidth = "lg">
                            <Calender />
                        </Container>
                    </div> 
                </div>
                    
                
                
                
               
                    <Container id = "events-events" sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card,i) => (
                        <Grid item key={i} xs={12} sm={12} md={6} >
                            
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 5 }}>
                                <CardMedia
                                   sx={{
                                    // 16:9
                                    pt: '56.25%',
                                  }}
                                    image={card.img_url || `https://source.unsplash.com/random/?${card.title}`}
                                    title="Image title"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    <strong>{card.title}</strong> 
                                    </Typography>
                                    <Typography>
                                    {card.description}
                                    </Typography>
                                    <Typography>
                                        <strong>Dates:</strong> {card.dates}
                                    </Typography>
                                    <Typography>
                                        <strong>Timings:</strong> {card.timings}
                                    </Typography>
                                    {
                                      card.passRequired &&
                                    <Typography className= "events__ticketsInfo">
                                        <strong>Passes:</strong> {card.passes}
                                    </Typography>
                                    }
                                    
                                </CardContent>
                                  
                                    <CardActions>
                                    { card.pass_required &&
                                      <BuyPassesDialog button_name = "Buy Passes" passes_tiers = {tiers}/>
                                    }
                                      <LearnMoreDialog buttonName = "learn more" title = {card.title} passRequired = {card.pass_required}/>
                                      {/* <StarBorderRoundedIcon style = {{position: "absolute", bottom: "5px", right: "5px"}}/> */}
                                    </CardActions>
                                  
                                </Card>
                        </Grid>
                        ))}
                    </Grid>
                    </Container>
                
            </main>
        </div>
      )
    );
    }