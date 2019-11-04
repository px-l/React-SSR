import React from 'react';
// 从 react-router-dom 引入基础组件
import { NavLink, Switch, Route } from 'react-router-dom';

// 引入页面
import Header from './Header.jsx';
import Xiongda from './bear1.jsx';
import Xionger from './bear2.jsx';
import Xiaomuwu from "./home.jsx";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ssr-show">
        <h1>青青草原</h1>
        <Header />
        <Switch>
          <Route path="/" exact component={Xiaomuwu} />
          <Route path="/bear1" exact component={Xiongda} />
          <Route path="/bear2" exact component={Xionger} />
        </Switch>
      </div>
    );
  }
}