import React from "react";
import { useMediaQuery } from "react-responsive";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

const Navigate = ({ darkMode, handleClick, inputs, handleChange, region }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

  function checkScreen() {
    if (isMobile) {
      return "d-flex justify-content-start";
    } else {
      return "d-flex justify-content-end";
    }
  }

  function dark() {
    if (darkMode) {
      return "darkMode";
    }
  }

  function checkRegion() {
    if (region === "Africa") {
      return "   Search for African country...";
    } else if (region === "Americas") {
      return "   Search for American country...";
    } else if (region === "Asia") {
      return "   Search for Asian country...";
    } else if (region === "Europe") {
      return "   Search for European country...";
    } else if (region === "Oceania") {
      return "   Search for Oceanian country...";
    } else {
      return "   Search for a country...";
    }
  }

  return (
    <div className="search">
      <Row>
        <Col className="inputField d-flex align-items-center gap-2">
          <i className="fa-solid fa-magnifying-glass" style={{position: "absolute", left: '20px'}}></i>
          <input
            type="text"
            value={inputs}
            onChange={handleChange}
            className={dark()}
            placeholder={checkRegion()}
          />
        </Col>
        <Col className="filter">
          <Dropdown className={checkScreen()}>
            <Dropdown.Toggle
              className={`dropdown ${dark()}`}
              id="dropdown-basic"
            >
              <span className={dark()}>Filter by Region</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className={`mt-2 ${dark()}`}>
              <Dropdown.Item
                className={`region ${dark()}`}
                onClick={() => handleClick("All")}
              >
                All Region
              </Dropdown.Item>
              <Dropdown.Item
                className={`region ${dark()}`}
                onClick={() => handleClick("Africa")}
              >
                Africa
              </Dropdown.Item>
              <Dropdown.Item
                className={`region ${dark()}`}
                onClick={() => handleClick("Americas")}
              >
                America
              </Dropdown.Item>
              <Dropdown.Item
                className={`region ${dark()}`}
                onClick={() => handleClick("Asia")}
              >
                Asia
              </Dropdown.Item>
              <Dropdown.Item
                className={`region ${dark()}`}
                onClick={() => handleClick("Europe")}
              >
                Europe
              </Dropdown.Item>
              <Dropdown.Item
                className={`region ${dark()}`}
                onClick={() => handleClick("Oceania")}
              >
                Oceania
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};

export default Navigate;
