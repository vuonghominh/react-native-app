import React, { Component } from 'react'
import {
  Button,
  Thumbnail,
  Text,
  Icon,
  View,
  Spinner
} from 'native-base'
import { observer } from 'mobx-react/native'
import { autoSubscriber } from 'firebase-nest'

class MatchList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: null
    }
  }
  static getSubs(props, state) {
    return props.stores.matches.subs()
  }
  subscribeSubs(subs, props, state) {
    const { matches } = props.stores
    const { unsubscribe, promise } = matches.subscribeSubsWithPromise(subs)
    this.setState({fetching: true}, () => {
      promise.then(() => {
        this.setState({fetching: false})
      })
    })
    return unsubscribe
  }
  markViewed(match) {
    this.props.stores.matches.markViewed(match[0])
  }
}

export default autoSubscriber(observer(MatchList))