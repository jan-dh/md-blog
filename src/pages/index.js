import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby';
import get from 'lodash/get'
import Helmet from 'react-helmet'


import Bio from '../components/Bio/'
import Layout from '../components/layout'
import Header from '../components/Header';

class BlogIndex extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = this.props.data.site.siteMetadata.description
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const siteName = this.props.data.site.siteMetadata.siteName
    const ogImage = this.props.data.site.siteMetadata.ogImage
    const posts = this.props.data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location}>
        <Helmet
          title= {siteTitle}
          meta = {[
              { name: "description","content": siteDescription},
              { name: 'twitter:title', content: siteTitle },
              { name: 'twitter:image', content: ogImage },
              { property: "og:title", content: siteTitle},
              { property: "og:description","content": siteDescription},
              { property: "og:url", content: siteUrl},
              { property: "og:image", content: ogImage },
            ]}
        >
          <html lang="en" />
        </Helmet>
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <Link to={node.fields.slug}  className="mx-auto max-w-sm p-4 mb-8 bg-white rounded-lg shadow block">
                <h3 className="my-1 text-xl inline-block text-black">{title}</h3>
                <span className="text-sm text-grey"> - {node.frontmatter.date}</span>
                <p className="text-grey-darker my-4 text-base" dangerouslySetInnerHTML={{ __html: node.frontmatter.intro }} />
                {node.frontmatter.categories.map(category => (
                  <span className="inline-block text-xs py-1 px-2 mt-0 mr-2 rounded-xl mb-1 ml-0 text-grey-darker bg-grey-lighter leading-none" key={category}>#{category[0].toUpperCase()}{category.slice(1)}</span>
                ))}
              </Link>
            </div>
          )
        })}
        <Bio />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title,
        author,
        description,
        siteUrl,
        ogImage,
        siteName
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD.MM.YYYY")
            title
            intro
            categories
          }
        }
      }
    }
  }
`
