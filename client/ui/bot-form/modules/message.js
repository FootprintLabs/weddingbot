const React = require('react'),
      BotFormFieldTag = require('../fields/tag'),
      BotFormFieldImage = require('../fields/image'),
      BotFormModuleForm = require('./form');

class BotFormModuleMessage extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      editable: false
    };
  }

  render() {
    const messageParts = this.splitMessage(
        this.props.module.text, this.props.module.fields);

    const message = messageParts.map((part, i) => {
      if (_.isString(part)) {
        return <span key={i} dangerouslySetInnerHTML={{__html: part}} />
      } else {
        return <BotFormFieldTag
                  key={i}
                  field={part}
                  tagClicked={this.tagClicked.bind(this)} />
      }
    });

    const image = this.props.module.image ?
      <BotFormFieldImage
        name="proposalPhoto"
        label="Upload Proposal Photo"
        image={this.props.module.image.url} /> : null;

    const form = this.state.editable ?
      <BotFormModuleForm
        module={this.props.module}
        updateProgress={this.props.updateProgress} /> : null;

    return (
      <div className="wb-module-message">
        <div className="ui grid stackable">
          <div className="eleven wide column">
            <div className="ui segment">
              <h4 className="ui pink header">
                Message: 
                <span className="label"> {this.props.module.label}</span>
              </h4>
              {message}
              {form}
            </div>
          </div>
          <div className="five wide column">
          {image}
          </div>
        </div>
      </div>
    )
  }

  splitMessage(text, fields) {
    let textSplit = text.replace(/(<[^>]*>)/g, ',$1,').split(',');

    return textSplit.map(item => {
      if (_.startsWith(item, '<')) {
        const pattern = item.replace(/<|>/g, '');
        const field = fields.filter(f => f.pattern === pattern);
        return {
          text: pattern,
          label: field[0].label,
          type: field[0].type,
          name: field[0].name,
          value: field[0].value
        }
      } else {
        return item.replace('\n', '<br /><br />');
      }
    });
  }

  tagClicked(field) {
    this.setState({
      editable: true
    });
  }
}

module.exports = BotFormModuleMessage;
