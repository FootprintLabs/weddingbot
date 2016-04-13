const React = require('react');

class BotFormFieldTag extends React.Component {

  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <span className="tag" onClick={this.onClick.bind(this)}>
        {this.props.field.text}
      </span>
    );
  }

  onClick() {
    this.props.tagClicked(this.props.field);
  }
}

module.exports = BotFormFieldTag;

