// We only need to import the modules necessary for initial render

import App from './App/index'
import NotFound from './NotFound/index'
import Login from '../login/index'
export const createRoutes = (store) => ({
  path: '/',
  component: App,
  indexRoute:Login,
  childRoutes:[
    NotFound
  ]
})

export default createRoutes
