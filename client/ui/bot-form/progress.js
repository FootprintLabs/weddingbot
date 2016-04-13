const $ = require('jquery'),
      React = require('react'),
      ReactDOM = require('react-dom'),
      Progress = require('semantic-ui-progress');

$.fn.progress = Progress;

class BotFormProgress extends React.Component {

  render() {
    return (
      <div className="ui indicating progress">
        <div className="bar">
          <div className="progress"></div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.initProgress(this.props.completed);
  }

  componentDidUpdate() {
    this.initProgress(this.props.completed);
  }

  initProgress(percent) {
    $(ReactDOM.findDOMNode(this)).progress({
      precision: 1,
      percent: this.props.completed
    });
  }

}

module.exports = BotFormProgress;
