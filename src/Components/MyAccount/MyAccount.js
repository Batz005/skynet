import React from 'react'
import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Container, Typography, Fab, TextField, Grid, IconButton } from '@mui/material'
import withStyles from '@mui/styles/withStyles';
// import {DropzoneDialog} from 'material-ui-dropzone'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close';
import './MyAccount.css'
import axios from 'axios';
import QRCode from "react-qr-code";
import { addProfilePic } from '../../app/user'



function MyAccount() {

    const { username, section, branch, semester,roll_num, first_name, last_name, father_name, email, personal_email, mobile, date_of_birth, mentor, profile_pic,uid } = useSelector((state)=>state.user);
    console.log(profile_pic, "babababb")
    const dispatch = useDispatch();
    let [isInputDisabled,setIsInputDisabled] = useState(true);
   
    let [isEditEnabled, setIsEditEnabled] = useState(false);
    const user_id = uid;
    const handleEdit = () => {
        setIsEditEnabled(!isEditEnabled);
        setIsInputDisabled(!isInputDisabled);
    }
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);
    
    const handleClose = () => {
      setOpen(false);
    };

    const handleSave=(files)=> {
        //Saving files to state for further use and closing Modal.
        setFiles(files);
        setOpen(false);
        console.log(files[0],"files")

        axios.put('/api/addProfilePic', { pic: files[0], user_id: user_id})
        .then(response=>{
            console.log(response.data[0])
            dispatch(addProfilePic(response.data[0]));
        })
        
    }

    const handlePicEditClicked = (e)=>{
        setOpen(true);
    }
    const picLink = "https://source.unsplash.com/random/?face"
    return (
        <Container maxWidth = "md" id = "myaccount-myaccount">
            <div className = "myaccount__idsection" >
                    <div className = "myaccount__idsection__details">
                        <div style = {{ position: "relative"}}>
                            <img src = {picLink} alt = "profile pic" style = {{boxShadow: "0px 3px 7px -2px rgba(255,0,0,0.75)"}} width = "150px" height = "150px"/>
                            <Fab style = {{position: "absolute", bottom: "1px", right: "2px", size: "10px"}} color = "secondary"  onClick = {handlePicEditClicked}>
                                <EditIcon />     
                            </Fab>
                            {/* <DropzoneDialog
                                open={open}
                                onSave={handleSave}
                                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                showPreviews={true}
                                maxFileSize={5000000}
                                filesLimit = {1}
                                onClose={handleClose}
                            /> */}
                        </div>
                        <div>
                            <Typography component="h1" variant="h3" align = "center"  className = "myaccount__imagesection__text" gutterBottom>
                                <strong>{username}</strong>
                            </Typography>
                            <Typography variant="h5" color="textSecondary" align = "center" paragraph>
                            {/* <strong>{`Father's Name: ${father_name}`}</strong> */}
                            <strong>{`${roll_num}`}</strong>
                            <strong>{`${semester} SEM, ${section}`}</strong>

                            </Typography>
                        </div>
                    </div>

                    <QRCode value= {`${roll_num}`} />
                    
            </div>
            <div className = "myaccount__item">
                        <Typography component="h1" variant="h3" align = "center" color="textPrimary" gutterBottom>
                            User Details
                        </Typography>
                        <IconButton
                            onClick = {handleEdit}
                            style = {{ position: "absolute", top: "50px", right: "15%"}}
                            size="large">
                            {isEditEnabled ? <CloseIcon color = "secondary"/> : <EditIcon style = {{ color: "#002984"}}/>} 
                        </IconButton>
                        
                        <hr className ="style__one" />
                        <Grid container spacing = {4} direction = "row" justifyContent = "center" alignItems = "center" >
                            <Grid item key = "1" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Username" defaultValue = {username} InputProps = {{ readOnly: isInputDisabled }} />
                            </Grid>
                            <Grid item key = "2" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Password" type = "password" defaultValue = "nothingisthere" InputProps = {{ readOnly: isInputDisabled }}/>
                            </Grid>
                            <Grid item key = "3" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "First Name" defaultValue = {first_name} InputProps = {{ readOnly: isInputDisabled }}/>
                            </Grid>
                            <Grid item key = "4" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Last Name" defaultValue = {last_name} InputProps = {{ readOnly: isInputDisabled }}/>
                            </Grid>
                            <Grid item key = "5" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Personal Email" defaultValue = {personal_email?personal_email:"Not Provided"} type = "email" InputProps = {{ readOnly: isInputDisabled }}/>
                            </Grid>
                            <Grid item key = "6" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Mobile No." defaultValue = {mobile} InputProps = {{ readOnly: isInputDisabled }}/>
                            </Grid>
                            
                            
                            <Grid item key = "7" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Date of Birth" defaultValue = {date_of_birth.slice(0,10)} type = "date" InputProps = {{ readOnly: true }} style = {{width: "58%"}} helperText = "This Field can't be editted"/>
                            </Grid>
                            <Grid item key = "8" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Section" defaultValue = {section} InputProps = {{ readOnly: true }} helperText = "This Field can't be editted" />
                            </Grid>
                            <Grid item key = "9" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Branch" defaultValue = {branch} InputProps = {{ readOnly: true }} helperText = "This Field can't be editted" />
                            </Grid>

                            <Grid item key = "10" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Semester" defaultValue = {semester} InputProps = {{ readOnly: true }} helperText = "This Field can't be editted" />
                            </Grid>
                            <Grid item key = "11" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "College Email" defaultValue = {email} InputProps = {{ readOnly: true }} helperText = "This Field can't be editted" />
                            </Grid>
                            <Grid item key = "12" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Mentor" defaultValue = {mentor} InputProps = {{ readOnly: true }} helperText = "This Field can't be editted" />
                            </Grid>

                            <Grid item key = "13" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Something" defaultValue = "something" InputProps = {{ readOnly: true }} helperText = "This Field can't be editted" />
                            </Grid>
                        </Grid>

                        
            </div> 
        </Container>
    );
}

export default MyAccount
