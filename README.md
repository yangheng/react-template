# react-template

> react-template powered by [React.js](http://facebook.github.io/react/) and [Webpack](http://webpack.github.io/)


### Features

&nbsp; &nbsp; ✓ Modern JavaScript syntax ([ES2015](http://babeljs.io/docs/learn-es2015/)+) via [Babel](http://babeljs.io/)<br>
&nbsp; &nbsp; ✓ Modern CSS/SCSS syntax (CSS3+) via [PostCSS](https://github.com/postcss/postcss)<br>
&nbsp; &nbsp; ✓ Application state management via [Redux](http://redux.js.org/)<br>
&nbsp; &nbsp; ✓ Routing and navigation via [React Router](https://github.com/reactjs/react-router), [React Router Redux](https://github.com/reactjs/react-router-redux), [History](https://github.com/mjackson/history)<br>
&nbsp; &nbsp; ✓ Modular styles via [CSS Modules](https://github.com/css-modules/css-modules)<br>
&nbsp; &nbsp; ✓ [Code-splitting](https://github.com/webpack/docs/wiki/code-splitting) and async chunk loading<br>
&nbsp; &nbsp; ✓ Hot Module Replacement ([HMR](https://webpack.github.io/docs/hot-module-replacement.html)) /w [React Hot Loader](http://gaearon.github.io/react-hot-loader/)<br>
&nbsp; &nbsp; ✓ Bundling and optimization with [Webpack](https://webpack.github.io/)<br>
&nbsp; &nbsp; ✓ Cross-device testing with [Browsersync](https://browsersync.io/)<br>
&nbsp; &nbsp; ✓ IE8 Support (Need to build after)
### Directory Layout

```shell
.
├── /build/                     # 打包之后文件的目录
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/
    ├── /member/             # 会员中心
         |——／finance／       #财务管理
            │── /recharge/    #充值
            │── /detail/      #充值明细
            │── /total/       #汇总
            │── /getcharge/   #提现
         |——/layout/          #通用模板
    │    |——/order/           #订单管理

         |——/team/            #团队管理
         |——/information/     #信息管理
         |——/profile/         #个人信息
    ├── /components/            # 各个模块   
    │   ├── /Users/             # 用户管理模块
        ├── /Institution/       # 机构管理
            │── /device/        # 设备管理
            │── /activity/      # 活动管理
            │── /customer/      # 客服管理
            │── /users/         # 用户管理
        ├── /Copyright/         # 版权
        ├── /Order/             # 工单
        ├── /Source/            # 资源管理
        ├── /Settings/          # 系统参数
            │── /role/        # 角色管理
            │── /dictionary/  # 数据字典  
            │── /system/      # 系统设置
            │── /backup/      # 资源备份
        ├── /Message/          # 消息
                 
    │   └── /Home               # 默认管理用户首页
             
    ├── /containers/            # ROOT容器
    ├── /routes/                # 路由
    │   ├── /NotFound/          # Error page
    │   └── /...                # etc.
    ├── /static/                # 开发调试时服务器运静态资源访问目录
    ├── /store/                 # 首屏加载所需的配置
├── /test/                      # Unit and integration tests
├── /tools/                     # Build automation scripts and utilities
│── LICENSE.txt                 # Licensing information
│── package.json                # The list of project dependencies and NPM scripts
└── README.md                   # Project overview / getting started guide
```

### 系统State结构如下
```javascript
  state={
    global:{
      loading:false,
      online:false, 
      
    },
    profile:{   //当前的登录用户相关数据
      role:'',
      username:'',
      message:10,
    },
    summary:{
    
      users:{ //首页机构数据
      
      },
      institutionin:{ //首页机构数据
              
              },
      source:{ //首页资源信息
              
              },
      activity:{ //首页活跃数据
              
              },
              
      dynamic:{ //动态数据
      
      }
    
    },
    users:[ //所有用户数据
      {
        "username":"胡斌",
        "account":"1344453222",
        "role":"编辑",
        "createTime":"2017-4-24 9:00",
        "loginTime":"2017-5-15 8:00",
        "loginNum":8
      },//...
    ],
    
  }

```

### 分支管理

```

master :  主分支,用来发布分支,不轻易更改,只从develop 分支上合并

develop : 开发分支,用来开发调试的分支,正常来说,开发提交的代码都提交到此分支

model—XXX : 模块开发小分支，从 develop 上创建的分支，用来开发小的模块，最终合并到develop分支上

fix-XXX : 紧急修复分支，从 master 上创建的分支,用来紧急修复线上的bug，最终合并到master上


                                    model-XXXX
                                ___________
                    develop    /           \
                 _____________/_____________\_______
                /                                   \ 
               /                                     \
   master ——————————————————————————————————————————————————
                                 \                   / 
                                  \_________________/                 
                                      fix-XXX
   
   
```


### Getting Started

Just clone the repo, install Node.js modules and run `npm start`:

```shell
$ git clone git@develop.oicp.io:yangheng/DigitalReading.git DigitalReading
$ cd DigitalReading
$ npm install           # Install project dependencies listed in package.json
$ npm start             # Build and launch the app, same as "node tools/start.js"
```

**NODE**: Make sure that you have [Node.js](https://nodejs.org/) v6 installed on your local machine.

### IE8 Support Version

&nbsp; &nbsp; react <= 0.14.8<br>
&nbsp; &nbsp; react-dom <= 0.14.8<br>
&nbsp; &nbsp; react-router <= 2.3.0<br>
&nbsp; &nbsp; webpack = 1.15.0

### How to Test

The unit tests are powered by [chai](http://chaijs.com/) and [mocha](http://mochajs.org/).

```shell
$ npm test
```


### How to Build

```shell
$ npm run build         # Build production release 
```




### 参考相关项目

* [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — Isomorphic web app boilerplate (Node.js, React, GraphQL, Webpack, CSS Modules)
* [Babel Starter Kit](https://github.com/kriasoft/babel-starter-kit) — JavaScript library boilerplate (ES2015, Babel, Rollup, Mocha, Chai, Sinon, Rewire)
* [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit) — Get started with React, Redux, and React-Router!
* [Redux](http://redux.js.org/) — Redux is a predictable state container for JavaScript apps.
* [React Router](https://github.com/reactjs/react-router) — Declarative routing for React
* [React Router Redux](https://github.com/reactjs/react-router-redux) — Ruthlessly simple bindings to keep react-router and redux in sync
* [History](https://github.com/mjackson/history) — HTML5 History API wrapper library

### Learn More

* [Getting Started with React.js](http://facebook.github.io/react/)
* [Getting Started with GraphQL and Relay](https://quip.com/oLxzA1gTsJsE)
* [React.js Questions on StackOverflow](http://stackoverflow.com/questions/tagged/reactjs)
* [React.js Discussion Board](https://discuss.reactjs.org/)
* [Learn ES6](https://babeljs.io/docs/learn-es6/), [ES6 Features](https://github.com/lukehoban/es6features#readme)


### License

This source code is licensed under the MIT license found in the
[LICENSE.txt](https://github.com/jun0205/react-static-boilerplate/blob/master/LICENSE.txt) file.
