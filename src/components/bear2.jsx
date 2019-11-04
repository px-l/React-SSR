import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../store';

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(props => (
  <>
    <h2>熊二</h2>
    <button type="button" onClick={() => props.logOut()}>退出</button>
  </>
));