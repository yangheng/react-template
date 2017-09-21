/**
 * Created by kukuchong on 2017/5/23.
 */
import React from "react"

import { Carousel,Row,Col } from 'antd';

import { connect } from "react-redux"

import LoginFrom from "./Form"

import "../sass/login.scss"

import bg1 from "./assets/bg1.jpg"

import bg2 from "./assets/bg2.jpg"

import bg3 from "./assets/bg3.jpg"

import logo from "./assets/logo.jpg"

class Login extends React.Component{

  render(){

    return(
      <div className="login">
        <div className="login_carousel">
          <Carousel effect="fade" autoplay={true} dots={false}>
            <div className="carousel_page">
              <img src={bg1} alt=""/>
            </div>
            <div className="carousel_page">
              <img src={bg2} alt=""/>
            </div>
            <div className="carousel_page">
              <img src={bg3} alt=""/>
            </div>
          </Carousel>
        </div>


        <div className="login_header">

          <Row>
            <Col span={4} offset={4}>
              <img src={logo} alt=""/>
            </Col>

          </Row>
        </div>

        <div className="login_footer">

          <Row>
            <Col span={8} offset="4">
              <p className="copyright">
                版权所有©2017-2025
              </p>
            </Col>
          </Row>

        </div>

        <div className="login_form">
          <p className="form_title">账号密码登录</p>
          <LoginFrom></LoginFrom>
        </div>

      </div>
    )
  }
}

export default connect()(Login)
