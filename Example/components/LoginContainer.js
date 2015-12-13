'use strict';

var React = require('react-native');
var {AppRegistry, Navigator, StyleSheet,Text,View} = React;
var Login = require('./Login');
var Login2 = require('./Login2');
var {Router, Route, Schema, Animations, TabBar} = require('react-native-router-flux');


class LoginContainer extends React.Component {
    render(){
        return (
          <Router>
              <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
              <Route name="loginModal" component={Login} title="Login" schema="modal"/>
              <Route name="loginModal2" component={Login2} title="Login2"/>
          </Router>
        );
    }
}
module.exports = LoginContainer;
