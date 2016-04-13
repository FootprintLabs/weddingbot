const React = require('react'),
      BotFormFieldString = require('./fields/string'),
      BotFormFieldImage = require('./fields/image');

class BotFormField extends React.Component {

  render() {
    return (
      <div className="wb-field">
        <div className="fields">
          {this.getInput()}
        </div>
      </div>
    );
  }

  getInput() {
    if (this.props.field.type === 'string') {
      return <BotFormFieldString
                name={this.props.field.name}
                label={this.props.field.label}
                value={this.props.field.value}
                onValidate={this.props.onValidate} />;
    } else if (this.props.field.type === 'image') {
      return <BotFormFieldImage
                name={this.props.field.name}
                label={this.props.field.label}
                value={this.props.field.value}
                onValidate={this.props.onValidate} />;
    }
  }

}

module.exports = BotFormField;
