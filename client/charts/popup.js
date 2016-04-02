const _ = require('lodash'),
      moment = require('moment'),
      numeral = require('numeral'),
      d3 = require('d3');

// Default properties
const defaultProps = {
  template: 'companyOneDay',
  width: 120,
  theme: 'light'
};

class Popup {

  constructor(element, props) {
    this.props = _.defaults(props, defaultProps);
    this.element = element;
    this.popup = this.append();

    this.template = _.template(this.getTemplate(this.props.type));
  }

  render(data) {
    this.popup.html(this.template(
          _.assign({}, {moment:moment, numeral:numeral}, data)));
  }

  show() {
    this.popup.style('display', 'block');
  }

  hide() {
    this.popup.style('display', 'none');
  }

  append() {
    const styles = {
      width: this.props.width + 'px',
      background: 'rgba(255,255,255,0.8)',
      fontSize: '0.85em'
    };

    let popupClass = 'ui popup top center';
    if (this.props.theme === 'dark') {
      popupClass += ' inverted';
      styles.background = 'rgba(40,40,40,0.6)';
    }

    return this.element
      .append('div')
        .attr('class', popupClass)
        .style('width', styles.width)
        .style('background-color', styles.background)
        .style('font-size', styles.fontSize);
  }

  getHeight() {
    return this.popup.node().getBoundingClientRect().height;
  }

  getWidth() {
    return this.popup.node().getBoundingClientRect().width;
  }

  position(top, left) {
    this.popup
      .style('top', top + 'px')
      .style('left', left + 'px');
  }

  getTemplate(name) {
    var templates = {
      series: '' +
        '<div class="ui large list">' +
        ' <% _.each(series, function(series0) { %>' +
        ' <div class="item">' +
        '   <%= moment(series0.data[series0.x]).format(\'LL\') %>' +
        '   <br />' +
        '   <% if (series0.data) { %>' +
        '     <strong><%= series0.data[series0.y] %> Responses</strong>' +
        '   <% } else { %>' +
        '     NA' +
        '   <% } %>' +
        ' </div>' +
        ' <% }) %>' +
        '</div>'
    };

    if (name === 'companyMultiDay') {
      return templates.companyOneDay.replace('lll', 'll');
    }

    return templates[name];
  }

}

module.exports = Popup;
