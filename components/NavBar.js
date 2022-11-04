import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { NavData } from "../data/data";
import logo from "../img/logo.PNG";
import { AllSongsConfig } from "../modules/hooks/allSongs-config";

const Navbar = () => {
  // to change burger classes
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [allSongs] = AllSongsConfig();

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allSongs.filter((value) => {
      return (
        value.trackName.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.artistName.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="remove_nav">
      <div className="navbar">
        <Link href={"/"}>
          <Image src={logo} width={100} height={70} alt="" />
        </Link>
        <ul className="navbar__list">
          {NavData.map((item, i) => (
            <li className="navbar__container" key={i}>
              <p>{item.icon}</p>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <form className="search">
        <input
          placeholder="Search Lyrics"
          className="search__input"
          value={wordEntered}
          onChange={handleFilter}
        />
        <label className="search__label">
          <i className="fa-solid fa-magnifying-glass"></i>
        </label>
        {filteredData.length != 0 && (
          <div className="dataResult">
            {filteredData.slice(0, 5).map((value, i) => {
              let url = `${"/lyrics/" + value.id}`;
              return (
                <div className="dataItem" key={i}>
                  <Link href={url} className="searchItem" onClick={clearInput}>
                    <Image
                      src={value.artwork}
                      width={60}
                      height={60}
                      alt=""
                      className="searchItem__image"
                    />
                    <div>
                      <p className="searchItem__track">{value.trackName}</p>
                      <p className="searchItem__artist">{value.artistName}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </form>
    </div>
  );
};

export default Navbar;
