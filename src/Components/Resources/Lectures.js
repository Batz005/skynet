import React, {useState, useEffect} from 'react'
// import "react-image-gallery/styles/css/image-gallery.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// import ImageGallery from 'react-image-gallery';
import getVideoId from '../utils/getVideoId';
import ReactPlayer from 'react-player/youtube'
import "./Lectures.css"
import { useAuthQuery } from '@nhost/react-apollo';
import { useMutation, gql, useQuery  } from '@apollo/client';
import { Container } from '@mui/material';
 


const GET_RESOURCE_DATA = gql`
query GetResourceData($resource_id: uuid!) {
    Resources_by_pk(id: $resource_id) {
      id
      Lectures {
        id
        title
        
        video_id
      }
      
    }
  }

`




const YoutubeSlide = ({ url, isSelected }) => (
  <ReactPlayer width="100%" url={url} playing={isSelected} controls = {true} light = {true} pip = {true}/>
);




const Lectures = ({ resourceId, lectures }) => {
  let [resourceData, setResourceData] = useState({})
  const queryResults = useQuery(GET_RESOURCE_DATA, {
    variables: {
        resource_id: resourceId
    }
})



useEffect(() => {
    if(queryResults.data){
      setResourceData(queryResults.data.Resources_by_pk)
    }
    else{
        setResourceData({
            
            "Lectures": []

        })
    }
        
      
  }, [queryResults.data])

        // const videoId = getVideoId("https://www.youtube.com/watch?v=WX1khF8zEr4")
        console.log(resourceId)
        console.log(resourceData)

        const customRenderItem = (item, props) => <item.type {...item.props} {...props} />;

        const getVideoThumb = (video_id) => `https://img.youtube.com/vi/${video_id}/default.jpg`;
      
        // const getVideoId = (url) => url.substr('https://www.youtube.com/embed/'.length, url.length);
      
        const customRenderThumb = (children) =>
            children.map((item, i) => {
                const video_id = getVideoId(item.props.url);
                return <img key = {i} src={getVideoThumb(item.props.video_id)} />;
            });


      return (
            // <Carousel infiniteLoop autoPlay>
                
            // </Carousel>
            <Carousel renderItem={customRenderItem} renderThumbs={customRenderThumb}>
              {
                  lectures?.map((lecture, i) => (

                    <YoutubeSlide key={`youtube-${i}`} url={`https://www.youtube.com/embed/${lecture.video_id}`}  />
                        // <iframe 
                        //   width="560" 
                        //   height="315" 
                        //   src="https://www.youtube.com/embed/{lectureLink}" 
                        //   title="YouTube video player" 
                        //   frameborder="0" 
                        //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        //   allowfullscreen="allowfullscreen">

                        // </iframe>
                  ))
                }
                
          
          
      </Carousel>
      )   
        

}

export default Lectures