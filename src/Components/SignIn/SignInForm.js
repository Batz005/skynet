import { Button, TextField, Snackbar } from '@mui/material';


import React,{ useEffect, useState } from 'react'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import { signInStatus,pageSelected, subPageSelected, loadingStatus } from '../../app/site'
import { addUserData } from '../../app/user'
import nhost from '../../lib/nhost'
import { useAuthenticated, useUserRoles,useSignInEmailPassword, useAccessToken, useUserId,   } from '@nhost/react'
import { useAuthQuery } from '@nhost/react-apollo';
import { gql,useQuery } from '@apollo/client'
import { GET_USER_DETAILS } from '../../apollo/hasura.js'
import auth from '../../lib/netAuth';
import "./SignInForm.css"
import MuiAlert from '@mui/material/Alert';
import Cookies from 'universal-cookie';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
 
function SignInForm() {
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isSignedIn, setIsSignedIn ] = useState(false);
    
    const navigate = useNavigate();
    let location = useLocation();
    // const {
    //     signInEmailPassword,
    //     isLoading,
    //     isSuccess,
    //     isError
    //   } = useSignInEmailPassword()
          
    // const id = useUserId()
    let from = location.state?.from?.pathname || "/home";
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
        console.log(email);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
        console.log(e.target.value);
    }

    
    
    const handleSignIn = async (e) =>{
        e.preventDefault();
        let data = {}
        try {
            const response = auth.login(email, password, true)
  
            data = await response;
            console.log(data)
        }catch(error) {
            console.log("error signing in")
            handleClick()
        }
        
        if(data){
                const loginResponse = axios.post("./.netlify/functions/login/login",{
                    
                    id: data.id
                    
                    
                })
                const loginData = await loginResponse;
                console.log(loginData.data)
                const URL = '/.netlify/functions';
                        const fullName = data.user_metadata.first_name + " " + data.user_metadata.last_name
                
                        const {  token, userId  } = await axios.post(`${URL}/loginUser/loginUser`, {
                            username: data.user_metadata.first_name, fullName: fullName, phoneNumber:data.user_metadata.mobile, id: data.id
                        });
                        cookies.set('token', token);
                        cookies.set('username', data.user_metadata.first_name);
                        cookies.set('fullName', fullName);
                        cookies.set('userId', userId);

                        
            dispatch(addUserData({...data.user_metadata, id: data.id, email: data.email, role: loginData.data.role, token: loginData.data.token}))
            
                dispatch(pageSelected({active__page: 'HOME__ACTIVE'}));
                dispatch(subPageSelected({active__subPage: 'FEED__SUBPAGE__ACTIVE'}));
                dispatch(signInStatus({isSignedIn: true}));
                navigate(from, { replace: true })
                
        }
        

        // if (isAuthenticated){
        
        //     console.log(data, "hello")
        //     dispatch(signInStatus({isSignedIn: true}));
        //     dispatch(pageSelected({active__page: 'HOME__ACTIVE'}));
        //     dispatch(subPageSelected({active__subPage: 'FEED__SUBPAGE__ACTIVE'}));
        //     navigate(from, { replace: true })
        // }

        // axios.post('/api/signin',{
        //     email: email,
        //     password: password
        // })
        // .then((response)=>{
        //     if( response.data[0].uid){
        //         dispatch(signInStatus({isSignedIn: true}));
        //         dispatch(addUserData(response.data[0]));
        //         dispatch(pageSelected({active__page: 'HOME__ACTIVE'}));
        //         dispatch(subPageSelected({active__subPage: 'FEED__SUBPAGE__ACTIVE'}));
        //     }
        //     else
        //         handleClick();
        // })
        // .catch((err)=>{
        //     console.log(err);
        // })
    }
    
    // const { isAuthenticated } = useAuthenticated()
    
    let user = {}
    
    
    console.log(user)
    
    // const token = useAccessToken("X-Hasura-User-id")
    // const { loading, data, error } = useQuery(GET_USER_DETAILS,{
    //     variables: {
    //         user_id: id
    //     },
    // });
    
    // console.log(data, error, loading)
    
    // useEffect(()=>{
    //     if (isAuthenticated){
        
        
    //         user = nhost.auth.getUser()
    //         dispatch(signInStatus({isSignedIn: true}));
    //         dispatch(pageSelected({active__page: 'HOME__ACTIVE'}));
    //         dispatch(subPageSelected({active__subPage: 'FEED__SUBPAGE__ACTIVE'}));
    //         navigate(from, { replace: true })
            
    // }
    // }, [isAuthenticated])

    return (
        <>
            <form className = "signin__form">
                    <h1 style= {{ fontFamily: "serif", marginBottom: "1em"}}>Sign In</h1>
                    
                    <TextField id = "SignInEmail" style = {{marginLeft: "0.85em"}} onChange = {onEmailChange} size = "small" color = "primary" label = 'Email' variant = "outlined" />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        size = "small"
                        onChange = {onPasswordChange}
                    />
                    
                    
                    <div className = "signin__button__link" style = {{ textDecoration: "none", color:"whitesmoke"}}>
                        <Button onClick = {handleSignIn} type = "submit" variant = "contained" ><strong>Sign In</strong></Button> 
                    </div>
                    <h5 style = {{ textDecoration: "underline", cursor: "pointer"}}>Forgot Password?</h5>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error"  sx={{ width: '100%' }}>
                    Incorrect Login Credentials
                </Alert>
            </Snackbar>
        </>    
    )
}

export default SignInForm
