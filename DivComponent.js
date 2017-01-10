import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'

const Component = React.Component

class DivComponent extends Component{
  render(){
    return '<div>test</div>'
  }
}

export default DivComponent;