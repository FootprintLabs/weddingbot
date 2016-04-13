const $ = require('jquery'),
      Transition = require('semantic-ui-transition'),
      React = require('react'),
      ReactDOM = require('react-dom'),
      BotFormHeader = require('./bot-form/header'),
      BotFormBody = require('./bot-form/body');

$.fn.transition = Transition;

class BotForm extends React.Component {

  constructor() {
    super(...arguments);

    this.progress = {};
    this.props.form.modules.forEach(module => {
      module.fields.forEach(field => {
        this.progress[field.name] = false;
      });
    });
  }

  render() {
    return (
      <div id="wb-bot-form">
        <BotFormHeader
          ref="header"
          id={this.props.form.id}
          name={this.props.form.name} />
        <BotFormBody
          ref="body"
          id={this.props.form.id}
          name={this.props.form.name}
          description={this.props.form.description}
          modules={this.props.form.modules}
          updateProgress={this.updateProgress.bind(this)} />
      </div>
    )
  }

  updateProgress(field) {
    this.progress[field.name] = field.validated;

    const totalFields = _.keys(this.progress).length,
      completedFields = _.reduce(this.progress, (sum, n) => sum + (n ? 1: 0));

    this.refs.header.updateCompleted(
        (completedFields / totalFields) * 100);
  }

  componentDidMount() {
    const elem = ReactDOM.findDOMNode(this),
          header = elem.children[0];

    $(ReactDOM.findDOMNode(this)).transition({
      animation: 'fade up',
      onComplete : () => {
        this.refs.body.show();
      }
    });

    $('body').css('overflow', 'hidden');
  }
}

module.exports = BotForm;
