'use strict';

var React = require('react-native');
var {AppRegistry, Navigator, StyleSheet,Text,View} = React;
var Login = require('./Login');
var Login2 = require('./Login2');
var {Router, Route, Schema, Animations, TabBar} = require('react-native-router-flux');
var TabView = require('./TabView');

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}
/* Hmmm. Schema can't parse correctly here. Just expand it. */
// <Schema name="tab" type="switch" icon={TabIcon} />


class TabContainer extends React.Component {
    render(){
      console.log("Props", this.props);
        return (
          <Router footer={TabBar} showNavigationBar={false}>
              <Route name="tab1"  type="switch" icon={TabIcon} title="Tab #1" >
                  <Router>
                      <Route name="tab1_1" component={TabView} title="Tab #1_1" />
                      <Route name="tab1_2" component={TabView} title="Tab #1_2" />
                  </Router>
              </Route>
              <Route name="tab2" type="switch" icon={TabIcon} title="Tab #2" hideTabBar={true} component={TabView} />
              <Route name="tab3" type="switch" icon={TabIcon} title="Tab #3" component={TabView}  />
              <Route name="tab4" type="switch" icon={TabIcon} title="Tab #4" component={TabView} />
              <Route name="tab5" type="switch" icon={TabIcon} title="Tab #5" component={TabView} />

          </Router>
        );
    }
}
module.exports = TabContainer;
