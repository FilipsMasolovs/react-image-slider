import React from 'react';

export default class ImageSlide extends React.Component {
    render () {
        const { bg, h1, h2, isActive } = this.props

        let className = "slide"
        if (isActive) {
            className = "slide current"
        }

        return (
            <div className={className} style={{backgroundImage: `url(${bg})`}}>
                <div className="content">
                    <h2 className="slide-heading">{h1}</h2>
                    <h3 className="slide-sub-heading">{h2}</h3>
                </div>
            </div>
        )
    }
};