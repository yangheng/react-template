/**
 * Created by kukuchong on 2017/5/24.
 */
import { Form, Input, Button, Checkbox, Row, Col,Alert, Select } from 'antd';
import {Link} from "react-router"
import {loginUrl} from '../api/index'
import React from "react"
const FormItem = Form.Item;
import { digitalSetStorage } from "../store/actions"
class LoginFrom extends React.Component {

  constructor(props,context){
    super(props,context)
    this.state={
      check:true,
      response:{
        message:'',
        type:'',
        show:false
      }
    }
    this.checkboxChange = this.checkboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeAlert = this.closeAlert.bind(this)
  }
  closeAlert(){
    this.setState({response:{
      message:'',
      type:'',
      show:false
    }})
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log(errors);
      }else{
        this.context.fetch(loginUrl,{method:'post',body:Object.assign({},values,{code:'ins_2'})},(res)=>{
          if(res.success){
            digitalSetStorage({'token':res.data.token},this.state.check)
            this.context.router.push('home');
          }else{
            this.setState((preState,nextProps)=>{
              return Object.assign({},preState,{response:{type:'error','message':res.reason,show:true}})
            })
          }


        })

      }

    });
  }



  checkboxChange({target}){

    this.setState({
      check:!target.checked
    })

  }

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const { response } = this.state

    const username = getFieldProps('username',{
      validate: [
        {
          rules: [
            { required: true, message: '用户名都没有,你逗我?' }
          ],
          trigger: 'onBlur'
        }
      ]

    })

    const password = getFieldProps('password',{
      validate: [
        {
          rules: [
            {
              required: true, min: 4 ,message: "密码都在4位以上..."
            }
          ],
          trigger: ['onChange','onBlur']
        }
      ]

    })



    return (
      <Form >
        <FormItem>
          <Input placeholder="请输入账户名"  {...username}/>
        </FormItem>


        <FormItem>
          <Input type="password" {...password} placeholder="请输入密码"/>
        </FormItem>

        <FormItem>
          <Col span={8}>
            <Checkbox checked={this.state.check} onChange={this.checkboxChange} >记住我</Checkbox>
          </Col>

          <Col span={8} offset={8}>
            <Link to="/forget">忘记密码?</Link>
          </Col>

        </FormItem>
        {
          response.show?<Alert
            message={response.message}
            onClose={this.closeAlert}
            type={response.type}
            closable={true}
            showIcon
          />:""
        }


        <Row>
          <Col span="10" offset="2" >
            <Button type="primary" size="large" onClick={this.handleSubmit} htmlType="submit">登录</Button>
          </Col>
          <Col span="10" offset="2">
            <Link to="/register">
              <Button type="dashed">注册</Button>
            </Link>
          </Col>
        </Row>

      </Form>
    );
  }
}

LoginFrom.contextTypes = {
  fetch: React.PropTypes.func.isRequired,
  router:React.PropTypes.object.isRequired
}
LoginFrom = Form.create()(LoginFrom);

export default LoginFrom
