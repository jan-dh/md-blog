import React from 'react'
import Helmet from 'react-helmet'

import css from './index.css'

import Header from "./Header/"
import Main from "./Main/"
import Footer from "./Footer/"

export default ({ children, location}) => {
  return(
      <Helmet>
        {/* Favicon stuff from realfavicongenerator.net */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#08192f" />
        <meta name="msapplication-TileColor" content="#fec001" />
        <meta name="theme-color" content="#fec001" />
      </Helmet>,
      <div className="container bg-grey-lightest flex flex-col min-h-screen">
        <Header key="app-header" location={location.pathname} />
        <Main key="app-main">
          {children}
        </Main>
        <Footer key="app-footer" />
      </div>
  )
}
