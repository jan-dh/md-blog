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
    const posts = this.props.data.allMarkdownRemark.edges.slice(1,3)
    return (
      <Layout location={this.props.location} data={this.props.data}>
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <Link to={node.fields.slug}  className="mx-auto max-w-sm p-4 mb-8 bg-white rounded-lg shadow block">
                <h3 className="my-1 text-xl inline-block text-black">{title}</h3>
                <span className="text-sm text-grey-darker"> - {node.frontmatter.date}</span>
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
        title
        author
        description
        siteName
        siteUrl
        ogImage
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
