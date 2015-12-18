# react-native-router-flux

[![Join the chat at https://gitter.im/aksonov/react-native-router-flux](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aksonov/react-native-router-flux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A router/navigation component for React Native based on [exponentJS](https://github.com/exponentjs/ex-navigator).

## Main features

- Intuitive declarative syntax for specifying your entire router hierarchy in one place.
- Uses flux philosophy: Switch routes by calling Actions anywhere in your code&mdash; no need to pass down router state in props to all your components.
- Supports nested routers
- Built-in customizable Tab bar and navigation bar
- Schema components can define common properties to be used by multiple Routes.

 *Note: I am removing the following section temporarily because it is not clear at the moment how to link to flux/redux*
 
##~~Redux or other Flux support~~
~~The component doesn't depend from any Flux implementation and allows to intercept all route actions by adding Actions.onPush/onReplace/onPop handlers from your store(s).~~
~~If handler returns false route action is ignored. For Redux Don't forget to 'connect' your component to your store.~~


## Example
![launch](https://cloud.githubusercontent.com/assets/1321329/11692367/7337cfe2-9e9f-11e5-8515-e8b7a9f230ec.gif)

```javascript
var React = require('react-native');
var {AppRegistry, Navigator, StyleSheet,Text,View} = React;
var Launch = require('./components/Launch');
var Register = require('./components/Register');
var Login = require('./components/Login');
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

                <Route name="launch" component={Launch} initial={true} wrapRouter={true} title="Launch"/>
                <Route name="register" component={Register} title="Register"/>
                <Route name="home" component={Home} title="Replace" type="replace"/>
                <Route name="login" schema="modal">
                    <Router>
                        <Route name="loginModal" component={Login} title="Login" schema="modal"/>
                        <Route name="loginModal2" component={Login2} title="Login2"/>
                    </Router>
                </Route>
                <Route name="register2" component={Register} title="Register2"  schema="withoutAnimation"/>
                <Route name="tabbar">
                    <Router footer={TabBar} showNavigationBar={false}>
                        <Route name="tab1" schema="tab" title="Tab #1" >
                            <Router>
                                <Route name="tab1_1" component={TabView} title="Tab #1_1" />
                                <Route name="tab1_2" component={TabView} title="Tab #1_2" />
                            </Router>
                        </Route>
                        <Route name="tab2" schema="tab" title="Tab #2" component={TabView} />
                        <Route name="tab3" schema="tab" title="Tab #3" component={TabView} />
                        <Route name="tab4" schema="tab" title="Tab #4" component={TabView} />
                        <Route name="tab5" schema="tab" title="Tab #5" component={TabView} />
                    </Router>
                </Route>
            </Router>
        );
    }
}
```

components/Launch.js (initial screen)
```
'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, TouchableHighlight} = React;
var Button = require('react-native-button');
var Actions = require('react-native-router-flux').Actions;

class Launch extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>Launch page</Text>
                <Button onPress={()=>Actions.login({data:"Custom data", title:'Custom title' })}>Go to Login page</Button>
                <Button onPress={Actions.register}>Go to Register page</Button>
                <Button onPress={Actions.register2}>Go to Register page without animation</Button>
                <Button onPress={Actions.tabbar}>Go to TabBar page</Button>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});

module.exports = Launch;
```

## Getting started
1. `npm install react-native-router-flux --save`
2. At the top level in `index.ios.js` or `index.android.js`:
    * Start with a Router component. Its children can be Route, Schema or Router (for nested routers).
    * Define a Route for each app screen. Its `type` attribute is `push` by default, but you also could use `replace`, so the navigator will replace the current route with the new route. The `switch` type is used tab screens.
    * See below for list of props (required and optional)
    * If some of your Routes have common properties, you may define a Schema element and refer to it using the `schema` prop in your Route specifications.
3. In any screen in your app:
    * var {Actions} = require('react-native-router-flux');
    * Actions.ACTION_NAME(PARAMS) will call the appropriate action and optional params will be passed to the route. 
    * ACTION_NAME can be `pop`, or simply the name of a Route, as in `Actions.login`
    * PARAMS is a single object whose properties will be passed as props to the Route (??? Doesn't seem to work in Example)

## Props of router components:

### Router

* showNavigationBar (optional)
:    `true` or `false`

* hideNavBar (optional, deprecated)
:    inverse of showNavigationBar

* initialRoutes (optional) 
:    array of Route names used to initialize the route stack. e.g., `['login', 'launch']`. Defaults to a single element, the name of the first child Route, unless one of the Route children defines an `initial={true}` prop.

* footer (optional)
:     a component to be used as the footer on all routes within the router. Typically used as a Tab bar.

* header (optional)
:     a component to be used as the header on all routes within the router. Typically used as a custom navigation bar.

* navigationBarStyle (optional)
:     passed on to exNavigator to style the navigation bar.

* other
:     any other props are passed on to the header, footer and exNavigator

### Route

* name (required)
:  name of the route, which must be unique across all nested routers. Used as the Action name.

* component (optional)
: the React component class which will be created for this route. All route attributes will be passed to it.
Instead of defining a `component` you can alternatively define a single child of the route. This child could possibly be a nested Router.

* wrapRouter
: adds a Router child for this Route (and thus defines a nested navigator for the route). 

* other
: all other props will be passed to the scene class
