const React = require('react');

class BotFormModuleResponse extends React.Component {

  render() {
    const messageParts = this.splitMessage(
        this.props.module.text, this.props.module.fields);

    const message = messageParts.map((part, i) => {
      if (_.isString(part)) {
        return <span key={i} dangerouslySetInnerHTML={{__html: part}} />
      } else {
        return <span key={i} className="ui pink basic label">{part.text}</span>
      }
    });

    return (
      <div className="wb-module-message">
        <div className="ui grid stackable">
          <div className="eleven wide column">
            <div className="ui segment">
              <h4 className="ui pink header">
                Response: 
                <span className="label"> {this.props.module.label}</span>
              </h4>
              {message}
            </div>
          </div>
          <div className="five wide column">
          </div>
        </div>
      </div>
    )
  }

  splitMessage(text, fields) {
    let textSplit = text.replace(/(<[^>]*>)/g, ',$1,').split(',');

    return textSplit.map(item => {
      if (_.startsWith(item, '<')) {
        return {
          text: item.replace(/<|>/g, ''),
        }
      } else {
        return item.replace('\n', '<br /><br />');
      }
    });
  }
}

module.exports = BotFormModuleResponse;
