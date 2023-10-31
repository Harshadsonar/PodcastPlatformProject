import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function PodcastCard({ id, title, displayImage }) {
  return (
    <Link to={`/podcast/${id}`}>
      <div className="podcast-card">
        <img className="display-image-podcast" src={displayImage} alt={title} />
        <p className="title-podcast">{title}</p>
        <p className="title-podcast-content">TRENDING NOW ...</p>
      </div>
    </Link>
  );
}

export default PodcastCard;