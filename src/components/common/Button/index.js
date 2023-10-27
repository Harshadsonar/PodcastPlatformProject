import React from "react";
import "./styles.css";

function Button({ text, onClick, disabled, style }) {
  return (
    <div
      className="custom-btn"
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export default Button;
