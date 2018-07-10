import React from 'react'

import profilePic from './jan.jpg'

class Bio extends React.Component {
  render() {
    return (
      <div className="mx-auto max-w-sm shadow rounded-lg p-4 flex mt-16 mb-4 items-center bg-grey-light">
        <div className="mr-12 flex-no-shrink">
          <img src={profilePic} alt="Jan D'Hollander" className="rounded-full mb-0 bio-pic" />
        </div>
        <div>
          <p className="my-4">Hi, I'm <strong>Jan D'Hollander.</strong><br/>Frontend Developer @ <a href="http://glue.be" target="_blank" rel='noopener' className="highlight">Glue Webdesign</a>. Want to get in touch? Contact me on Twitter</p>
          <a href="#twitter" target="_blank" rel="noopener" className="mr-4 text-black" aria-label="twitter">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 14.62" className="twitter" width="18" height="18">
              <path fill="currentColor" d="M5.66 14.62a10.43 10.43 0 0 0 10.51-10.5v-.48A7.51 7.51 0 0 0 18 1.73a7.37 7.37 0 0 1-2.12.58 3.71 3.71 0 0 0 1.62-2 7.4 7.4 0 0 1-2.34.9 3.7 3.7 0 0 0-6.3 3.33A10.48 10.48 0 0 1 1.25.67 3.7 3.7 0 0 0 2.4 5.6a3.66 3.66 0 0 1-1.68-.46 3.69 3.69 0 0 0 3 3.62A3.69 3.69 0 0 1 2 8.87a3.7 3.7 0 0 0 3.45 2.56 7.41 7.41 0 0 1-4.57 1.59 7.52 7.52 0 0 1-.88-.06 10.45 10.45 0 0 0 5.66 1.66"/>
            </svg>
          </a>
          <a href="#mail" target="_blank" rel="noopener" className="mr-4 text-black" aria-label="mail">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 34" className="mail" width="18" height="18">
              <path fill="currentColor" d="M20 14.87L4 4.04c-.19-.1-.17-.17 0-.17h32.09c.17 0 .2.07.06.16zm16.36 15.35H3.64V8.8a.15.15 0 0 1 .26-.14L20 18.97 36.11 8.66a.15.15 0 0 1 .26.14v21.42zM36 .04H4a4.13 4.13 0 0 0-4 4.21v25.5a4.14 4.14 0 0 0 4 4.29h32a4.14 4.14 0 0 0 4-4.25V4.25a4.14 4.14 0 0 0-4-4.21z"/>
            </svg>
          </a>
        </div>
      </div>
    )
  }
}

export default Bio
