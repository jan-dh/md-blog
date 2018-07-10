import React from 'react';

class Footer extends React.Component {
  constructor(props){
    super()
  }
  render(){
    return(
      <div className="mt-16 bg-grey-light py-4 text-sm px-4">
        <div className="mx-auto max-w-sm">
          <span>© Copyright - {(new Date()).getFullYear()}</span>
        </div>
      </div>
    )
  }
}

export default Footer;
