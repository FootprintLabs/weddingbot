const React = require('react'),
      _ = require('lodash');

class User extends React.Component {

  render() {
    const { name, status, rsvp } = this.props;

    const statusColor = this.getStatusColor();
    const className = 'user ui ' + statusColor + ' segment';

    return (
      <div className={className}>
        <div className="ui three column grid stackable">
          <div className="column">
            <h2 className="ui header">{this.props.name}</h2>
            <h5 className={'ui ' + statusColor + ' header sub-title'}>
              {_.capitalize(this.props.status)}
            </h5>
            <h5 className="ui header sub-title">
              {this.props.rsvp ?
                  'RSVP: ' + _.capitalize(this.props.rsvp) : ''}
            </h5>
          </div>
          <div className="column">
            <table className="ui very basic table unstackable">
              <tbody>
                <tr>
                  <td><strong>Phone:</strong></td>
                  <td>{this.props.phone}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{this.props.email}</td>
                </tr>
                <tr>
                  <td><strong>Address:</strong></td>
                  <td>{this.props.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="column">
            <table className="ui very basic table unstackable">
              <tbody>
                <tr>
                  <td><strong>Your Relationship:</strong></td>
                  <td>Friend</td>
                </tr>
                <tr>
                  <td><strong>% Likely to Attend:</strong></td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td><strong>Other Information:</strong></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  getStatusColor() {
    const colors = {
      pending:  'orange',
      accepted: 'green',
      declined: 'red',
    }

    return colors[this.props.status];
  }

}

module.exports = User;
