import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const credentials = this.state;
    console.log(credentials);
    this.props.login(credentials);
  };

  render() {
    return (
      <div className="login-wrapper">
        <h3>LoginForm</h3>
        <div className="login-form">
          <form>
            <label>User:</label>
            <input
              name="username"
              type="text"
              value={this.state.username}
              placeholder="username..."
              onChange={this.handleChange}
            />
            <label>Password:</label>
            <input
              name="password"
              type="password"
              value={this.state.password}
              placeholder="password..."
              onChange={this.handleChange}
            />
            <button onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ loggedIn, loggingIn }) => ({
  loggedIn,
  loggingIn
});

export default connect(
  mapStateToProps,
  { login }
)(LoginForm);

// export default LoginForm;
