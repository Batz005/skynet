import React, { Component } from "react";

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
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
        }
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Upload
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
