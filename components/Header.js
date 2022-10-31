import { Button } from "../modules/common/Button";
import { ButtonWithoutBg } from "../modules/common/ButtonWithoutBg";
import { pageData } from "../data/data";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AllSongsConfig } from "../modules/hooks/allSongs-config";

export const Header = () => {
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
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <i className="fa-solid fa-record-vinyl"></i>
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
                      <Link
                        href={url}
                        className="searchItem"
                        onClick={clearInput}>
                        <Image
                          src={value.artwork}
                          width={60}
                          height={60}
                          alt=""
                          className="searchItem__image"
                        />
                        <div>
                          <p className="searchItem__track">{value.trackName}</p>
                          <p className="searchItem__artist">
                            {value.artistName}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </form>
        </div>
        <nav className="nav">
          {pageData.map(({ name, path }) => (
            <Link href={path} key={name}>
              {name}
            </Link>
          ))}
        </nav>
        <div>
          <ButtonWithoutBg name="Login" />
          <Button name="Sign Up" />
        </div>
      </div>
    </header>
  );
};
