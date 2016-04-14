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
          <div className="ui two column grid">
            <div className="column">
              <div className="ui basic segment">
              <div className="wb-bot-header ui horizontal list">
                <div className="item">
                  <img className={listClass} src="/images/blank.png" alt="" />
                  <div className="content">
                    <div className="header">{this.props.name}</div>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div className="column">
              <div className="ui basic right aligned segment non-mobile">
              <button className="ui pink labeled icon button save-form">
                <i className="save icon"></i>
                Save
              </button>
              <button className="ui button cancel-form">
                Cancel
              </button>
              </div>
              <div className="ui basic right aligned segment mobile">
                <div className="ui pink buttons">
                  <div className="ui button save-form">Save</div>
                </div>
                  <div className="ui floating dropdown icon button">
                    <i className="angle down icon"></i>
                    <div className="menu">
                      <div className="item cancel-form">
                        <i className="cancel icon"></i>
                        Cancel
                      </div>
                    </div>
                  </div>
              </div>
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


