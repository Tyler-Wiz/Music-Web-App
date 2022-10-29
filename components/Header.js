import { Button } from "../modules/common/Button";
import { ButtonWithoutBg } from "../modules/common/ButtonWithoutBg";
import { pageData } from "../data/data";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <i className="fa-solid fa-record-vinyl"></i>
          <form className="search">
            <input placeholder="Search Lyrics" className="search__input" />
            <label className="search__label">
              <i className="fa-solid fa-magnifying-glass"></i>
            </label>
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
