const React = require('react'),
      BotFormField = require('../field');

class BotFormModuleForm extends React.Component {

  render() {
    return (
      <div className="wb-fields">
        {this.props.module.fields.map(
          (field, i) => <BotFormField
                          key={i}
                          field={field}
                          onValidate={this.onValidate.bind(this)} />
        )}
      </div>
    )
  }

  onValidate(field) {
    field.module = this.props.module.name;
    this.props.updateProgress(field);
  }
}

module.exports = BotFormModuleForm;
