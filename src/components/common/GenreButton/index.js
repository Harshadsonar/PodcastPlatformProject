import React from "react";
import "./styles.css";

const GenreButton = ({text, onclick, genre}) => {
    return(
        <p className={`animated-word ${genre===text?"active":""}`} onClick={onclick} >{text}</p>
    )
}

export default GenreButton;