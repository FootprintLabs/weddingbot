const React = require('react'),
      BotFormModuleForm = require('./modules/form'),
      BotFormModuleMessage = require('./modules/message');

class BotFormModule extends React.Component {

  render() {
    return (
      <div className="wb-module" data-name={this.props.module.name}>
      {this.getModule()}
      </div>
    );
  }

  getModule() {
    if (this.props.module.type === 'form') {
      return <BotFormModuleForm
                module={this.props.module}
                updateProgress={this.props.updateProgress} />;
    } else if (this.props.module.type === 'message') {
      return <BotFormModuleMessage
                module={this.props.module}
                updateProgress={this.props.updateProgress} />;
    }
  }
}

module.exports = BotFormModule;
