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
import {CloudinaryImage} from '@cloudinary/url-gen'



function MyAccount() {
    
    const { section, branch, semester,roll_num, first_name, last_name, father_name, mobile, date_of_birth, mentor_name, mentor_email, id, avatar_url } = useSelector((state)=>state.user);
    const { email } = useSelector((state)=>state.user);
    const [profilePic, setProfilePic] = useState(avatar_url ? avatar_url : "https://res.cloudinary.com/cbit-skynet/image/upload/c_thumb,g_face,h_200,w_200/v1654366521/photo-1628155930542-3c7a64e2c833_p3hpkm.jpg")
    const dispatch = useDispatch();
    let [isInputDisabled,setIsInputDisabled] = useState(true);
   
    let [isEditEnabled, setIsEditEnabled] = useState(false);
    
    const handleEdit = () => {
        setIsEditEnabled(!isEditEnabled);
        setIsInputDisabled(!isInputDisabled);
    }
    
  
   

    function showUploadWidget() { 
        window.cloudinary.openUploadWidget({ 
            cloudName: "cbit-skynet", 
            uploadPreset: "cbitskynet", 
            sources: [
                "local", 
                "url", 
                "camera", 
                "facebook", 
                "unsplash", 
                "google_drive", 
                "image_search", 
                "dropbox", 
                "instagram", 
                "shutterstock"], 
            googleApiKey: "AIzaSyCJ47LgwNQNrUlfWZKmJChvlpn1OKi-f-U", 
            showAdvancedOptions: true, 
            cropping: true, 
            multiple: false, 
            defaultSource: "local", 
            styles: { 
                palette: { 
                    window: "#10173a", 
                    sourceBg: "#20304b", 
                    windowBorder: "#7171D0", 
                    tabIcon: "#79F7FF", 
                    inactiveTabIcon: "#8E9FBF", 
                    menuIcons: "#CCE8FF", 
                    link: "#72F1FF", 
                    action: "#5333FF", 
                    inProgress: "#00ffcc", 
                    complete: "#33ff00", 
                    error: "#cc3333", 
                    textDark: "#000000", 
                    textLight: "#ffffff" }, 
                    fonts: { 
                        default: null, "'IBM Plex Sans', sans-serif": { url: "https://fonts.googleapis.com/css?family=IBM+Plex+Sans", active: true } } 
            } }, 
            (err, result) => {  if (!err && result && result.event === "success") {

                dispatch(addProfilePic(result.info.url));
                setProfilePic(result.info.url)
                
                axios.post('/.netlify/functions/updateAvatar/updateAvatar', {
                    id: id,
                    avatar_url: result.info.url
                })
                console.log("Done! Here is the image info: ", result.info);
              } }); 
        }
    
    console.log(avatar_url)
    const roman = ['', 'I', 'II',"III", "IV", "V", "VI", "VII", "VIII"]

    return (
        <Container maxWidth = "md" id = "myaccount-myaccount">
            <div className = "myaccount__idsection" >
                <Grid container spacing = {4} direction = "row" justifyContent = "center" alignItems = "center" >
                    <Grid item key = "1" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                    <div className = "myaccount__idsection__details">
                        <div style = {{ position: "relative"}}>

                            <img 
                                src = {profilePic } 
                                alt = "profile pic" 
                                style = {{boxShadow: "2", borderRadius: 15}} 
                                width = "150px" 
                                height = "150px"/>
                            <Fab style = {{position: "absolute", bottom: "1px", right: "2px", size: "10px"}} color = "secondary"  size = "small" onClick = {showUploadWidget}>
                                <EditIcon />     
                            </Fab>
                            
                        </div>
                        <div>
                            <Typography component="h1" variant="h3" align = "center"  className = "myaccount__imagesection__text" gutterBottom>
                                <strong>{first_name}</strong>
                            </Typography>
                            <Typography variant="h5" color="textSecondary" align = "center" paragraph>
                            {/* <strong>{`Father's Name: ${father_name}`}</strong> */}
                            <strong>{`${roll_num}`}</strong><br/>
                            <strong>{`${roman[semester]} SEM, ${branch}${section}`}</strong>

                            </Typography>
                        </div>
                    </div>
                    </Grid>
                    <Grid item key = "2" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                    <QRCode value= {`${roll_num}`} />
                    </Grid>
                    
                    
                </Grid>    
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
                            {/* <Grid item key = "1" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Username" defaultValue = {username} InputProps = {{ readOnly: isInputDisabled }} />
                            </Grid> */}
                            
                            <Grid item key = "1" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "First Name" defaultValue = {first_name} InputProps = {{ readOnly: true }} helperText = "This Field can't be editted"/>
                            </Grid>
                            <Grid item key = "2" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Last Name" defaultValue = {last_name} InputProps = {{ readOnly: true }} helperText = "This Field can't be editted"/>
                            </Grid>
                            {/* <Grid item key = "3" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Password" type = "password" defaultValue = "nothingisthere" InputProps = {{ readOnly: isInputDisabled }}/>
                            </Grid> */}
                            {/* <Grid item key = "5" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Personal Email" defaultValue = {personal_email?personal_email:"Not Provided"} type = "email" InputProps = {{ readOnly: isInputDisabled }}/>
                            </Grid> */}
                            <Grid item key = "4" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Mobile No." defaultValue = {mobile} InputProps = {{ readOnly: isInputDisabled }}/>
                            </Grid>
                            
                            
                            <Grid item key = "5" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Date of Birth" defaultValue = {date_of_birth.slice(0,10)} type = "date" InputProps = {{ readOnly: true }} helperText = "This Field can't be editted"/>
                            </Grid>
                            <Grid item key = "6" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Section" defaultValue = {section} InputProps = {{ readOnly: true }} helperText = "This Field can't be editted" />
                            </Grid>
                            <Grid item key = "7" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Branch" defaultValue = {branch} InputProps = {{ readOnly: true }} helperText = "This Field can't be editted" />
                            </Grid>

                            <Grid item key = "8" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Semester" defaultValue = {semester} InputProps = {{ readOnly: true }} helperText = "This Field can't be editted" />
                            </Grid>
                            <Grid item key = "9" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "College Email" defaultValue = {email} InputProps = {{ readOnly: true }} helperText = "This Field can't be editted" />
                            </Grid>
                            <Grid item key = "10" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Mentor" defaultValue = {mentor_name} InputProps = {{ readOnly: true }} helperText = "This Field can't be editted" />
                            </Grid>
                            <Grid item key = "11" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Mentor Email" defaultValue = {mentor_email} InputProps = {{ readOnly: true }} helperText = "This Field can't be editted" />
                            </Grid>
                            <Grid item key = "12" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Something" defaultValue = "something" InputProps = {{ readOnly: true }} helperText = "This Field can't be editted" />
                            </Grid>
                        </Grid>

                        
            </div> 
        </Container>
    );
}

export default MyAccount
