import React, { useState } from 'react'
import GoTrue from 'gotrue-js';
import axios from 'axios'
import "./SignUp.css"
import { Grid, TextField, Button, Select, MenuItem, Snackbar } from '@mui/material';
import auth from '../../lib/netAuth';
import Cookies from 'universal-cookie';





import MuiAlert from '@mui/material/Alert';
import { useSelector } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
 
  const cookies = new Cookies();

// const auth = new GoTrue({
//     APIUrl: `${process.env.PUBLIC_URL}/.netlify/identity`,
//     audience: '',
//     setCookie: false,
//   });

const SignUp = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ first, setFirst ] = useState('');
    const [role, setRole] = React.useState('');
    const [ user_metadata, setUserMetaData] = useState({})

    const { id } = useSelector(state => state.user)
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

        
    const onTextFieldChange = (e) => {
        
        const value = e.target.value;
        setUserMetaData({
            ...user_metadata,
            [e.target.name]: value,
        })
        console.log(user_metadata)
    }
    const onEmailChange = (e)=>{
        setEmail(e.target.value);
        console.log(email);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
        console.log(e.target.value);
    }

    const onRoleChange = (e) => {
        setRole(e.target.value);

    }
    

    const handleSignUp =  async (e) =>{
        e.preventDefault();
        
          
        try {
            
               
                // let videoData = {}
                // const response = axios.post(
                //     "/.netlify/functions/identity-signup/identity-signup", {
                //         user: {
                //             email: email,
                //             password: password,
                //             role: role,
                //             user_metadata: user_metadata
                //         }
                //     }
                // )
                
                // let data = {};
                // console.log(data)
                const response = auth.signup(email, password, user_metadata, role)
                const data = await response
                
                
                console.log((data))
                if(data){
                    const signUpResponse = axios.post("/.netlify/functions/signup/signup",{
                        ...data.user_metadata,
                        created_at: data.created_at,
                        updated_at: data.updated_at,
                        id: data.id,
                        avatar_url: "https://res.cloudinary.com/cbit-skynet/image/upload/c_thumb,g_face,h_200,w_200/v1654366521/photo-1628155930542-3c7a64e2c833_p3hpkm.jpg", 
                        role: role,
                        email: email
                        
                    })
                    const signUpdata = await signUpResponse
                    if(signUpdata?.data){
                        console.log(signUpdata)
                        const URL = '/.netlify/functions';
                        const fullName = data.user_metadata.first_name + " " + data.user_metadata.last_name
                
                        const { data: { token, userId } } = await axios.post(`${URL}/addUser/addUser`, {
                            username: data.user_metadata.first_name, fullName: fullName, phoneNumber:data.user_metadata.mobile, id: data.id, avatar_url: "https://res.cloudinary.com/cbit-skynet/image/upload/c_thumb,g_face,h_200,w_200/v1654366521/photo-1628155930542-3c7a64e2c833_p3hpkm.jpg",
                        });
                        

                        
                            handleClick()
                    }
                    
                   

                }
                // .then(res => {
                //     videoData = res.data;
                //     console.log(videoData)
                //     setData(videoData)
                    // const { title,  publishedAt } = data.items[0].snippet;
                    // const thumbnailUrl = data.items[0].snippet.thumbnails.default.url;
                    // const publishedDateArray = publishedAt.substr(0,10).split("-");
                    // const publishedDate = publishedDateArray.reverse().join("-")
                    
                    
                //   })
                
                // .then(data => {
                //     console.log(data)
                //     videoData = data
                // })
                
                // const jsonData = await response.json();
                // const videoData = await jsonData
                
        }catch(error) {
            console.log("error signing up", error)
            
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
    // axios.post(`/.netlify/functions/addUser/addUser`, {
    //     username: "Sreekar", fullName: "Sreekar Reddy Karnati", phoneNumber: 9348484844, id: id, avatar_url: "https://res.cloudinary.com/cbit-skynet/image/upload/c_thumb,g_face,h_200,w_200/v1654366521/photo-1628155930542-3c7a64e2c833_p3hpkm.jpg",
    // });
  return (
    <>
    <form className = "signup__form">
            <h1 style= {{ fontFamily: "serif", marginBottom: "1em"}}>Sign Up</h1>
            <span style = {{display: "flex", flexDirection: "row", marginleft: "0.90em", marginRight: "0.75em", alignItems: "center"}}>
            
            
            </span>
            
            
            <Grid container spacing = {4} direction = "row" justifyContent = "center" alignItems = "center" >
                            {/* <Grid item key = "1" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Username" defaultValue = {username} InputProps = {{ readOnly: isInputDisabled }} />
                            </Grid> */}
                            <Grid item key = "1" md = {12} sm = {12} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField id = "signupEmail" style = {{marginLeft: "0.85em"}} onChange = {onEmailChange} size = "small" color = "primary" label = 'Email' variant = "outlined" type = 'email'/>
                            </Grid>
                            <Grid item key = "2" md = {12} sm = {12} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                size = "small"
                                onChange = {onPasswordChange}
                            />
                            </Grid>
                            
                            <Grid item key = "3" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "First Name" name = "first_name" onChange = {onTextFieldChange} />
                            </Grid>
                            <Grid item key = "4" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Last Name" name = "last_name" onChange = {onTextFieldChange} />
                            </Grid>
                            
                            {/* <Grid item key = "5" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Personal Email" defaultValue = {personal_email?personal_email:"Not Provided"} type = "email" InputProps = {{ readOnly: isInputDisabled }}/>
                            </Grid> */}
                            <Grid item key = "5" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Mobile No." name = "mobile" onChange = {onTextFieldChange}/>
                            </Grid>
                            
                            
                            <Grid item key = "6" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Date of Birth" name = "date_of_birth" type = "date" InputLabelProps={{
                                        shrink: true,
                                    }} onChange = {onTextFieldChange}/>
                            </Grid>
                            <Grid item key = "7" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Section" name = "section"  onChange = {onTextFieldChange} />
                            </Grid>
                            <Grid item key = "8" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Branch"  name = "branch" onChange = {onTextFieldChange}/>
                            </Grid>

                            <Grid item key = "9" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Semester" name = "semester"  onChange = {onTextFieldChange}/>
                            </Grid>
                            
                            <Grid item key = "10" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Mentor Name" name = "mentor_name" onChange = {onTextFieldChange} />
                            </Grid>
                            <Grid item key = "11" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Mentor Email"  name = "mentor_email" onChange = {onTextFieldChange} />
                            </Grid>
                            <Grid item key = "12" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Roll No."  name = "roll_num" onChange = {onTextFieldChange} />
                            </Grid>
                            <Grid item key = "13" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <Select
                                    value={role}
                                    label="Role"
                                    name = "role"
                                    
                                    onChange={onRoleChange}
                                    >
                                    
                                    <MenuItem value={"user"}>user</MenuItem>
                                    <MenuItem value={"staff"}>staff</MenuItem>
                                    <MenuItem value={"admin"}>admin</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
            <div className = "signup__button__link" style = {{ textDecoration: "none", color:"whitesmoke"}}>
                <Button onClick = {handleSignUp} type = "submit" variant = "contained" ><strong>Sign Up</strong></Button> 
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success"  sx={{ width: '100%' }}>
                    Successfully Signed Up!!
                </Alert>
            </Snackbar>
            
    </form>
    
</>
  )
}

export default SignUp