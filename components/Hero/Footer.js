import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer">
      <p>Plug</p>
      <div className="footer__copyright">
        <p>Privacy</p>
        <p>Cookie Policy</p>
        <p>Copyright</p>
      </div>
      <div className="footer__social">
        <Link href={"https://www.facebook.com/tooxclusive"} target="_blank">
          <i class="fa-brands fa-facebook-f"></i>
        </Link>
        <Link
          href={"https://www.instagram.com/tooxclusive_com/"}
          target="_blank">
          <i class="fa-brands fa-instagram"></i>
        </Link>
        <Link href={"/"}>
          <i class="fa-brands fa-twitter"></i>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
