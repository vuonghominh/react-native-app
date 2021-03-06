import React, { Component } from 'react'
import { Drawer, View } from 'native-base'
import { Navigator } from 'react-native'
import SideMenu from './components/sideMenu'
import SettingsStore from './stores/settingsStore'
import SplashScene from './scenes/splashScene'
import LoginScene from './scenes/loginScene'
import MatchScene from './scenes/matchScene'
import theme from './theme/base-theme'
import AuthStore from './stores/authStore'
import MatchStore from './stores/matchStore'
import PostStore from './stores/postStore'

const settings = new SettingsStore()
const authStore = new AuthStore()
const matchStore = new MatchStore()
const postStore = new PostStore()

export default class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: false,
      stores: {
        settings: settings,
        auth: authStore,
        matches: matchStore,
        posts: postStore
      },
      theme: theme
    }
  }

  toggleDrawer() {
    this.state.toggled ? this._drawer.close() : this._drawer.open()
  }

  openDrawer() {
    this.setState({toggled: true})
  }

  closeDrawer() {
    this.setState({toggled: false})
  }

  renderScene(route, navigator) {
    switch(route.title) {
      case 'Splash': {
        return <SplashScene {...route.passProps} navigator={navigator} />
      }
      case 'Login': {
        return <LoginScene {...route.passProps} navigator={navigator} />
      }
      case 'Match': {
        return <MatchScene {...route.passProps} navigator={navigator} />
      }
      default: {
        return null
      }
    }
  }

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.PushFromRight
  }

  render() {
    return (
      <Drawer 
        ref={(ref) => this._drawer = ref}
        type="displace"
        content={<SideMenu navigator={this._navigator} theme={this.state.theme} />}
        onClose={this.closeDrawer.bind(this)}
        onOpen={this.openDrawer.bind(this)}
        openDrawerOffset={0.2}
        >
          <Navigator
            ref={(ref) => this._navigator = ref}
            configureScene={this.configureScene.bind(this)}
            renderScene={this.renderScene.bind(this)}
            initialRoute={{
              title: "Splash",
              passProps: {
                stores: this.state.stores,
                toggleDrawer: this.toggleDrawer.bind(this),
                theme: this.state.theme
              }
            }}
            />
        </Drawer>
    )
  }
}