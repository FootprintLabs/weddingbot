const React = require('react'),
      ReactDOM = require('react-dom'),
      BotFormModule = require('./module');

class BotFormBody extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      show: false
    };

    this.styles = {
      opacity: 0,
    }
  }

  show() {
    this.setState({
      show: true
    });
  }

  render() {
    if (this.state.show) {
      this.styles = {
        opacity: 1,
      };
    }

    return (
      <div className="body" style={this.styles}>
        <div className="ui container">
          <div className="ui segment">
            <div className="intro">
              <h1 className="ui header">
                {this.props.name}
              </h1>
              {this.props.description.map(function(para, i) {
                return <p key={i}>{para}</p>;
              })}
            </div>
            <div className="ui large form">
              {this.props.modules.map(
                module => <BotFormModule
                            key={module.name}
                            module={module}
                            updateProgress={this.props.updateProgress} />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = BotFormBody;

