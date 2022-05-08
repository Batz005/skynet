import React from 'react'
// import "react-image-gallery/styles/css/image-gallery.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// import ImageGallery from 'react-image-gallery';
import getVideoId from '../utils/getVideoId';
import ReactPlayer from 'react-player/youtube'
import "./Lectures.css"
import { Container } from '@mui/material';
 
// class Lectures extends React.Component {

//     constructor(props) {
//       super(props);
//       this.state = {
//         showIndex: false,
//         showBullets: true,
//         infinite: true,
//         showThumbnails: true,
//         showFullscreenButton: true,
//         showGalleryFullscreenButton: true,
//         showPlayButton: true,
//         showGalleryPlayButton: true,
//         showNav: true,
//         isRTL: false,
//         slideDuration: 450,
//         slideInterval: 2000,
//         slideOnThumbnailOver: false,
//         thumbnailPosition: 'bottom',
//         showVideo: {},
        
//       };
      
//       const linkCreater = () =>{
//         const resource = props.lectureLinks;
//         return resource.map((link) => {
//           return {
//             thumbnail: `https://img.youtube.com/vi/${link}/1.jpg`,
//             original: `https://img.youtube.com/vi/${link}/hqdefault.jpg`,
//             embedUrl: `https://www.youtube.com/embed/${link}?autoplay=1&showinfo=0`,
//             description: 'some tutorial',
//             renderItem: this._renderVideo.bind(this),
//           }
//         })
//       }

//       this.images = linkCreater();
//     }
  
//     componentDidUpdate(prevProps, prevState) {
//       if (this.state.slideInterval !== prevState.slideInterval ||
//           this.state.slideDuration !== prevState.slideDuration) {
//         // refresh setInterval
//         this._imageGallery.pause();
//         this._imageGallery.play();
//       }
//     }
  
//     _onImageClick(event) {
//       console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
//     }
  
//     _onImageLoad(event) {
//       console.debug('loaded image', event.target.src);
//     }
  
//     _onSlide(index) {
//       this._resetVideo();
//       console.debug('slid to index', index);
//     }
  
//     _onPause(index) {
//       console.debug('paused on index', index);
//     }
  
//     _onScreenChange(fullScreenElement) {
//       console.debug('isFullScreen?', !!fullScreenElement);
//     }
  
//     _onPlay(index) {
//       console.debug('playing from index', index);
//     }
  
//     _handleInputChange(state, event) {
//       this.setState({[state]: event.target.value});
//     }
  
//     _handleCheckboxChange(state, event) {
//       this.setState({[state]: event.target.checked});
//     }
  
//     _handleThumbnailPositionChange(event) {
//       this.setState({thumbnailPosition: event.target.value});
//     }
  
    
  

  
//     _resetVideo() {
//       this.setState({showVideo: {}});
  
//       if (this.state.showPlayButton) {
//         this.setState({showGalleryPlayButton: true});
//       }
  
//       if (this.state.showFullscreenButton) {
//         this.setState({showGalleryFullscreenButton: true});
//       }
//     }
  
//     _toggleShowVideo(url) {
//       this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
//       this.setState({
//         showVideo: this.state.showVideo
//       });
  
//       if (this.state.showVideo[url]) {
//         if (this.state.showPlayButton) {
//           this.setState({showGalleryPlayButton: false});
//         }
  
//         if (this.state.showFullscreenButton) {
//           this.setState({showGalleryFullscreenButton: false});
//         }
//       }
//     }
  
//     _renderVideo(item) {
//       return (
//         <div>
//           {
//             this.state.showVideo[item.embedUrl] ?
//               <div className='video-wrapper'>
//                   <a
//                     className='close-video'
//                     onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
//                   >
//                   </a>
//                   <iframe 
//                     title = {item.embedUrl}
//                     width="800rem" 
//                     height="450rem" 
//                     src={item.embedUrl} 
//                     frameborder="0" 
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//                     allowfullscreen="allowfullscreen"
//                     mozallowfullscreen="mozallowfullscreen" 
//                     msallowfullscreen="msallowfullscreen" 
//                     oallowfullscreen="oallowfullscreen" 
//                     webkitallowfullscreen="webkitallowfullscreen"
//                     >

//                   </iframe>
//               </div>
//             :
//               <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
//                 <div className='play-button'></div>
//                 <img className='image-gallery-image' src={item.original} alt = "image1"/>
//                 {
//                   item.description &&
//                     <span
//                       className='image-gallery-description'
//                       style={{right: '0', left: 'initial'}}
//                     >
//                       {item.description}
//                     </span>
//                 }
//               </a>
//           }
//         </div>
//       );
//     }
  
//     render() {
//       return (
  
//         <Container maxWidth="md" className='lectures'>
//           <ImageGallery
//             ref={i => this._imageGallery = i}
//             items={this.images}
//             lazyLoad={false}
//             onClick={this._onImageClick.bind(this)}
//             onImageLoad={this._onImageLoad}
//             onSlide={this._onSlide.bind(this)}
//             onPause={this._onPause.bind(this)}
//             onScreenChange={this._onScreenChange.bind(this)}
//             onPlay={this._onPlay.bind(this)}
//             infinite={this.state.infinite}
//             disableThumbnailScroll = {false}
//             showFullscreenButton={false}
//             useBrowserFullscreen = {false}
//             showPlayButton={false}
//             showThumbnails={this.state.showThumbnails}
//             showIndex={this.state.showIndex}
//             showNav={this.state.showNav}
//             isRTL={this.state.isRTL}
//             thumbnailPosition={this.state.thumbnailPosition}
//             slideDuration={parseInt(this.state.slideDuration)}
//             slideInterval={parseInt(this.state.slideInterval)}
//             slideOnThumbnailOver = {this.state.slideOnThumbnailOver}
//             additionalClass = "app-image-gallery"
//             style = {{width: "100%"}}
//           />
//           </Container>
//     );
//   }
// }

const YoutubeSlide = ({ url, isSelected }) => (
  <ReactPlayer width="100%" url={url} playing={isSelected} controls = {true} light = {true} pip = {true}/>
);

// export const youtubeAutoplayWithCustomThumbs = () => {
//   const customRenderItem = (item, props) => <item.type {...item.props} {...props} />;

//   const getVideoThumb = (videoId) => `https://img.youtube.com/vi/${videoId}/default.jpg`;

//   const getVideoId = (url) => url.substr('https://www.youtube.com/embed/'.length, url.length);

//   const customRenderThumb = (children) =>
//       children.map((item) => {
//           const videoId = getVideoId(item.props.url);
//           return <img src={getVideoThumb(videoId)} />;
//       });

//   return (
//       <Carousel renderItem={customRenderItem} renderThumbs={customRenderThumb}>
//           <YoutubeSlide key="youtube-1" url="https://www.youtube.com/embed/AVn-Yjr7kDc" />
//           <YoutubeSlide key="youtube-2" url="https://www.youtube.com/embed/mOdmi9SVeWY" />
//           <YoutubeSlide key="youtube-3" url="https://www.youtube.com/embed/n0F6hSpxaFc" />
//           <YoutubeSlide key="youtube-4" url="https://www.youtube.com/embed/0uGETVnkujA" />
//       </Carousel>
//   );
// };



const Lectures = ({ lectureLinks }) => {

        // const videoId = getVideoId("https://www.youtube.com/watch?v=WX1khF8zEr4")
        console.log(lectureLinks)
        const customRenderItem = (item, props) => <item.type {...item.props} {...props} />;

        const getVideoThumb = (videoId) => `https://img.youtube.com/vi/${videoId}/default.jpg`;
      
        // const getVideoId = (url) => url.substr('https://www.youtube.com/embed/'.length, url.length);
      
        const customRenderThumb = (children) =>
            children.map((item) => {
                const videoId = getVideoId(item.props.url);
                return <img src={getVideoThumb(videoId)} />;
            });


      return (
            // <Carousel infiniteLoop autoPlay>
                
            // </Carousel>
            <Carousel renderItem={customRenderItem} renderThumbs={customRenderThumb}>
              {
                  lectureLinks.map((lectureLink, i) => (

                    <YoutubeSlide key={`youtube-${i}`} url={`https://www.youtube.com/embed/${lectureLink}`} />
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
                
          
          {/* <YoutubeSlide key="youtube-2" url="https://www.youtube.com/embed/mOdmi9SVeWY" />
          <YoutubeSlide key="youtube-3" url="https://www.youtube.com/embed/n0F6hSpxaFc" />
          <YoutubeSlide key="youtube-4" url="https://www.youtube.com/embed/0uGETVnkujA" /> */}
      </Carousel>
      )   
        

}

export default Lectures