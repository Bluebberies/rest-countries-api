import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Details from './components/detail'
import Footer from './components/footer'
import NavBar from './components/navBar'
import NotFound from './components/notFound'
import getReq from './services/httpService'
import { ToastContainer } from 'react-toastify'
import Home from './components/home'

function App () {
  const [Dark, setDark] = useState(false)
  const [countryDatas, setCountryDatas] = useState([])
  const [allRegion, setAllRegion] = useState([])
  const [region, setRegion] = useState('')
  const [loaded, setLoaded] = useState(true)
  const [inputValue, setInputValue] = useState('')

  async function getCountries () {
    setLoaded(false)
    const url = 'https://restcountries.com/v3.1/all'
    try {
      const { data } = await getReq(url)
      setCountryDatas(data)
      setAllRegion(data)
      setLoaded(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCountries()
    const darkTheme = JSON.parse(localStorage.getItem('Dark'))
    setDark(darkTheme)
  }, [])

  useEffect(() => {
    localStorage.setItem('Dark', JSON.stringify(Dark))
  }, [Dark])

  function setDarkMode () {
    setDark(current => !current)
  }

  function goTo (chosenRegion) {
    if (chosenRegion === 'All') {
      setAllRegion(countryDatas)
      setRegion(chosenRegion)
    } else {
      const allRegion = countryDatas.filter(
        country => country.region === chosenRegion
      )
      setAllRegion(allRegion)
      setRegion(chosenRegion)
    }
  }

  function searchCountry (e) {
    let val = e.target.value
    setInputValue(val)
    if (region && region !== 'All') {
      const getRegion = countryDatas
        .filter(country => country.region === region)
        .filter(country =>
          country.name.common.toLowerCase().startsWith(val.toLowerCase())
        )
      setAllRegion(getRegion)
    } else if (region && region === 'All') {
      const allRegion = countryDatas.filter(country =>
        country.name.common.toLowerCase().startsWith(val.toLowerCase())
      )
      setAllRegion(allRegion)
    } else {
      const allRegion = countryDatas.filter(country =>
        country.name.common.toLowerCase().startsWith(val.toLowerCase())
      )
      setAllRegion(allRegion)
    }
  }

  return (
    <div className={Dark ? 'App dark' : 'App'}>
      <ToastContainer />
      <NavBar darkMode={Dark} handleMode={setDarkMode} />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              Dark={Dark}
              goTo={goTo}
              inputValue={inputValue}
              searchCountry={searchCountry}
              region={region}
              allRegion={allRegion}
              loaded={loaded}
            />
          }
        />
        <Route path='/:name' element={<Details darkMode={Dark} />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/not-found' replace />} />
      </Routes>
      {/* <Details darkMode={Dark}/> */}
      <Footer darkMode={Dark} />
    </div>
  )
}

export default App
