import { Button } from "../../modules/common/Button";
import { ButtonWithoutBg } from "../../modules/common/ButtonWithoutBg";
import Link from "next/link";

export const HeroHeader = () => {
  return (
    <header className="hero_header">
      <div className="hero_header__container">
        <form className="search">
          <input placeholder="Search Lyrics" className="search__input" />
          <label className="search__label">
            <i className="fa-solid fa-magnifying-glass"></i>
          </label>
        </form>
        <div>
          <ButtonWithoutBg name="Login" />
          <Button name="Sign Up" />
        </div>
      </div>
    </header>
  );
};
