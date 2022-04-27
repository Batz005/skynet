import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';

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
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import './Activities.css';


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
            <AlertDialog buttonName = "apply" />
          </DialogActions>
        </Dialog>
      </div>
    );
  }

//FUNCTION FOR APPLY DIALOG
function AlertDialog({ buttonName }) {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
        <div>
          <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                <strong>{buttonName}</strong>
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Apply for this Project?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to apply for this project/activity? As soon as you press "agree", your details will be sent to the project coordinator.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary" autoFocus>
                <strong>disagree</strong>
              </Button>
              <Button onClick={handleClose} color="primary" variant = "contained" style = {{ backgroundColor: "darkgreen"}} >
                <strong>Agree</strong>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}
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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Activities() {
    const classes = useStyles();

    return (
    <>  
        
          <div id ="activities-activities">
              <CssBaseline />
              <main>
                  {/* Hero unit */}
                  <div className={classes.heroContent}>
                  <Container maxWidth="sm">
                      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                      Activities
                      </Typography>
                      <Typography variant="h5" align="center" color="textSecondary" paragraph>
                      This section has the projects/activities that the students/teachers need. Details regarding the projects like any stipend, pre-requisites, duration etc are provided. Apply for the projects/activities of your choice by filling the form. 
                      If you are selected, you will be notified regarding the same. 
                      </Typography>
                  </Container>
                  </div>
                  <Container className={classes.cardGrid} maxWidth="md">
                  {/* End hero unit */}
                  <Grid container spacing={4}>
                      {cards.map((card,i) => (
                      <Grid item key={card} xs={12} sm={6} md={4}>
                          
                              <Card className={classes.card}>
                              <CardMedia
                                  className={classes.cardMedia}
                                  image={`https://source.unsplash.com/random/?schoolactivities/${i}`}
                                  title="Image title"
                              />
                              <CardContent className={classes.cardContent}>
                                  <Typography gutterBottom variant="h5" component="h2">
                                  <strong>Some Activity</strong> 
                                  </Typography>
                                  <Typography>
                                      Ullamco veniam officia deserunt Lorem fugiat fugiat sit qui dolor qui.
                                  </Typography>
                                  <Typography>
                                      <strong>Prerequisites:</strong> Quis, incididunt non, exercitation quis, nisi.
                                  </Typography>
                                  <Typography>
                                      <strong>Duration:</strong> 1 month
                                  </Typography>
                                  <Typography>
                                      <strong>Stipend:</strong> nill
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <AlertDialog buttonName = "Apply" />
                                  <CustomizedDialog buttonName = "learn more"/>
                              </CardActions>
                              </Card>   
                      </Grid>
                      ))}
                  </Grid>
                  </Container>
              </main>
          </div>
        


        
          <Container id = "activities-accomplishments" className = "activities__accomplishments" maxWidth = "md">
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
          </Container>
        
    </>
    );
    }

export { AlertDialog };
