const React = require('react'),
      ReactDOM = require('react-dom'),

class Community extends React.Component {

  render() {
    return (
      <div id="wb-community" className="ui basic segment">
        <h2 className="ui pink header">Your Wedding Community</h2>
          <button id="add-user" className="ui right floated pink button">
            <i className="icon user"></i>
            Add User
          </button>
        <i className="ui chevron pink left icon"></i>
        <i className="ui chevron pink right icon"></i>
      </div>
    )
  }
}

module.exports = Community;
