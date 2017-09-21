/**
 * Created by kukuchong on 2017/5/26.
 */
import React from "react"
import { browserHistory } from 'react-router'
import { digitalGetStorage } from '../../store/actions'
import { loginUrl } from '../../api'

class App extends React.Component{

  constructor(props){
    super(props)
    this.routerWillLeave = this.routerWillLeave.bind(this)
    this.fetchData = this.fetchData.bind(this);
    window.fetchData = this.fetchData
  }
  componentDidMount() {
    const { route } = this.props
    const { router } = this.context
    router.setRouteLeaveHook(route, this.routerWillLeave)
  }

  fetchData(url='',config,callback){
    switch (typeof config){
      case 'function':
        callback= config;
        var body = {}, method = 'get';
        break;
      case 'object':
        var { body , method } = Object.assign({method:'get'},...config);
            break;
      case 'undefined':
        var body = {}, method = 'get';
            break;
    }
    function serialize(obj){
      if(obj===undefined||obj=='') return "";
      let result = []
      for(let key in obj){
        result.push(key+"="+obj[key]+"&")
      }
      return result.join("&").slice(0,-1)
    }

    function handleResponse(response) {
      switch (response.headers.get("content-type")){
        case 'application/json;charset=UTF-8':

        case 'application/json':
          return response.json()
          break;

        case 'text/xml':
          return response.text();
        case 'file':
          return response.blob();
      }
    }

    let myHeaders = new Headers();


    if(url != loginUrl ){
      let token =digitalGetStorage('token');
      if(token){
        myHeaders.append('authentication',token)
      }
    }

    let options = {
      method:method.toUpperCase(),
      cache:'default'
    }

    switch (method.toUpperCase()){
      case 'GET':
            url+='?'+serialize(body);
            myHeaders.append('Content-Type','application/json');
            break;
      case 'POST':
            options.body=serialize(body);
            myHeaders.append('Content-Type','application/x-www-form-urlencoded');
            break
    }

    options.headers=myHeaders

    fetch(url,options).then(response=>{
      switch (response.status){
        case 404:
              this.context.router.push('404');
              break;
        case 510:
              this.context.router.push('login');
              break;
        case 500:
              this.context.router.push('login');
              break;
        default: return handleResponse(response)

      }
    }).then(data=>{
      callback(data);
    })
  }

  getChildContext(){
    return {
      fetch: this.fetchData,
      back: this.goBack
    }
  }
  routerWillLeave(nextlocation){
    console.log(nextlocation)
  }
  goBack(e){
    e.preventDefault()
    return browserHistory.goBack()
  }

  render(){
    let {children} = this.props;
    return(
      <div>
        {children}
      </div>
    )
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}
App.childContextTypes = {
  fetch: React.PropTypes.func.isRequired,
  back: React.PropTypes.func.isRequired
}
export default App
