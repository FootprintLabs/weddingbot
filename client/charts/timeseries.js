const d3 = require('d3'),
      _ = require('lodash'),
      Popup = require('./popup');

// Default properties
const defaultProps = {
  margin: {
    top: 0,
    right: 10,
    bottom: 0,
    left: 10
  },
  theme: 'light',
  popupType: 'series',
  aspectRatio: 10 / 6,
  volumePercent: 0.2,
  width: 'auto',
  xAxis: {
    tickFormat: 'auto'
  },
  scale: {
    x: 'time'
  }
};

class Timeseries {

  constructor(element, props) {
    this.element = d3.select(element);
    this.props = _.defaults(props, defaultProps);

    this.element.selectAll('*').remove();

    if (typeof this.props.margin === 'number') {
      this.props.margin = {
        top: this.props.margin,
        right: this.props.margin,
        bottom: this.props.margin,
        left: this.props.margin
      };
    }

    if (this.props.width === 'auto') {
      this.calculateSize();
    }

    this.svg = this.appendSvg(this.element);
    if (this.configure) {
      this.configure();
    }
    this.draw();
  }

  configure() {
    this.element.classed('wb-chart-timeseries', true);

    this.popup = new Popup(this.element, {
      type: this.props.popupType,
      theme: this.props.theme
    });
  };

  draw() {
    const scales = this.getScales(),
          axes = this.getAxes(scales),
          that = this;

    this.svg.append('rect')
        .attr('class', 'bg')
        .attr('x', 0)
        .attr('width', this.props.width)
        .attr('y', 0)
        .attr('height', this.props.height);

    this.svg.selectAll('line.y-grid')
      .data(scales.y.ticks())
      .enter()
      .append('line')
        .attr({
          'class': 'y-grid',
          x1: 0,
          x2: this.props.width,
          y1: function(d) { return scales.y(d); },
          y2: function(d) { return scales.y(d); }
        });

    this.svg.selectAll('line.x-grid')
      .data(scales.x.ticks())
      .enter()
      .append('line')
        .attr({
          'class': 'x-grid',
          x1: function(d) { return scales.x(d); },
          x2: function(d) { return scales.x(d); },
          y1: 0,
          y2: this.props.height
        });

    if (this.props.series.length === 1) {
      this.svg.append('linearGradient')
        .attr('id', 'area-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0).attr('y1', 0)
        .attr('x2', 0).attr('y2', this.props.height)
      .selectAll('stop')
        .data([
          {offset: '0%', color: '#DF3795', opacity: '1'},
          {offset: '70%', color: '#DF3795', opacity: '1'},
          {offset: '80%', color: '#DF3795', opacity: '0.5'},
          {offset: '100%', color: '#DF3795', opacity: '0'}
        ])
      .enter().append('stop')
        .attr('offset', function(d) { return d.offset; })
        .attr('stop-color', function(d) { return d.color; })
        .attr('stop-opacity', function(d) { return d.opacity; });
    }

    this.props.series.forEach(function(series0) {
      if (!series0.color) {
        series0.color = that.assignColor();
      }

      var line = d3.svg.line()
        .x(d => scales.x(d[series0.x]))
        .y(d => scales.y(d[series0.y]));

      if (that.props.series.length === 1) {
        var area = d3.svg.area()
          .x(d =>  scales.x(d[series0.x]))
          .y0(d => scales.y(d[series0.y]))
          .y1(that.props.height);

        that.svg.append('path')
          .datum(series0.data)
          .attr('class', 'area')
          .attr('d', area)
          .attr('clip-path', 'url(#rectClip)')
          .style('fill', 'url(#area-gradient)');

        that.svg.append('clipPath')
          .attr('id', 'rectClip')
          .append('rect')
            .attr('width', 0)
            .attr('height', that.props.height);

        that.svg.append('path')
          .datum(series0.data)
          .attr('class', 'line')
          .attr('d', line)
          .attr('clip-path', 'url(#rectClip)');

        d3.select('#rectClip rect')
          .transition().duration(1500)
            .attr('width', that.props.width);

        that.svg.selectAll(".dot")
          .data(series0.data)
          .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 5)
            .attr("cx", d => scales.x(d[series0.x]))
            .attr("cy", d => scales.y(d[series0.y]));

      } else {
        that.svg.append('path')
          .datum(series0.data)
          .attr('class', 'line')
          .style('stroke', series0.color)
          .attr('d', line);
      }
    });

    _.delay(() => that.bindPopup(scales), 1500);
  }

  assignColor() {
    return '#333';
  }

  bindPopup(scales) {
    const that = this,
          bisectDate = d3.bisector(function(d) { return d.date; }).left;
          focus = this.svg
            .append('g')
            .style('display', 'none');

    focus.append('line')
      .attr('class', 'focusLine');

    this.props.series.forEach(function(series0, i) {
      focus.append('circle')
        .attr('r', 8)
        .attr('class', 'circle focusCircleGlow series' + i);

      focus.append('circle')
        .attr('r', 4)
        .attr('class', 'circle focusCircle series' + i);
    });

    this.svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', this.props.width)
      .attr('height', this.props.height)
      .on('mouseover', () => {
        focus.style('display', null);
        that.popup.show();
      })
      .on('mouseout', () => {
        focus.style('display', 'none');
        that.popup.hide();
      })
      .on('mousemove', function() {
        var mouseDate = scales.x.invert(d3.mouse(this)[0]),
          popupData = {},
          maxY = 0,
          d, x, y;

        popupData.series = that.props.series.map((series0, index) => {
          var data = series0.data;
          var popupSeries = {
            name: series0.name,
            x: series0.x,
            y: series0.y,
            color: series0.color,
            data: null
          };

          var propX = series0.x,
            propY = series0.y;

          // returns the index to the current data item
          var i = bisectDate(data, mouseDate);

          var d0 = data[i - 1];
          var d1 = data[i];

          if (!d0) {
            d = d1;
          } else {
            d = mouseDate - d0[propX] > d1[propY] - mouseDate ? d1 : d0;
          }

          popupSeries.data = d;

          x = scales.x(d[propX]);
          y = scales.y(d[propY]);
          maxY = Math.max(maxY, y);

          focus.select('.focusCircle.series' + index)
            .attr('cx', x)
            .attr('cy', y);

          focus.select('.focusCircleGlow.series' + index)
            .attr('cx', x)
            .attr('cy', y);

          return popupSeries;
        });

        focus.select('.focusLine')
          .attr('x1', x).attr('y1', 0)
          .attr('x2', x).attr('y2', that.props.height);

        that.updatePopup(popupData, x, maxY);
      });
  }

  updatePopup(data, x, y) {
    const popupHeight = this.popup.getHeight(),
          popupWidth = this.popup.getWidth(),
          margin = 6,
          top = Math.max(y - popupHeight - margin, 0);

    let left = (x + margin);
    if (x + popupWidth > this.props.width) {
      left = x - popupWidth - margin;
    }

    this.popup.render(data);
    this.popup.position(top, left);
  }

  getScales() {
    const x = d3.time.scale().range([0, this.props.width]),
          y = d3.scale.linear().range( [this.props.height, 0] );

    let xDomain, yDomain;

    this.props.series.forEach(series0 => {
      const data = series0.data;

      let xDomain0 = d3.extent(data, d => d[series0.x]);

      if (!xDomain) {
        xDomain = xDomain0;
      } else {
        xDomain[0] = Math.min(xDomain[0], xDomain0[0]);
        xDomain[1] = Math.max(xDomain[1], xDomain0[1]);
      }

      let yDomain0 = d3.extent(data, d => d[series0.y]);
      if (!yDomain) {
        yDomain = yDomain0;
      } else {
        yDomain[0] = Math.min(yDomain[0], yDomain0[0]);
        yDomain[1] = Math.max(yDomain[1], yDomain0[1]);
      }
    });

    x.domain(xDomain);

    const yPadding = (yDomain[1] - yDomain[0]) * 0.2;

    if (yDomain[0] === yDomain[1]) {
      yDomain[0] = yDomain[0] - 10;
      yDomain[1] = yDomain[1] + 10;
    }

    y.domain([
      yDomain[0] - yPadding,
      yDomain[1] + yPadding
    ]);

    return {
      x: x,
      y: y
    };
  }

  getAxes(scales) {
    var axes = {
      x: d3.svg.axis()
          .scale(scales.x)
          .orient('bottom')
          .ticks(5),
      y: d3.svg.axis()
          .scale(scales.y)
          .orient('right')
          .ticks(4)
    };

    return axes;
  }

  calculateSize() {
    const box = this.element.node().getBoundingClientRect();

    this.props.width = box.width - this.props.margin.left -
      this.props.margin.right;

    this.props.height = Math.round(box.width /
      this.props.aspectRatio) - this.props.margin.top -
      this.props.margin.bottom;
  }

  appendSvg(element) {
    element.html('');

    return element
      .append('svg')
        .attr('width', this.props.width +
          this.props.margin.left +
          this.props.margin.right)
        .attr('height', this.props.height +
          this.props.margin.top +
          this.props.margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + this.props.margin.left +
            ',' + this.props.margin.top + ')');
  }

}

module.exports = Timeseries;
