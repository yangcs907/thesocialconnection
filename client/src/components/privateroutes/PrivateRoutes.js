import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoutes = ({component: Component, auth, ...rest}) => (
  <Route
    {...rest}
    render = {props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
      <Redirect to="/login" />
    )
  }
  />
);

PrivateRoutes.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.authenticate
});

export default connect(mapStateToProps)(PrivateRoutes);
