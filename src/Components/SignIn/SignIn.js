import React, { Component } from 'react'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import SignInForm from './SignInForm';

import particlesOptions from "./particles.json"
import './Untitled-2.png'
import './SignIn.css';







const SignIn =() => {
    
    const particlesInit = async (main) => {
        
    
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
      };    
      const particlesLoaded = (container) => {
        
      };
    
    return (
        <div className = "signin">
            
            <SignInForm />
            <Particles
                id = "tsparticles"
                init = {particlesInit}
                loaded = {particlesLoaded}
                className= "particles"
                
                
                options={particlesOptions}
            />
        </div>
    );
    
}

export default SignIn
