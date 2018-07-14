import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

class NotFound extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <Layout location={this.props.location}>
      <div className="mx-auto max-w-sm pt-12 pb-8">
        <h1>Page not found</h1>
        <p className="my-4">This is not the page you are looking for.</p>
        <img src="/404.gif" alt="404"/>
       {posts.map(({node}) => {
          return (
            <div className="my-4">
            <p className="my-4">Maybe you were looking for one of these posts?</p>
              <Link to={node.fields.slug}  className="highlight"  key={node.fields.slug}>{node.frontmatter.title}</Link>
              <span className="text-sm text-grey"> - {node.frontmatter.date}</span>
            </div>
          )
        })}
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
