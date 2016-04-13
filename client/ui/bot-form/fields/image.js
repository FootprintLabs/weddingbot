const $ = require('jquery'),
      React = require('react'),
      BotFormProgress = require('../progress');

class BotFormFieldImage extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      loading: false
    };
  }

  render() {
    const progress = this.state.loading ?
      <BotFormProgress completed={this.state.completed} /> : null;

    const image = this.state.image ?
      <img src={this.state.image} /> : null;

    return (
      <div className="ten wide field wb-field-image">
        {progress}
        {image}
        <a href="javascript:;" onClick={this.onClick.bind(this)}>
          <i className="ui retro camera icon"></i>
          {this.props.label}
        </a>
        <input ref="file" type="file" onChange={this.onChange.bind(this)} />
        <input ref="input" type="hidden" name={this.props.name} value={this.state.image} />
      </div>
    );
  }

  onClick(event) {
    this.refs.file.click();
  }

  updateProgress(event) {
    if (event.lengthComputable) {
      this.setState({
        loading: true,
        completed: _.toInteger((event.loaded / event.total) * 100)
      });
    }
  }

  onChange(event) {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    $.ajax({
      url:          '/upload-image',
      mimeType:     'multipart/form-data',
      type:         'POST',
      dataType:     'json',
      data:         formData,
      contentType:  false,
      processData:  false,
      cache:        false,
      xhr: () => {
        const myXhr = $.ajaxSettings.xhr();
        if (myXhr.upload) {
          myXhr.upload.addEventListener(
              'progress', this.updateProgress.bind(this), false);
        }
        return myXhr;
      },
      success: response => {
        this.setState({
          loading: false,
          image: response.url
        });
        this.validate();
      }
    });
  }

  validate() {
    const field = {
      name: this.props.name,
      validated: false
    }

    if (this.state.image) {
      field.validated = true;
    }

    this.props.onValidate(field);
  }
}

module.exports = BotFormFieldImage;

