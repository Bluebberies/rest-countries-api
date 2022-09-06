import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import getReq from "../services/httpService";
import { useMediaQuery } from "react-responsive";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

const Details = ({ darkMode }) => {
  const [countryData, setCountryData] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const { name } = useParams();
  const navigate = useNavigate();

  function returnBack() {
    navigate("/");
  }

  useEffect(() => {
    setLoaded(false);
    const fetchData = async () => {
      const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
      try {
        const { data } = await getReq(url);
        setCountryData(data);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [name]);

  function dark() {
    if (darkMode) {
      return "darkMode";
    }
  }

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  function checkScreen() {
    if (isMobile) {
      return "smallScreen";
    }
  }

  const styles = {
    color: darkMode ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
  };

  return loaded ? (
    <div className="details">
      {countryData.map((country) => (
        <React.Fragment key={country.name.common}>
          <Row>
            <Col>
              <div
                onClick={returnBack}
                className={`backBtn ${dark()} d-flex flex-row justify-content-center align-items-center gap-2`}
              >
                <i className="fa-solid fa-arrow-left-long" style={styles}></i>
                <span className={dark()}>Back</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <img className={checkScreen()} src={country.flags.png} alt="" />
            </Col>
            <Col>
              <div className="countryDetails mt-5">
                <h1 className={dark()}>{country.name.common}</h1>
                <Row>
                  <Col sm={6}>
                    <div className="aboutCountry mt-3">
                      <p className={dark()}>
                        Native Name:{" "}
                        <span>
                          {
                            country.name.nativeName[
                              Object.keys(country.name.nativeName)[0]
                            ].common
                          }
                        </span>
                      </p>
                      <p className={dark()}>
                        Population: <span>{country.population}</span>
                      </p>
                      <p className={dark()}>
                        Region: <span>{country.region}</span>
                      </p>
                      <p className={dark()}>
                        Sub Region: <span>{country.subregion}</span>
                      </p>
                      <p className={dark()}>
                        Capital: <span>{country.capital[0]}</span>
                      </p>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="aboutCountryContinued mt-4">
                      <p className={dark()}>
                        Top Level Domain: <span>{country.tld[0]}</span>
                      </p>
                      <p className={dark()}>
                        Currencies:{" "}
                        <span>
                          {
                            country.currencies[
                              Object.keys(country.currencies)[0]
                            ].name
                          }
                        </span>
                      </p>
                      <p className={dark()}>
                        Languages:{" "}
                        <span>
                          {country.languages[Object.keys(country.languages)[0]]}
                        </span>
                      </p>
                    </div>
                  </Col>
                </Row>
                <div className="mt-5">
                  <Row>
                    <Col sm={3}>
                      <h3 className={`borderTitle ${dark()}`}>
                        Border Countries:
                      </h3>
                    </Col>
                    <Col sm={6}>
                      <div className="borderCountries d-flex flex-row justify-content-start align-items-center gap-2">
                        {country.borders &&
                          country.borders
                            .slice(0, 5)
                            .map((borderCountry, index) => (
                              <Link to={`/${name}/${borderCountry}`}>
                                <p
                                  key={index}
                                  className={`d-flex flex-row justify-content-center align-items-center ${dark()}`}
                                >
                                  {borderCountry}
                                </p>
                              </Link>
                            ))}
                        {!country.borders && <p className="none">None...</p>}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </React.Fragment>
      ))}
    </div>
  ) : (
    <div className="spinner">
      <Spinner style={styles} animation="border" />
      <p className={dark()}>Fetching please wait...</p>
    </div>
  );
};

export default Details;
