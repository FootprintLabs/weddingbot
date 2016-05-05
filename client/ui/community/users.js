const React = require('react'),
      User = require('./user');

class Users extends React.Component {

  render() {
    const users = this.getUsers().map((user, i) => {
      return <User key={i} {...user} />
    });

    return (
      <div className="users">
        {users}
      </div>
    )
  }

  getUsers() {
    return [
      {
        name:   'Jim R. Vick',
        status: 'pending',
        rsvp:   'waiting',
        phone:  '484-594-3147',
        email:  'JimRVick@inbound.plus',
        address:  '2173 Franklee Lane Philadelphia, PA 19108',
      },
      {
        name:   'Lindsey D. Simmons',
        status: 'accepted',
        rsvp:   'yes',
        phone:  '713-247-8861',
        email:  'LindseyDSimmons@gmail.com',
        address:  '1036 Patterson Street Houston, TX 77002',
      },
      {
        name:   'Jeffery C. Barlow',
        status: 'declined',
        rsvp:   null,
        phone:  '978-362-4876',
        email:  'JefferyCBarlow@outlook.com',
        address:  '282 Hampton Meadows Lowell, MA 01852',
      }
    ];
  }

}

module.exports = Users;

