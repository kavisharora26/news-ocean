import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
  // articles = [
  //   {
  //     "source": {
  //       "id": "independent",
  //       "name": "Independent"
  //     },
  //     "author": "Sonia Twigg",
  //     "title": "Ashes 2023 live: England v Australia fourth Test, day five score today as rain in the air at Old Trafford - cricket updates",
  //     "description": "Ashes scorecard and live updates as England vs Australia resumes at Old Trafford",
  //     "url": "http://www.independent.co.uk/sport/cricket/ashes-score-england-australia-cricket-live-b2380216.html",
  //     "urlToImage": "https://static.independent.co.uk/2023/07/23/11/SEI165161450.jpg?quality=75&width=1200&auto=webp",
  //     "publishedAt": "2023-07-23T11:19:56Z",
  //     "content": "The Ashes 2023: Fourth Test, day five\r\nThis doesnt look particularly promising, Skys pundits getting a soaking even with their umbrellas up. England, and Brendon McCullum particularly, will remain op… [+1210 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "espn-cric-info",
  //       "name": "ESPN Cric Info"
  //     },
  //     "author": null,
  //     "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //     "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //     "publishedAt": "2020-04-27T11:41:47Z",
  //     "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "espn-cric-info",
  //       "name": "ESPN Cric Info"
  //     },
  //     "author": null,
  //     "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //     "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //     "publishedAt": "2020-03-30T15:26:05Z",
  //     "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  //   }
  // ]
  constructor(){
    super(); //It is important for a constructor
    this.state={
      // articles: this.articles,
      articles: [],
      loading: false,
      page: 1
    }
  }

  //ComponentDidMount runs after render
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=d64ee18633ef40beb19f86dcd4d6d9b4&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false
      });
  }

  handlenext = async() =>{
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=d64ee18633ef40beb19f86dcd4d6d9b4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      });
  }

  handleprev = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=d64ee18633ef40beb19f86dcd4d6d9b4&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.state({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    });
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsOcean - Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0, 88):""} imageurl={element.urlToImage?element.urlToImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMZOq0I87QttStQZeC-q11YBY9MdOy_ZyVA&usqp=CAU"} newsurl={element.url}/>
        </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-outline-secondary" onClick={this.handleprev}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenext}>Next &rarr;</button>

        </div>
      </div>
    )
  }
}
//we have given key in div because we are returning div

export default News