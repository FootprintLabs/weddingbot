const React = require('react');

class BotFormFieldString extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      value: this.props.value
    };
  }

  render() {
    return (
      <div className="ten wide field">
        <label>{this.props.label}</label>
        <input
          name={this.props.name}
          type="text"
          ref="input"
          placeholder="Your Answer"
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          onBlur={this.handleBlur.bind(this)} />
      </div>
    );
  }

  handleBlur(event) {
    const field = {
      name: this.props.name,
      validated: false
    };

    if (event.target.value.length) {
      field.validated = true;
    }

    this.props.onValidate(field);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

}

module.exports = BotFormFieldString;

