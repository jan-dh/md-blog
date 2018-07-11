import React from 'react'

import profilePic from './jan.jpg'

class Bio extends React.Component {
  render() {
    return (
      <div className="flex-wrap text-center md:text-left md:flex-no-wrap w-full mx-auto max-w-sm shadow rounded-lg py-8 px-4 md:p-4 flex  mt-8 md:mt-16 mb-4 items-center bg-grey-light">
        <div className="md:mr-12 flex-no-shrink w-full md:w-auto">
          <img src={profilePic} alt="Jan D'Hollander" className="rounded-full mb-0 bio-pic" />
        </div>
        <div>
          <p className="my-4">Hi, I'm <strong>Jan D'Hollander.</strong><br/>I am a Frontend Developer from Belgium who loves Craft CMS, Javascript and Css.</p>
        </div>
      </div>
    )
  }
}

export default Bio
