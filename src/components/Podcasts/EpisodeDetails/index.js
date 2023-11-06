import React from "react";
import Button from "../../common/Button";

function EpisodeDetails({ index, title, description, audioFile, onClick }) {
  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ textAlign: "left", marginBottom: 0 }}>
        {index}. {title}
      </h1>
      <p style={{ marginLeft: "1.5rem" }} className="podcast-description">
        {description}
      </p>
      <Button className="play-btn"
        text={"Play"}
        onClick={() => onClick(audioFile)}
        style={{ width: "40px", textAlign: "center" }}
      />
    </div>
  );
}

export default EpisodeDetails;
