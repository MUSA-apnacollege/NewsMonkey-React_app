import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

class News extends Component {
  state = {
    articles: [],
    loading: false,
    page: 1,
    totalResults: 0,
    hasMore: true, // Track if more articles are available
  };

  pageSize = 5; // Number of articles per page
  // API

  // Fetch articles based on current page and category
  fetchArticles = async () => {
    const { page, articles } = this.state;
    const { category } = this.props;

    this.setState({ loading: true });
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${this.pageSize}&apiKey=${this.apiKey}`;

    try {
      const response = await fetch(url);
      this.props.setProgress(30);
      const data = await response.json();
      this.props.setProgress(70);

      if (data.status === "ok") {
        const newArticles = data.articles.filter(
          (article) =>
            article.title && article.description && article.url && article.urlToImage
        );

        this.setState({
          articles: [...articles, ...newArticles], // Append new articles
          totalResults: data.totalResults,
          loading: false,
          hasMore: newArticles.length > 0, // Check if more articles are available
        });
        this.props.setProgress(100);
      } else {
        console.error("Failed to fetch articles:", data);
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      this.setState({ loading: false });
    }
  };

  // Fetch articles when component mounts
  componentDidMount() {
    this.fetchArticles();
    document.title = `${this.capitalize(this.props.category)} News - NewsMonkey`;
    window.addEventListener("scroll", this.handleScroll);
  }

  // Clean up event listener when component unmounts
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // Re-fetch articles if the category changes
  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.setState({ page: 1, articles: [] }, () => {
        this.fetchArticles();
        document.title = `${this.capitalize(this.props.category)} News - NewsMonkey`;
      });
    }
  }

  // Function to capitalize category name
  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Handle scroll event for infinite scroll
  handleScroll = () => {
    const { loading, hasMore } = this.state;

    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !loading &&
      hasMore
    ) {
      this.setState(
        (prevState) => ({ page: prevState.page + 1 }),
        this.fetchArticles
      );
    }
  };

  render() {
    const { articles, loading } = this.state;

    return (
      <div className="container my-3">
        <h1 className="text-center">{this.capitalize(this.props.category)} News - NewsMonkey</h1>
        {loading && articles.length === 0 ? (
          <Spinner />
        ) : (
          <>
            <div className="row">
              {articles.map((article) => (
                <div className="col-md-4" key={article.url}>
                  <NewsItem
                    title={article.title}
                    description={article.description}
                    imageUrl={article.urlToImage}
                    newsUrl={article.url}
                    author={article.author || "Unknown"}
                    date={article.publishedAt}
                    source={article.source?.name || "Unknown"}
                  />
                </div>
              ))}
            </div>
            {loading && <Spinner />}
          </>
        )}
      </div>
    );
  }
}

export default News;
