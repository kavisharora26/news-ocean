import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageurl, newsurl} = this.props;
    return (
        <div className="card my-3" style={{width: "18rem"}}>
            <img src={imageurl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-primary">Explore News</a>
            </div>
        </div>
        //target = "_blank is used to open that in new tab."
    )
  }
}

export default NewsItem