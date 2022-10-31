import React from "react";
import Link from "next/link";
import { NavData } from "../../data/data";
import { Button } from "../../modules/common/Button";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h4>PLUG</h4>
        <i className="fa-solid fa-bars"></i>
      </div>
      <div className="message">
        <h6>Subscribe Now</h6>
        <p className="message__text">
          Get Unlimited Lyrics from your favorite artists
        </p>
        <Button name="Sign Up" />
      </div>
      <ul>
        {NavData.map((item, i) => (
          <li className="sidebar__container" key={i}>
            <p>{item.icon}</p>
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
