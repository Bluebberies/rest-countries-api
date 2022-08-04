import React from "react";
import Navigate from "./navigate";
import AllCountries from "./allCountries";

const Home = ({
  Dark,
  goTo,
  inputValue,
  searchCountry,
  region,
  allRegion,
  loaded,
}) => {
  return (
    <div>
      <Navigate
        darkMode={Dark}
        handleClick={goTo}
        inputs={inputValue}
        handleChange={searchCountry}
        region={region}
      />
      <AllCountries darkMode={Dark} allRegion={allRegion} loaded={loaded} />
    </div>
  );
};

export default Home;
