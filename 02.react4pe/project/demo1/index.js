import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import useRouterHistory from 'react-router/lib/useRouterHistory'

import { createHistory, useBasename, createHashHistory } from 'history'

import Home from './components/Home'
import Salary from './components/Salary'
import SalaryMobile from './components/SalaryMobile'
import SalarySet from './components/SalarySet'
import SalaryMsg from './components/SalaryMsg'
import './index.css'

const history = useRouterHistory(createHashHistory)();

class Root extends React.Component {
    render() {
        return (
           <Router history={history}>
                <Route name="/" breadcrumbName="入口" path="/" component={Home} />
                <Route name="show" breadcrumbName="工资查询" path="/show" component={Salary} />
                <Route name="mobile" breadcrumbName="移动工资查询" path="/mobile" component={SalaryMobile} />
                <Route name="set" breadcrumbName="工资设置" path="/set" component={SalarySet} />
                <Route name="msg" breadcrumbName="工资短信" path="/msg" component={SalaryMsg} />
           </Router>
        )
    }
}

//react
//react-router

render(<Root />,document.getElementById("container"))