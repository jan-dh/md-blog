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
    const siteUrl = this.props.data.site.siteMetadata.siteUrl;
    const postUrl = this.props.location.pathname
    const title = post.frontmatter.title
    const intro = post.frontmatter.intro
    const fullUrl = `${siteUrl}${postUrl.substring(1)}`
    const ogImage = `${siteUrl}${post.frontmatter.featuredImage.publicURL.substring(1)}`
    const updated = post.frontmatter.updated.length > 0 ? ` - Updated on ${post.frontmatter.updated}` : ''

    return (
      <Layout location={this.props.location} data={this.props.data}>
      <Helmet
        title= {`${post.frontmatter.title} | ${siteTitle}`}
        meta = {[
            { name: "description", content: intro},
            { name: 'twitter:title', content: `${title} | ${siteTitle}`},
            { name: 'twitter:image', content: ogImage },
            { property: "og:title", content: title },
            { property: "og:description", content: intro },
            { property: "og:url", content: fullUrl},
            { property: "og:image", content: ogImage },
            { property: "og:type", content: 'article'}
          ]}
        />
        <div className="content mx-auto max-w-md mt-8">
          <h1 className="my-0 lg:leading-loose text-4xl font-bold mb-2">{post.frontmatter.title}</h1>
          <span className="text-sm text-grey-dark mb-4 inline-block">Published on <time>{post.frontmatter.date}</time>{updated} - {post.timeToRead} minute{post.timeToRead == 1 ? '' :'s'} read</span>
          <p>{post.frontmatter.updated}</p>
          <p className="intro mt-0 text-xl">{post.frontmatter.intro}</p>
          <img src={post.frontmatter.featuredImage.childImageSharp.sizes.src} alt={post.frontmatter.title} />
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <p>
            {categories.map(category => (
              <span className="inline-block text-xs py-1 px-2 mt-0 mr-2 rounded-xl mb-1 ml-0 text-grey-darker bg-grey-lighter leading-none" key={category}>#{category[0].toUpperCase()}{category.slice(1)}</span>
            ))}
          </p>
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
        author
        description
        siteName
        siteUrl
        ogImage
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
        updated(formatString: "MMMM DD, YYYY")
        categories
        intro
        featuredImage {
          publicURL
          childImageSharp {
            sizes(maxWidth: 768 ) {
              src
            }
          }
        }
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
