'use strict';

var React = require('react-native');
var {AppRegistry, Navigator, StyleSheet,Text,View} = React;
var Launch = require('./components/Launch');
var Register = require('./components/Register');
var Login = require('./components/Login');
var LoginContainer = require('./components/LoginContainer');
var TabContainer = require('./components/TabContainer');
var Login2 = require('./components/Login2');
var {Router, Route, Schema, Animations, TabBar} = require('react-native-router-flux');
var Error = require('./components/Error');
var Home = require('./components/Home');
var TabView = require('./components/TabView');

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

export default class Example extends React.Component {
    render() {
        return (
            <Router hideNavBar={true}>
                <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
                <Schema name="withoutAnimation"/>
                <Schema name="tab" type="switch" icon={TabIcon} />

                <Route name="launch" component={Launch} initial={true} wrapRouter={true} title="Launch" hideNavBar={true}/>
                <Route name="register" component={Register} title="Register"/>
                <Route name="home" component={Home} title="Replace" type="replace"/>
                <Route name="login" schema="modal" component={LoginContainer}/>

                <Route name="register2" component={Register} title="Register2"  schema="withoutAnimation"/>
                <Route name="tabbar" component={TabContainer} />
            </Router>
        );
    }
}
