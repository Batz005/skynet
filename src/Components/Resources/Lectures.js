import React from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

import "./Lectures.css"
import { Container } from '@mui/material';
 
class Lectures extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        showIndex: false,
        showBullets: true,
        infinite: true,
        showThumbnails: true,
        showFullscreenButton: true,
        showGalleryFullscreenButton: true,
        showPlayButton: true,
        showGalleryPlayButton: true,
        showNav: true,
        isRTL: false,
        slideDuration: 450,
        slideInterval: 2000,
        slideOnThumbnailOver: false,
        thumbnailPosition: 'bottom',
        showVideo: {},
        
      };
      
      const linkCreater = () =>{
        const resource = props.lectureLinks;
        return resource.map((link) => {
          return {
            thumbnail: `https://img.youtube.com/vi/${link}/1.jpg`,
            original: `https://img.youtube.com/vi/${link}/hqdefault.jpg`,
            embedUrl: `https://www.youtube.com/embed/${link}?autoplay=1&showinfo=0`,
            description: 'some tutorial',
            renderItem: this._renderVideo.bind(this),
          }
        })
      }

      this.images = linkCreater();
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (this.state.slideInterval !== prevState.slideInterval ||
          this.state.slideDuration !== prevState.slideDuration) {
        // refresh setInterval
        this._imageGallery.pause();
        this._imageGallery.play();
      }
    }
  
    _onImageClick(event) {
      console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
    }
  
    _onImageLoad(event) {
      console.debug('loaded image', event.target.src);
    }
  
    _onSlide(index) {
      this._resetVideo();
      console.debug('slid to index', index);
    }
  
    _onPause(index) {
      console.debug('paused on index', index);
    }
  
    _onScreenChange(fullScreenElement) {
      console.debug('isFullScreen?', !!fullScreenElement);
    }
  
    _onPlay(index) {
      console.debug('playing from index', index);
    }
  
    _handleInputChange(state, event) {
      this.setState({[state]: event.target.value});
    }
  
    _handleCheckboxChange(state, event) {
      this.setState({[state]: event.target.checked});
    }
  
    _handleThumbnailPositionChange(event) {
      this.setState({thumbnailPosition: event.target.value});
    }
  
    
  

  
    _resetVideo() {
      this.setState({showVideo: {}});
  
      if (this.state.showPlayButton) {
        this.setState({showGalleryPlayButton: true});
      }
  
      if (this.state.showFullscreenButton) {
        this.setState({showGalleryFullscreenButton: true});
      }
    }
  
    _toggleShowVideo(url) {
      this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
      this.setState({
        showVideo: this.state.showVideo
      });
  
      if (this.state.showVideo[url]) {
        if (this.state.showPlayButton) {
          this.setState({showGalleryPlayButton: false});
        }
  
        if (this.state.showFullscreenButton) {
          this.setState({showGalleryFullscreenButton: false});
        }
      }
    }
  
    _renderVideo(item) {
      return (
        <div>
          {
            this.state.showVideo[item.embedUrl] ?
              <div className='video-wrapper'>
                  <a
                    className='close-video'
                    onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
                  >
                  </a>
                  <iframe 
                    title = {item.embedUrl}
                    width="800rem" 
                    height="450rem" 
                    src={item.embedUrl} 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen="allowfullscreen"
                    mozallowfullscreen="mozallowfullscreen" 
                    msallowfullscreen="msallowfullscreen" 
                    oallowfullscreen="oallowfullscreen" 
                    webkitallowfullscreen="webkitallowfullscreen"
                    >

                  </iframe>
              </div>
            :
              <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
                <div className='play-button'></div>
                <img className='image-gallery-image' src={item.original} alt = "image1"/>
                {
                  item.description &&
                    <span
                      className='image-gallery-description'
                      style={{right: '0', left: 'initial'}}
                    >
                      {item.description}
                    </span>
                }
              </a>
          }
        </div>
      );
    }
  
    render() {
      return (
  
        <Container maxWidth="md" className='lectures'>
          <ImageGallery
            ref={i => this._imageGallery = i}
            items={this.images}
            lazyLoad={false}
            onClick={this._onImageClick.bind(this)}
            onImageLoad={this._onImageLoad}
            onSlide={this._onSlide.bind(this)}
            onPause={this._onPause.bind(this)}
            onScreenChange={this._onScreenChange.bind(this)}
            onPlay={this._onPlay.bind(this)}
            infinite={this.state.infinite}
            disableThumbnailScroll = {false}
            showFullscreenButton={false}
            useBrowserFullscreen = {false}
            showPlayButton={false}
            showThumbnails={this.state.showThumbnails}
            showIndex={this.state.showIndex}
            showNav={this.state.showNav}
            isRTL={this.state.isRTL}
            thumbnailPosition={this.state.thumbnailPosition}
            slideDuration={parseInt(this.state.slideDuration)}
            slideInterval={parseInt(this.state.slideInterval)}
            slideOnThumbnailOver = {this.state.slideOnThumbnailOver}
            additionalClass = "app-image-gallery"
            style = {{width: "100%"}}
          />
          </Container>
    );
  }
}

export default Lectures