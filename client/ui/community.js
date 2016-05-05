const $ = require('jquery'),
      Transition = require('semantic-ui-transition'),
      Modal = require('semantic-ui-modal'),
      React = require('react'),
      ReactDOM = require('react-dom'),
      Users = require('./community/users');

$.fn.transition = Transition;
$.fn.modal = Modal;

class Community extends React.Component {

  render() {
    return (
      <div id="wb-community" className="ui basic segment">
        <h2 className="ui pink header">
          Your Wedding Community
          <button id="add-user" onClick={this.addUser} className="ui right floated pink button">
            <i className="icon user"></i>
            Add User
          </button>
        </h2>
        <Users />
      </div>
    )
  }

  addUser() {
    $('#wb-modal-user').modal('show');
  }

}

module.exports = Community;
