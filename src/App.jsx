import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./home-components/Home"
import Navbar from "./header/Navbar"
import Topics from "./header/Topics"
import Footer from "./footer/Footer"
import AboutUs from "./about-us/AboutUs"
import TermsConditions from "./other-pages/TermsConditions"
import PrivacyPolicy from "./other-pages/PrivacyPolicy"
import ContactUs from "./other-pages/ContactUs"
import China from "./news-categories/China"
import HongKong from "./news-categories/HongKong"
import Today from "./news-categories/Today"
import ForYou from "./news-categories/ForYou"
import Article from "./article-view/Article"
import SearchResults from "./search/SearchResults"


function App() {


  return (
    <>
      <main className='flex-grow w-full mx-auto bg-[theme(--color-bg-light)]'>

        <Navbar />
        <Topics />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} /> 
          <Route path="/china" element={<China />} />       
          <Route path="/hongkong" element={<HongKong />} />
          <Route path="/today" element={<Today />} />
          <Route path="/for-you" element={<ForYou/>} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/search" element={<SearchResults />} />


        </Routes>
        <Footer />
        

        
      </main>
     
    </>
  )
}

export default App
