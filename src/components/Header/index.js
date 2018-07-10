import React from 'react';
import Helmet from 'react-helmet'
import {Link} from 'gatsby';



class Header extends React.Component {
  constructor(props){
    super()
  }
  render(){
    // Homepage
    if (this.props.location =='/'){
      return(
        <div className="max-w-full px-4">
          <div className="mx-auto max-w-sm pt-12 pb-8">
            <h1 className="my-0 leading-loose text-4xl font-bold">The Basement</h1>
            <p className="text-2xl my-6 leading-loose">Thoughts & insights on <strong className="highlight">Web Development</strong> with a focus on <strong className="highlight">Craft CMS</strong>, <strong className="highlight">Front-end Tools</strong> and <strong className="highlight">Best-Practices.</strong></p>
          </div>
        </div>
      )
    }
    // Smaller banner - normal pages
    else{
      return(
        <div className="max-w-full py-4 bg-white font-bold px-4">
          <div className="mx-auto max-w-md">
            <Link to="/" className="highlight leading-loose my-0 font-bold font-oswald text-xl">The Basement</Link>
          </div>
        </div>
      )
    }
  }
}


export default Header;
