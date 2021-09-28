import React, { Component } from "react";
import Loading from "./Loading";
import Newscomponent from "./Newscomponent";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      totalResults: 0,
      page: 1,
      pageSize: 10,
    };
    document.title = `${this.CapitalizefirstLetter(
      this.props.category
    )} - BBC NEWS`;
  }
  CapitalizefirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  async componentDidMount() {
    this.updateNews();
  }
  fetchData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apikey=ad8f04290d4848808909f32e23a40acb&page=${
      this.state.page + 1
    }&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    // this.setState({ page: this.state.page + 1 });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=ad8f04290d4848808909f32e23a40acb&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  render() {
    return (
      <>
        <h1 className="text-center " style={{ marginTop: "70px" }}>
          BBC news - Top {this.CapitalizefirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {/* {this.state.loading && <Loading />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="container">
            <div className="row my-3">
              {this.state.articles.map((element) => {
                // console.log(element);
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newscomponent
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      date={element.publishedAt}
                      author={element.author}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
