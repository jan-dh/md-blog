import React from 'react'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'

import css from './index.css'

import SEO from './SEO/'
import Header from "./Header/"
import Main from "./Main/"
import Footer from "./Footer/"

class Layout extends React.Component {
  render(){
    const { location, children, data } = this.props
    const metaData = data.site.siteMetadata
    return(
      <div className="container bg-grey-lightest flex flex-col min-h-screen">
        <SEO data={metaData} />
        <Header key="app-header" location={location.pathname} />
        <Main key="app-main">
          {children}
        </Main>
        <Footer key="app-footer" />
      </div>
    )
  }
}

export default Layout
