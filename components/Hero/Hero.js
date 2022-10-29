import React from "react";
import Main from "./Main";
import Sidebar from "./Sidebar";

const Hero = ({ trending, newRelease, chart }) => {
  return (
    <div>
      <Sidebar />
      <Main trending={trending} newRelease={newRelease} chart={chart} />
    </div>
  );
};

export default Hero;
