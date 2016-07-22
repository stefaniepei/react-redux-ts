import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './app.less';
class Demo extends Component {
  render() {
    return (
      <p className="hello" data-attr="this is a demo">Hello demo</p>
    )
  }
}
export default Demo;
