import React from "react";
import { useMediaQuery } from "react-responsive";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NavBar = ({ darkMode, handleMode }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 375px)" });

  function checkScreen() {
    if (isMobile) {
      return "smallScreen";
    }
  }

  function dark() {
    if (darkMode) {
      return "darkMode";
    }
  }

  const styles = {
    color: darkMode ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
  };

  return (
    <nav className={dark()}>
      <Row>
        <Col className="d-flex flex-row justify-content-start align-items-center">
          <h1 className={`${checkScreen()} ${dark()}`}>Where in the world?</h1>
        </Col>
        <Col className="d-flex flex-row justify-content-end align-items-center">
          <div
            className="changeMode d-flex flex-row justify-content-end align-items-center"
            onClick={handleMode}
          >
            <i
              className={`fa-solid fa-moon ${checkScreen()}`}
              style={styles}
            ></i>
            <p className={dark()}>{darkMode ? "Light Mode" : " Dark Mode"}</p>
          </div>
        </Col>
      </Row>
    </nav>
  );
};

export default NavBar;
