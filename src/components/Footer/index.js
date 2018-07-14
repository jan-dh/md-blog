import React from 'react';

class Footer extends React.Component {
  constructor(props){
    super()
  }
  render(){
    const css = this.props.location =='/' ? 'mx-auto max-w-sm' : 'mx-auto max-w-md';
    return(
      <div className="mt-16 bg-grey-light py-4 text-sm px-4">
        <div className={css}>
          <span>© Copyright - {(new Date()).getFullYear()}</span>
        </div>
      </div>
    )
  }
}

export default Footer;
