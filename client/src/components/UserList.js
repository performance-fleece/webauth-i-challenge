import React from 'react';
import { getUsers } from '../actions';
import { connect } from 'react-redux';

class UserList extends React.Component {
  async componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return <div>User List</div>;
  }
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(
  mapStateToProps,
  { getUsers }
)(UserList);
