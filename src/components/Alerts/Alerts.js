import React from 'react';
import './Alerts.css'

class Alerts extends React.Component {
  render() {
    return (
      <div className="message">
        <p>{this.props.alertmsg}</p>
      </div>
    )
  }
}

export default Alerts;
