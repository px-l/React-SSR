import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ state });

// 这样写是为了方便调试
const Header = props => (
  <div>
    <NavLink to="/">首页</NavLink>
    { Boolean(props.state) && <NavLink to="/bear1">找熊大</NavLink> }
    <NavLink to="/bear2">找熊二</NavLink>
  </div>
);

export default connect(mapStateToProps)(Header);