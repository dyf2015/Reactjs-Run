//import 'babel-polyfill'
//import 'fetch-polyfill'
//import 'fetch-ie8'
//require('es6-promise').polyfill();
//import 'es5-shim'
//import 'es6-promise'
import React from 'react'
import { render } from 'react-dom'
import {combineReducers,applyMiddleware} from 'redux';
import { Provider, connect } from 'react-redux'

//import Provider from 'react-redux/lib/components/Provider'
//import connect from 'react-redux/lib/components/connect'

import configureStore from './store/configureStore'
import rootReducer from './reducers/index'
import thunkMiddleware from 'redux-thunk/lib/index'


//const ReactRouter = require('react-router');
//let { Router, Route, Link, useRouterHistory, IndexRedirect  } = ReactRouter;
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import Link from 'react-router/lib/Link'
import useRouterHistory from 'react-router/lib/useRouterHistory'
import IndexRedirect from 'react-router/lib/IndexRedirect'

import { createHistory, useBasename, createHashHistory } from 'history'
//browserHistory
import { Breadcrumb, Menu, Icon } from 'antd';


import './style/index.css';

import Init from './components/Init';
import Auth from './components/Auth';
import AppDetail from './components/Apps/NewAppsDetail';
import RoleList from './components/RoleList';
import Role from './components/Role';
import NewApps from './components/Apps/NewApps';
import QueueAnim from 'rc-queue-anim';
import Home from './Home';
import Sys from './components/Sys';
import App from './components/Apps/App';
import AppWeaverMenu from './components/Apps/AppWeaverMenu';

const store = configureStore(
    rootReducer,
    applyMiddleware(//无需返回对象，只需返回一个带dispatch的函数
        thunkMiddleware
    )
);

store.subscribe(()=>{
	//console.log("redux,state监听：",store.getState());
});


const browserHistory = useRouterHistory(createHashHistory)({
   
});

//browserHistory.basename="/cloudstore/system";
function requireCredentials(nextState, replace, next) {
  // console.log("nextstate",nextState);
  const query = nextState.location.query;
  // console.log("querytitle",query.title);
  nextState.routes[2].breadcrumbName = query.id+"  "+query.name;
  next();//跳转函数
}

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
           <Router history={browserHistory}>
                <Route name="home" breadcrumbName="首页" path="/" component={Home} ignoreScrollBehavior>
                    <Route name="newapps" breadcrumbName="应用" path="newapps" component={NewApps} />
                    <Route name="init" breadcrumbName="初始配置" path="init" component={Init} />
                    <Route name="auth" breadcrumbName="授权管理" path="auth" component={Auth} />
                    <Route name="roleList" breadcrumbName="角色列表" path="roleList">
                        <IndexRedirect to="roleList" />
                        <Route name="roleList" breadcrumbName="角色列表" path="roleList" component={RoleList}/>
                        <Route name="roleAdd" breadcrumbName="新建角色" path="add" component={Role} />
                        <Route name="roleEdit" breadcrumbName="编辑角色" path=":id/edit" component={Role} />
                        <Route name="roleShow" breadcrumbName="查看角色" path=":id/show" component={Role} />
                    </Route>     
                    <Route name="sys" breadcrumbName="系统管理" path="sys" component={Sys} />
                </Route>
                <Route name="app" path=":id/set" component={App} />
                <Route name="app" path=":id/setwm" component={AppWeaverMenu} />
            </Router>
            </Provider>
        );
    }
};
//          <Route name="appApply" breadcrumbName=":kao" path=":id/show" component={AppDetail} onEnter={requireCredentials}/>




ReactDOM.render(<Root />, document.getElementById('container'));

