import React from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"
import Home from "./home-components/Home"
import Navbar from "./header/Navbar"
import TopicsBar from "./header/TopicsBar"
import Footer from "./footer/Footer"
import AboutUs from "./about-us/AboutUs"
import TermsConditions from "./other-pages/TermsConditions"
import PrivacyPolicy from "./other-pages/PrivacyPolicy"
import ContactUs from "./other-pages/ContactUs"
import SearchResults from "./search/SearchResults"
import Topic from "./trending-topics/Topic"
import UserGuide from "./other-pages/UserGuide"
import Account from "./account/account"
import LoginForm from "./auth/LoginForm"
import SavedArticles from "./account/SavedArticles"
import ReadingHistory from "./account/ReadingHistory"
import ViewArticle from "./article-view/ViewArticle"
import MyTopics from "./account/MyTopics"
import Feed from "./news-categories/Feed"
import LandingPage from "./landing/LandingPage"
import Recap from "./recap/Recap"
import Personal from "./personal/Personal"

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/"; // Add more paths if needed
  const hideTopicsBar = location.pathname === "/about-us";

  return (
      <main className='w-full max-w-[240rem] bg-[var(--color-gs-white)]'>
        <LanguageProvider>
          {!hideHeader && <Navbar />}
          {!hideHeader && !hideTopicsBar && <TopicsBar />}
          <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/home" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} /> 
            <Route path="/china" element={<Feed tag={"china"} />} />       
            <Route path="/hk" element={<Feed tag={"hk"} />} />
            <Route path="/today" element={<Feed tag={"today"} />} />
            <Route path="/for-you" element={<Feed tag={"personal"} />} />
            <Route path="/article/:id" element={<ViewArticle />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/topics/:topic" element={<Topic />} />
            <Route path="/user-guide" element={<UserGuide />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/account/topics" element={<MyTopics />} />
            <Route path="/account/saved" element={<SavedArticles />} />
            <Route path="/account/reading-history" element={<ReadingHistory />} />
            <Route path="/recap" element={<Recap />} />
            <Route path="/personal" element={<Personal />} />
          </Routes>
          {!hideHeader && <Footer />}              
        </LanguageProvider>  
      </main>
  )
}

export default App
