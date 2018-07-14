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
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:url" content={data.siteUrl} />
        <meta property="og:image" content={data.ogImage} />
        <meta property="og:site_name" content={data.siteName} />
        <meta property="og:author" content={data.author} />
        <meta property="og:type" content="website" />
        <meta property="og:see_also" content="https://twitter.com/Jan_DHollander" />
        <meta property="og:locale" content="en" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:image" content={data.ogImage} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@Jan_DHollander" />
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
