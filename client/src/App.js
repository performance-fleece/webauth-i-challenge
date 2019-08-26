import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <header>Welcome to WebAuth-I</header>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(
  mapStateToProps,
  {}
)(App);
