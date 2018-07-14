import React from 'react'
import { Link } from 'gatsby'
import {graphql} from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/layout'

class NotFound extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <Layout location={this.props.location}>
      <Helmet
        title= 'Page not found'
      />
      <div className="mx-auto max-w-sm pt-12 pb-8 content">
        <h1>Page not found</h1>
        <p className="my-4">This is not the page you are looking for.</p>
        <img src="/404.gif" alt="404"/>
        <p className="my-4">Maybe you were looking for one of these posts?</p>
        <ul>
         {posts.map(({node}) => {
            return (
              <li key={node.fields.slug}>
                <Link to={node.fields.slug}  className="highlight">{node.frontmatter.title}</Link>
                <span className="text-sm text-grey"> - {node.frontmatter.date}</span>
              </li>
            )
          })}
        </ul>
      </div>
      </Layout>
    )
  }
}

export default NotFound

export const notFoundQuery = graphql`
  query notFoundQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD.MM.YYYY")
            title
          }
        }
      }
    }
  }
`
