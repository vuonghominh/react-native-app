import React, { Component } from 'react'
import {
  Container,
  Header,
  Content,
  Icon,
  View,
  Button,
  Title,
  Text,
  InputGroup,
  Input,
  Thumbnail,
  Spinner
} from 'native-base'
import ImagePicker from 'react-native-image-picker'

const options = {
  title: 'Select Image',
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

export default class PostScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      text: '',
      unloading: false
    }
  }
  componentDidMount() {
    ImagePicker.showImagePicker(options, (res) => {
      this.setState({image: {uri: res.uri}, data: res})
    })
  }
  updateText(text) {
    this.setState({text})
  }
  post() {
    const { posts } = this.props.store
    this.setState({uploading: true})
    posts.postImage(this.state.data, (snap) => {
      posts.add(this.state.text, snap.downloadURL)
      this.setState({uploading: false})
      this.props.navigator.pop()
    })
  }
}