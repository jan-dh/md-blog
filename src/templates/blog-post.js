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
    const intro = get(this, 'post.frontmatter.intro')
    const ogImage = get(this, 'post.frontmatter.featuredImage.childImageSharp.sizes.src')
    console.log(post.frontmatter.featuredImage);

    return (
      <Layout location={this.props.location}>
      <Helmet
        title= {`${post.frontmatter.title} | ${siteTitle}`}
        meta = {[
            { name: "description", content: post.frontmatter.intro},
            { name: 'twitter:title', content: post.frontmatter.title },
            { name: 'twitter:image', content: post.frontmatter.featuredImage.absolutePath },
            { property: "og:title", content: post.frontmatter.title},
            { property: "og:description", content: post.frontmatter.intro},
            { property: "og:url", content: `https://www.thebasement.be${postUrl}`},
            { property: "og:image", content: post.frontmatter.featuredImage.childImageSharp.sizes.src},
          ]}
        >
        <html lang="en" />
      </Helmet>
        <div className="content mx-auto max-w-md mt-8">
          <h1 className="my-0 lg:leading-loose text-4xl font-bold mb-2">{post.frontmatter.title}</h1>
          <span className="text-sm text-grey-dark mb-4 inline-block">Published on <time>{post.frontmatter.date}</time> - {post.timeToRead} minute{post.timeToRead == 1 ? '' :'s'} read</span>
          <p className="intro mt-0 text-xl">{post.frontmatter.intro}</p>
          <img src={post.frontmatter.featuredImage.childImageSharp.sizes.src} alt={post.frontmatter.title} />
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
            {categories.map(category => (
              <span className="inline-block text-xs py-1 px-2 mt-0 mr-2 rounded-xl mb-1 ml-0 text-grey-darker bg-grey-lighter" key={category}>#{category[0].toUpperCase()}{category.slice(1)}</span>
            ))}
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
        categories
        intro
        featuredImage {
          publicURL
          absolutePath
          childImageSharp {
            sizes(maxWidth: 1400 ) {
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
