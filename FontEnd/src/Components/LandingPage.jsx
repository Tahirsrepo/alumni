import React from 'react'
import AlumniHeroSection from './AlumniHeroSection'
import ATMENavbar from '../Router/ATMENavbar'
import AboutUsPage from './AboutUsPage'
import EventsPage from './EventsPage'
import Footer from './Footer'

const LandingPage = () => {
  return (
    <div>
      <ATMENavbar/>
      <AlumniHeroSection/>
      <AboutUsPage/>
      <EventsPage/>
      <Footer/>
    </div>
  )
}

export default LandingPage