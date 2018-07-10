import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import {graphql} from 'gatsby'
import get from 'lodash/get'
import './prism.css'


import Bio from '../components/Bio'
import Layout from '../components/layout'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const categories = post.frontmatter.categories
    const { previous, next } = this.props.pageContext
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const postUrl = get(this, 'props.location.pathname')

    return (
      <Layout location={this.props.location}>
      <Helmet
        title= {`${post.frontmatter.title} | ${siteTitle}`}
        meta = {[
            { name: "description","content": post.intro},
            { name: 'twitter:title', content: post.frontmatter.title },
            { name: 'twitter:image', content: post.frontmatter.featuredImage },
            { property: "og:title", content: post.frontmatter.title},
            { property: "og:description","content": post.intro},
            { property: "og:url", content: `https://www.thebasement.be${postUrl}`},
            { property: "og:image", content: post.frontmatter.featuredImage },
          ]}
        >
        <html lang="en" />
      </Helmet>
        <div className="content mx-auto max-w-md mt-8">
          <h1 className="my-0 leading-loose text-4xl font-bold">{post.frontmatter.title}</h1>
          <span className="text-sm text-grey-dark mb-4 inline-block">Published on <time>{post.frontmatter.date}</time> - {post.timeToRead} minute{post.timeToRead == 1 ? '' :'s'} reading time</span>
          <p className="intro mt-0 text-xl">{post.frontmatter.intro}</p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <Bio />
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      excerpt
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        featuredImage
        categories
        intro
      }
    }
  }
`

// <ul>
//   {previous && (
//     <li>
//       <Link to={previous.fields.slug} rel="prev">
//         ← {previous.frontmatter.title}
//       </Link>
//     </li>
//   )}
//   {next && (
//     <li>
//       <Link to={next.fields.slug} rel="next">
//         {next.frontmatter.title} →
//       </Link>
//     </li>
//   )}
// </ul>