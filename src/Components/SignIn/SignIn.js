import React, { Component } from 'react'

import SignInForm from './SignInForm';
import Particles from 'react-tsparticles';
import particlesOptions from "./particles.json"
import './Untitled-2.png'
import './SignIn.css';

// console.log(Particles)





const SignIn =() => {
    
    

    
    return (
        <div className = "signin">
            
            <SignInForm />
            <Particles
                id = "tsparticles"
                className= "particles"
                // init={particlesInit}
                // loaded={particlesLoaded}
                
                options={particlesOptions}
            />
        </div>
    );
    
}

export default SignIn
