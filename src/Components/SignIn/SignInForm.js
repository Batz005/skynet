import { Button, TextField, Snackbar, Alert as MuiAlert } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import { signInStatus,pageSelected, subPageSelected } from '../../app/site'
import { addUserData } from '../../app/user'


import "./SignInForm.css"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function SignInForm() {

    const dispatch = useDispatch();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');


    const [open, setOpen] = React.useState(false);
  
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };


    const onEmailChange = (e)=>{
        setEmail(e.target.value);
        console.log(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
        console.log(e.target.value);
    }

    const handleSignIn = (e) =>{
        e.preventDefault();
        axios.post('/api/signin',{
            email: email,
            password: password
        })
        .then((response)=>{
            if( response.data[0].uid){
                dispatch(signInStatus({isSignedIn: true}));
                dispatch(addUserData(response.data[0]));
                dispatch(pageSelected({active__page: 'HOME__ACTIVE'}));
                dispatch(subPageSelected({active__subPage: 'FEED__SUBPAGE__ACTIVE'}));
            }
            else
                handleClick();
        })
        .catch((err)=>{
            console.log(err);
        })
    }



    return (
        <>
            <form className = "signin__form">
                    <h1 style= {{ fontFamily: "serif"}}>Sign In</h1>
                    <TextField id = "SignInEmail" onChange = {onEmailChange} size = "small" color = "primary" label = 'Roll No.' variant = "outlined" />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        size = "small"
                        onChange = {onPasswordChange}
                    />
                    <Link className = "signin__button__link" to = "/signedInHome" style = {{ textDecoration: "none", color:"whitesmoke"}}>
                        <Button onClick = {handleSignIn} type = "submit" variant = "contained" ><strong>Sign In</strong></Button> 
                    </Link>
                    <h5 style = {{ textDecoration: "underline", cursor: "pointer"}}>Forgot Password?</h5>
            </form>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Incorrect Login Credentials
                </Alert>
            </Snackbar>
        </>    
    )
}

export default SignInForm
