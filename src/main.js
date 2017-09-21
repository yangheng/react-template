import React from 'react'
import ReactDOM from 'react-dom'
import createHashHistory from 'history/lib/createHashHistory'
import { useRouterHistory } from 'react-router'
import syncHistoryWithStore from 'react-router-redux/lib/sync'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import '../src/sass/global.scss'

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = useRouterHistory(createHashHistory)({
  basename: __BASENAME__
})

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.___INITIAL_STATE__
const store = createStore({}, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
})

// ========================================================
// Developer Tools Setup
// ========================================================
/*if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}*/

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('container')

let render = (routerKey = null) => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer
      store={store}
      history={history}
      routes={routes}

    />,
    MOUNT_NODE
  )
}

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    module.hot.accept("./routes/index",()=>{
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    })
    //store.subscribe(renderApp);
  }
}

// ========================================================
// Go!
// ========================================================

const observer = new MutationObserver(function (MutationRecord) {
  console.log(MutationRecord)
})
observer.observe(document.body,{
  childList:true,
  attributes:true,
  characterData:true,
  subtree:true,
  attributeOldValue:true,
  characterDataOldValue:true
})
render()
