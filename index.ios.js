/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  NavigatorIOS,
  TouchableHighlight,
} from 'react-native';

let teams = ['Golden State Warriors',
            'Cleveland Cavaliers',
            'Toronto Raptors',
            'Oklahoma City Thunder',
            'Los Angeles Lakers',
            'Boston Celtics',
            'Houston Rockets',
            'Portland Trailblazers',
            'Memphis Grizzlies',
            'Chicago Bulls'];

class TeamList extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows(teams)
    }
  }

  navNext(teamName) {
    this.props.navigator.push({
      title: 'TeamDetail',
      component: TeamDetail,
      passProps: {teamName: teamName},
    })
  }
  render() {
    return (
      <View style={styles.content}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <TouchableHighlight
                                    onPress={this.navNext.bind(this, rowData)}>
                                    <View>
                                      <Text>{rowData}</Text>
                                      <View style={styles.separator} />
                                    </View>
                                  </TouchableHighlight>}
        />
      </View>
    )
  }
}

{/*<TouchableHighlight onPress={this.navNext.bind(this)}>
  <Text>Navigate to the next screen</Text>
</TouchableHighlight>*/}

class TeamDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.props.teamName}
        </Text>
      </View>
    )
  }
}

class nbaApp extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'NBA Teams',
          component: TeamList,
        }}
      />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
      color: 'black',
      backgroundColor: 'white',
      fontSize: 30,
      margin: 80
    },
  content: {
    flex: 1,
    paddingTop: 75,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  }
});

AppRegistry.registerComponent('nbaApp', () => nbaApp);
