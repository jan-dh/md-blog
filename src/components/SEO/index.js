import React from 'react';
import Helmet from 'react-helmet'

class SEO extends React.Component {
  constructor(props){
    super()
  }
  render(){
		const data = this.props.data
		return(
      <Helmet>
        <html lang="en" />
        <title>{data.title}</title>
        <meta name="description" content="{data.intro}" />
        <meta name="og:title" content={data.title} />
        <meta name="og:description" content={data.description} />
        <meta name="og:url" content={data.siteUrl} />
        <meta name="og:image" content={data.ogImage} />
        <meta name="og:site_name" content={data.siteName} />
        <meta name="og:author" content={data.author} />
        <meta name="og:type" content="article" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:site" content={data.siteName} />
        <meta name="twitter:image" content={data.ogImage} />
        <meta name="twitter:card" content={data.description} />
        <meta name="twitter:creator" content={data.author} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#08192f" />
        <meta name="msapplication-TileColor" content="#fec001" />
        <meta name="theme-color" content="#fec001" />
      </Helmet>
		)
  }
}

export default SEO;
