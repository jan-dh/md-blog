import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet'

const Main = ({ children }) => (
  <main role="main" className="px-4 flex-1">
    {children}
  </main>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
