import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import AlertDialog from '../utils/AlertDialog'
import {
    Link as MaterialLink,
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
    Box,
    TextField,
    Modal
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add'
import './Activities.css';
import axios from 'axios'
import { useSelector } from 'react-redux';




const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
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

const DialogContent = withStyles((theme) => ({
        root: {
        padding: theme.spacing(2),
        },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
        root: {
        margin: 0,
        padding: theme.spacing(1),
        },
}))(MuiDialogActions);


//FUNCTION FOR LEARN MORE DIALOG
function CustomizedDialog({buttonName}) {
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
              Activity title
          </DialogTitle>
          <DialogContent dividers>
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
          <DialogActions>
          <AlertDialog buttonName = "Apply" description = {`Are you sure you want to apply for this project/activity? As soon as you press "agree", your details will be sent to the project coordinator.`} question = "Apply for this Project?"/>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

//FUNCTION FOR APPLY DIALOG

const useStyles = makeStyles((theme) => ({
heroContent: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '15px',
    boxShadow: '3px 9px 21px -6px rgba(0,0,0,0.75)',
    padding: theme.spacing(8, 0, 6),
},
heroButtons: {
    marginTop: theme.spacing(4),
},
cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
},
card: {
    height: '100%',
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'column',
},
cardMedia: {
    paddingTop: '56.25%', // 16:9
},
cardContent: {
    flexGrow: 1,
},
accomplishmentsRoot: {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  flex: '3',
  justifyContent: 'center',
  backgroundColor: 'white',
  
  
}
}));
//REMEMBER TO USE APIREF TO UPDATE THE ROWS LATER !IMPORTANT 
const rows = [
    {
        id: 1,
        activityName: "android app",
        incharge: "Mrs.Srujana",
        duration: "2 months",
        stipend: "amazon voucher",
        completionDate: "03/05/2020"
    },
    {
        id: 2,
        activityName: "android app",
        incharge: "Mrs.Srujana",
        duration: "2 months",
        stipend: "amazon voucher",
        completionDate: "03/05/2020"
    },
    {
        id: 3,
        activityName: "android app",
        incharge: "Mrs.Srujana",
        duration: "2 months",
        stipend: "amazon voucher",
        completionDate: "03/05/2020"
    },
    {
        id: 4,
        activityName: "android app",
        incharge: "Mrs.Srujana",
        duration: "2 months",
        stipend: "amazon voucher",
        completionDate: "03/05/2020"
    },
    {
      id: 5,
      activityName: "android app",
      incharge: "Mrs.Srujana",
      duration: "2 months",
      stipend: "amazon voucher",
      completionDate: "03/05/2020"
    },
    {
      id: 6,
      activityName: "android app",
      incharge: "Mrs.Srujana",
      duration: "2 months",
      stipend: "amazon voucher",
      completionDate: "03/05/2020"
    },
    {
      id: 7,
      activityName: "android app",
      incharge: "Mrs.Srujana",
      duration: "2 months",
      stipend: "amazon voucher",
      completionDate: "03/05/2020"
    },
    {
      id: 8,
      activityName: "android app",
      incharge: "Mrs.Srujana",
      duration: "2 months",
      stipend: "amazon voucher",
      completionDate: "03/05/2020"
    },
    {
      id: 9,
      activityName: "android app",
      incharge: "Mrs.Srujana",
      duration: "2 months",
      stipend: "amazon voucher",
      completionDate: "03/05/2020"
    },
    {
      id: 10,
      activityName: "android app",
      incharge: "Mrs.Srujana",
      duration: "2 months",
      stipend: "amazon voucher",
      completionDate: "03/05/2020"
    },
    
]

// const cards = [
//   {
//     "title": "Implement Smart Attendance System using Facial Recognition",
//     "description": "Construct both hardware and software for implementing smart attendance system using facial recognition in every class.",
//     "prerequisites": "Any branch 3rd year (+) students",
//     "duration": "3 months",
//     "stipend": ""
//   },
//   {
//     "title": "Implement College Crypto Currency",
//     "description": "Create a crypto currency for the college. This currency will be used for all the transactions occuring within the college.",
//     "prerequisites": "CSE students",
//     "duration": "3 months",
//     "stipend": "amazon voucher worth Rs.50,000"
//   },
//   {
//     "title": "Implement Smart Pass System at the gate.",
//     "description":"Create a smart pass system where the gates can be automatically opened at the arrival of authorized vehicles.",
//     "prerequisites": "All branch students",
//     "duration": "4 months",
//     "stipend": "Rs.1,00,000"
//   },
 
// ];

export default function Activities() {

    const { id } = useSelector(state=>state.user)
    const classes = useStyles();
    let [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [prerequisites, setPrerequisites] = useState("");
    const [stipend, setStipend] = useState("")
    let [imgUrl, setImgUrl] = useState("")
    const [cards, setCards] = useState([])

    const handleOpenModal = () => {   
      
      setTitle("")
      setDuration("")
      setPrerequisites("")
      setStipend("")
      setDescription("")
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
    const response = axios.post("/.netlify/functions/getActivities/getActivities", {
      
      
        id:id
      
    })
    const data = await response
     
    
    
   console.log(data)
   setCards(data.data.Activities)
    console.log(cards)
  
    
  }, [])

    const handleActivitySubmit = async (e) => {
      e.preventDefault()
      const new_response = axios.post("/.netlify/functions/insertActivity/insertActivity", { 
        added_by: id,
        title: title,
        description: description,
        img_url: imgUrl,
        duration: duration,
        prerequisites: prerequisites,
        stipend: stipend
      })
      const new_data = await new_response
      const new_card = new_data.data.insert_Activities_one
      
      console.log(new_data)
      setCards([...cards, new_card])
      
      handleClose()
    }

    return (
    <>  
        
          <div id ="activities-activities">
              <CssBaseline />
              <main>
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
                      Activities
                      </Typography>
                      <Typography variant="h5" align="center" color="textSecondary" paragraph>
                      This section has the projects/activities that the students/teachers need. Details regarding the projects like any stipend, pre-requisites, duration etc are provided. Apply for the projects/activities of your choice by filling the form. 
                      If you are selected, you will be notified regarding the same. 
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
                                      onChange = {(e)=> setDuration(e.target.value)}
                                      label = "Duration" 
                                      sx = {{ my: 1}}
                                          />
                                  
                                  
                                    <TextField 
                                      type = 'text' 
                                      fullWidth
                                      defaultValue = ""
                                      onChange = {(e)=> setPrerequisites(e.target.value)}
                                      label = "Prerequisites" 
                                      sx = {{ my: 1}}
                                          />
                                 
                                    <TextField 
                                      type = 'text' 
                                      fullWidth
                                      defaultValue = ""
                                      onChange = {(e)=> setStipend(e.target.value)}
                                      label = "Stipend" 
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
                                    
                                  </Box>
                                    
                                  
                                  
                                  <Button variant = "contained" type = "submit"  onClick = {handleActivitySubmit} color = "primary" >Submit</Button>
                              </form>
                              
                          </Box>
                          
                    </Modal>

                  <Container sx={{ py: 8 }} maxWidth="md">
                  {/* End hero unit */}
                  <Grid container spacing={4}>
                      {cards.map((card,i) => (
                      <Grid item key={i} xs={12} sm={6} md={4}>
                          
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
                                      <strong>Prerequisites:</strong> {card.prerequisites}
                                  </Typography>
                                  <Typography>
                                      <strong>Duration:</strong> {card.duration}
                                  </Typography>
                                  <Typography>
                                      <strong>Stipend:</strong> { card.stipend.length == 0 ? "nill" : card.stipend}
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <AlertDialog buttonName = "Apply" description = {`Are you sure you want to apply for this project/activity? As soon as you press "agree", your details will be sent to the project coordinator.`} question = "Apply for this Project?"/>
                                  <CustomizedDialog buttonName = "learn more"/>
                              </CardActions>
                              </Card>   
                      </Grid>
                      ))}
                  </Grid>
                  </Container>
              </main>
          </div>
        


        
          {/* <Container id = "activities-accomplishments" className = "activities__accomplishments" maxWidth = "md">
              <div className = "activities__accomplishments__header">
                  <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                      Accomplishments
                  </Typography>
                  <hr className ="style__one" />
              </div>
              <div className = {classes.accomplishmentsRoot} >
                  
                  <DataGrid
                          
                          autoHeight
                          pageSize={10}
                          rowsPerPageOptions={[5, 10, 20]}
                          pagination 
                          columns = {[
                              { field: 'id',headerName: 'Id', type: 'number', width: 50},
                              {
                                  field: 'activityName', 
                                  headerName: 'Activity/Project', 
                                  width: 175,
                                  type: 'string'
                              },
                              {
                                  field: 'incharge',
                                  headerName: 'Project Incharge',
                                  width: 175,
                                  type: 'string'
                              },
                              {
                                  field: 'duration',
                                  headerName: 'Duration',
                                  width: 100
                                  
                              },
                              {
                                  field: 'stipend',
                                  headerName: 'Stipend',
                                  type: 'string',
                                  width: 150
                              },
                              {
                                  field: 'completionDate',
                                  headerName: 'Date of Completion',
                                  type: 'date',
                                  width: 175
                              }
                          ]}
                          rows = {rows}
                      />
                   
                      
              </div>
          </Container> */}
        
    </>
    );
    }

export { AlertDialog };
