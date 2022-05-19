import React from 'react'
import GoTrue from 'gotrue-js';
import "./SignUp.css"
import { Grid, TextField } from '@mui/material';


const auth = new GoTrue({
    APIUrl: `${process.env.DOMAIN_URL}/.netlify/identity`,
    audience: '',
    setCookie: false,
  });

const SignUp = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ first, setFirst ] = useState('');
    const [ userMetadata, setUserMetaData] = useState({})

    const onTextFieldChange = (e) => {
        const label = e.target.label;
        const value = e.target.value;
        setUserMetaData({
            ...userMetadata,
            label: value,
        })
        
    }
    const onEmailChange = (e)=>{
        setEmail(e.target.value);
        console.log(email);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
        console.log(e.target.value);
    }


    const handleSignUp =  (e) =>{
        e.preventDefault();
        
          
        try {
            const signupData = async (email, password, user_metadata) => {
       
                // let videoData = {}
                // const response = axios.post(
                //     "/.netlify/functions/identity-signup/identity-signup", {
                //         user: {
                //             email: email,
                //             password: password,
                //             user_metadata: user_metadata
                //         }
                //     }
                // )
                let data = {}
                auth.signup(email, password,)
                .then((response) => {
                    data = response;
                    console.log('Confirmation email sent', response)})
                .catch((error) => console.log("It's an error", error));
                // let data = await response
                // console.log((data))
                
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
                return data.data
              };
        }catch(error) {
            console.log("error signing up")
            handleClick()
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

  return (
    <>
    <form className = "signup__form">
            <h1 style= {{ fontFamily: "serif", marginBottom: "1em"}}>Sign In</h1>
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
                                <TextField variant = "outlined" color = "primary" label = "First Name" defaultValue = {first_name} onChange = {onTextFieldChange} />
                            </Grid>
                            <Grid item key = "4" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Last Name" defaultValue = {last_name} onChange = {onTextFieldChange} />
                            </Grid>
                            
                            {/* <Grid item key = "5" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Personal Email" defaultValue = {personal_email?personal_email:"Not Provided"} type = "email" InputProps = {{ readOnly: isInputDisabled }}/>
                            </Grid> */}
                            <Grid item key = "5" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "primary" label = "Mobile No." defaultValue = {mobile} onChange = {onTextFieldChange}/>
                            </Grid>
                            
                            
                            <Grid item key = "6" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Date of Birth" defaultValue = {date_of_birth.slice(0,10)} type = "date" onChange = {onTextFieldChange}/>
                            </Grid>
                            <Grid item key = "7" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Section" defaultValue = {section} onChange = {onTextFieldChange} />
                            </Grid>
                            <Grid item key = "8" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Branch" defaultValue = {branch}  onChange = {onTextFieldChange}/>
                            </Grid>

                            <Grid item key = "9" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Semester" defaultValue = {semester}  onChange = {onTextFieldChange}/>
                            </Grid>
                            
                            <Grid item key = "10" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Mentor Name" defaultValue = {mentor_name} onChange = {onTextFieldChange} />
                            </Grid>
                            <Grid item key = "11" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Mentor Email" defaultValue = {mentor_email} onChange = {onTextFieldChange} />
                            </Grid>
                            <Grid item key = "12" md = {6} sm = {6} xs = {12} style = {{ display: "flex", justifyContent: "center"}}>
                                <TextField variant = "outlined" color = "secondary" label = "Something" defaultValue = "something" />
                            </Grid>
                        </Grid>
            <div className = "signup__button__link" style = {{ textDecoration: "none", color:"whitesmoke"}}>
                <Button onClick = {handleSignUp} type = "submit" variant = "contained" ><strong>Sign Up</strong></Button> 
            </div>
    </form>
    
</>
  )
}

export default SignUp