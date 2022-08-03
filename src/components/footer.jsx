import React from "react";

const Footer = ({darkMode}) => {
    function dark() {
        if (darkMode) {
          return "darkMode";
        }
      }
    
  return (
    <div
      className={`attribution ${dark()}`}
    >
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "hsl(228, 45%, 44%)" }}
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "hsl(228, 45%, 44%)" }}
        href="https://twitter.com/fran__cies"
      >
        Francis
      </a>
      .
    </div>
  );
};

export default Footer;
