import React from 'react';

class Share extends React.Component {
  constructor(props){
    super()
  }
  render(){
    const url = this.props.url
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`
    const facebookUrl = `https://www.facebook.com/sharer.php?u=${url}`
    return(
     <div className="my-8">
       <p>Like what you read? Share it on &nbsp;
         <a href={twitterUrl} target="_blank" rel="noopener" className="mr-4 text-black" aria-label="twitter">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 14.62" className="twitter" width="18" height="18">
             <path fill="currentColor" d="M5.66 14.62a10.43 10.43 0 0 0 10.51-10.5v-.48A7.51 7.51 0 0 0 18 1.73a7.37 7.37 0 0 1-2.12.58 3.71 3.71 0 0 0 1.62-2 7.4 7.4 0 0 1-2.34.9 3.7 3.7 0 0 0-6.3 3.33A10.48 10.48 0 0 1 1.25.67 3.7 3.7 0 0 0 2.4 5.6a3.66 3.66 0 0 1-1.68-.46 3.69 3.69 0 0 0 3 3.62A3.69 3.69 0 0 1 2 8.87a3.7 3.7 0 0 0 3.45 2.56 7.41 7.41 0 0 1-4.57 1.59 7.52 7.52 0 0 1-.88-.06 10.45 10.45 0 0 0 5.66 1.66"/>
           </svg>
         </a>
         <a href={facebookUrl} target="_blank" rel="noopener" className="mr-4 text-black" aria-label="facebook">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.6 72" width="18" height="18">
             <path fill="currentColor" d="M7.26 13.95v9.91H0V36h7.26v36h14.92V36h10s.94-5.81 1.4-12.17H22.24v-8.29a3.52 3.52 0 0 1 3.24-2.9h8.13V0H22.55C6.9 0 7.27 12.13 7.27 13.95zm0 0"/>
           </svg>
         </a>
       </p>
      </div>
    )
  }
}

export default Share;
