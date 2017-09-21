import React from 'react'
import { browserHistory } from 'react-router'
import classes from './NotFound.css'

const goBack = (e) => {
  e.preventDefault()
  return browserHistory.goBack()
}

export const NotFound = (props,context) => (
  <div className={classes.notFound}>
    <h4>Page not found!</h4>
    <p><a href='#' onClick={context.back}>&larr; Back</a></p>
  </div>
)
NotFound.contextTypes= {
  back: React.PropTypes.func.isRequired
}
export default NotFound
