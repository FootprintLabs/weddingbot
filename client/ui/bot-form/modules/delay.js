const React = require('react');

class BotFormModuleDelay extends React.Component {

  render() {
    return (
      <div className="wb-module-delay">
        <strong>Delay between messages:</strong> {this.props.module.value} seconds
        <a className="link" href="javascript">Change</a>
      </div>
    )
  }
}

module.exports = BotFormModuleDelay;
