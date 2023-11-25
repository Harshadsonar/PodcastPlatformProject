import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { useDispatch } from "react-redux";
import { deletePodcast } from '../../../slices/podcastSlice'; 


function PodcastCard({ id, title, displayImage, onDelete }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if(onDelete){
      onDelete(id);
    } else{
      dispatch(deletePodcast(id));
    }
  }
  return (
    <Link>
      <div className="podcast-card">
        <img className="display-image-podcast" src={displayImage} alt={title} />
        <h3 className="title-podcast">{title}</h3>
        <Link to={`/podcast/${id}`}><button className="podcast-card-button">Edit</button></Link>
        
        <button className="podcast-card-button" onClick={handleDelete}>Delete</button>
      </div>
    </Link>
  );
}

export default PodcastCard;