import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useMediaQuery } from "react-responsive";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

const AllCountries = ({ darkMode, allRegion, loaded }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(allRegion.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allRegion.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, allRegion]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allRegion.length;
    setItemOffset(newOffset);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

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

  return loaded ? (
    <div className="allCountriesFragment">
      <Container>
        <Row className={`columnRows ${checkScreen()}`}>
          {currentItems.map((currentItem) => (
            <Col className='allCountriesItem' sm={6} md={4} lg={3} key={currentItem.name.common}>
              {" "}
              <Link
                to={`/${currentItem.name.common}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className={`cardHolder ${dark()} mb-5`}>
                  <img src={currentItem.flags.png} alt="" />
                  <div className="cardInfo">
                    <h3 className={dark()}>{currentItem.name.common}</h3>
                    <div className="infos">
                      <p className={dark()}>
                        Population: <span>{currentItem.population}</span>
                      </p>
                      <p className={dark()}>
                        Region: <span>{currentItem.region}</span>
                      </p>
                      <p className={dark()}>
                        Capital: <span>{currentItem.capital}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={0}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="prev."
        renderOnZeroPageCount={null}
        breakClassName={`break ${dark()}`}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
        disabledLinkClassName="disabled"
      />
    </div>
  ) : (
    <div className="spinner">
      <Spinner style={styles} animation="border" />
      <p className={dark()}>Fetching please wait...</p>
    </div>
  );
};

export default AllCountries;
