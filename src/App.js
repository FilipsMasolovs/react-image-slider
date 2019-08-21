import React from 'react';
import './App.css';
import ImageSlide from './ImageSlide'
import bg1 from './assets/1.jpg'
import bg2 from './assets/2.jpeg'
import bg3 from './assets/3.jpg'
import bg4 from './assets/4.jpg'
import bg5 from './assets/5.jpg'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.data = [
      {
        background: bg1,
        h1: 'AWESOME!',
        h2: 'Awesome image slider!'
      },
      {
        background: bg2,
        h1: 'AWESOME!',
        h2: 'As explained by J.Konutis.'
      },
      {
        background: bg3,
        h1: 'AWESOME!',
        h2: 'With help of YouTube and Google!'
      },
      {
        background: bg4,
        h1: 'AWESOME!',
        h2: 'Turned out quite nice!'
      },
      {
        background: bg5,
        h1: 'AWESOME!',
        h2: 'Here we go again...'
      }
    ]

    this.state = {
        currentSlide: 0,
    }

    this.dots = true
    this.auto = true
    this.intervalTime = 5000
    
    this.nextSlide = this.nextSlide.bind(this)
    this.prevSlide = this.prevSlide.bind(this)
    this.dotClick = this.dotClick.bind(this)  
    this.sliderMouseEnter = this.sliderMouseEnter.bind(this)
    this.sliderMouseLeave = this.sliderMouseLeave.bind(this)  

    this.handleAuto()
  }

  nextSlide () {
    if (this.state.currentSlide < this.data.length - 1) {
      this.setState({ currentSlide: this.state.currentSlide + 1 })
    } else {
      this.setState({ currentSlide: 0 })
    }
  }

  prevSlide () {
    if (this.state.currentSlide === 0) {
      this.setState({ currentSlide: this.data.length - 1})
    } else {
      this.setState({ currentSlide: this.state.currentSlide - 1})
    }
  }

  dotClick (event) {
    let currentDot = parseInt(event.currentTarget.getAttribute('data-dot-index'));
    this.setState({ currentSlide: currentDot})
  }

  getDots () {
    let dotsContent = [];
    for (let i = 0; i < this.data.length; i++) {
      let dotClassName = "dot";
      if (i === this.state.currentSlide) {
          dotClassName += " active-dot";
      }
      dotsContent.push(<button className={dotClassName} data-dot-index={i} key={`dot-${i}`} onClick={this.dotClick}></button>)
    }
    return dotsContent;
  }

  getSlide () {
    let slides = [];
    let slideArray = this.data
    slideArray.forEach((item, index) => {
      let isActive = false;
      if (index === this.state.currentSlide) {
        isActive = true
      }
      slides.push(
        <ImageSlide
          key={`slide-${index}`}
          bg={item.background}
          h1={item.h1}
          h2={item.h2}
          isActive={isActive}
        />
      )
    })

    return slides;
  }

  handleAuto () {
    if (this.auto) {
      this.slideInterval = setInterval(this.nextSlide, this.intervalTime);
    }
  }

  sliderMouseEnter () {
    clearInterval(this.slideInterval);
  }

  sliderMouseLeave () {
    this.slideInterval = setInterval(this.nextSlide, this.intervalTime);
  }

  render () {
    let dotContainer = null
    if (this.dots) {
      dotContainer = <div className="dots" key="dots">{this.getDots()}</div>
    }

    return (
      <div className="slider" onMouseEnter={this.sliderMouseEnter} onMouseLeave={this.sliderMouseLeave}>
        <div className="slides">
          {this.getSlide()}
        </div>
        <div className="buttons">
          <i className="fas fa-arrow-right nextBtn" onClick={this.nextSlide}></i>
          <i className="fas fa-arrow-left prevBtn" onClick={this.prevSlide}></i>
        </div>
        {dotContainer}
      </div>
    )
  }
};