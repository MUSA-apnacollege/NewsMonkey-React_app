import React from "react";

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  const placeholderImage =
    "https://www.oregonlive.com/resizer/v2/Y7KR5ZELAZEIXLGNEORDFY3GJ4.jpg?auth=e14d4a4533ccf632ac3e87fe6787b19511111e5ca3446a76d9b5455a7989f35c&width=500&quality=90";

  return (
    <div className="my-3">
      <div className="card h-100">
        <div>
      <span className="badge rounded-pill bg-danger">
              {source || "Unknown"}
            </span>

            </div>
        <img
          src={imageUrl || placeholderImage}
          alt="News"
          className="card-img-top"
          onError={(e) => (e.target.src = placeholderImage)} // Fallback to placeholder if image fails to load
        />
        <div className="card-body">
          <h5 className="card-title">
            {title || "No Title Available"}
          </h5>
          <p className="card-text">
            {description || "No Description Available"}
          </p>
          <p className="text-muted small">
            <strong>Author:</strong> {author || "Unknown"} <br />
            <strong>Date:</strong> {date ? new Date(date).toDateString() : "Unknown"}
          </p>
          <a
            href={newsUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
