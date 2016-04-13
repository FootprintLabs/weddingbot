const React = require('react'),
      BotFormProgress = require('./progress');

class BotFormHeader extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      completed: 0
    };
  }

  render() {
    const listClass = "ui avatar image " + this.props.id;
    return (
      <div className="header">
        <div className="ui container">
          <div className="ui two column stackable grid">
            <div className="column">
              <div className="wb-bot-header ui horizontal list">
                <div className="item">
                  <img className={listClass} src="/images/blank.png" alt="" />
                  <div className="content">
                    <div className="header">{this.props.name}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <button className="ui green labeled icon button save-form">
                <i className="save icon"></i>
                Save
              </button>
              <button className="ui button cancel-form">
                Cancel
              </button>
            </div>
          </div>
        </div>
        <BotFormProgress completed={this.state.completed} />
      </div>
    )
  }

  updateCompleted(value) {
    this.setState({
      completed: value
    });
  }

}

module.exports = BotFormHeader;


