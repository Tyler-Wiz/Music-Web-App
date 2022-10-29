import React from "react";

export const Button = ({ name, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {name}
    </button>
  );
};
