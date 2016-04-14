const React = require('react');

class BotFormModuleQuestion extends React.Component {

  render() {
    return (
      <div className="wb-module-message">
        <div className="ui grid stackable">
          <div className="eleven wide column">
            <div className="ui segment">
              <h4 className="ui pink header">
                Question:
                <span className="label"> {this.props.module.label}</span>
              </h4>
              {this.props.module.text}
            </div>
          </div>
          <div className="five wide column">
          </div>
        </div>
      </div>
    )
  }

}

module.exports = BotFormModuleQuestion;
