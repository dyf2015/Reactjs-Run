import {Menu, Tabs ,Row,Col,Pagination,Button,Icon,Tag} from 'antd';
//import Row from '../_antd1.11.2/row'
//import Col from '../_antd1.11.2/col'
//import Pagination from '../_antd1.11.2/pagination'
//import Tabs from '../_antd1.11.2/tabs'
//import Menu from '../_antd1.11.2/menu'
//import Button from '../_antd1.11.2/button'
//import Icon from '../_antd1.11.2/icon'
//import Tag from '../_antd1.11.2/tag'

import AppImages from './AppImage';
import Pro from 'promise';
const TabPane = Tabs.TabPane;
import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect,ReactRouter } from 'react-redux'
import * as AppActions from '../../actions/Apps';


class AppDetail extends React.Component {
    constructor(props) { 
        super(props);
     }
   
    componentDidMount() {
        this.props.actions.getAppInfo(this.props.params.id);  
    }


    render() {
        let taht = this;
        let {appinfo} = this.props;
        return(
            <div>             
                <div className="tabDiv">
                    <div className="tabStyle">
                        {appinfo&&appinfo.length!=1?
                                    <div>
                                        <Menu className="test" mode="horizontal" selectedKeys={appinfo&&appinfo.key?appinfo.key:""} onClick={this.handleClick.bind(this)}>
                                        {
                                            appinfo.data&&appinfo.data.pl.map(function(msg){
                                                return(
                                                    <Menu.Item  key={msg.key} ><Icon type="appstore-o" />{msg.name}</Menu.Item>             
                                                )
                                            })
                                        }
                                        </Menu>
                                    </div>
                                    :
                                    <span></span>
                        }
                        <div style={{height:20,backgroundColor:"white"}}></div>
                        <iframe  style={{border:0}} id="iframe" border={0} frameborder="no" scrolling="auto" width="100%" height="800px" src={appinfo&&appinfo.url?appinfo.url:""}></iframe>
                    </div>
                </div>
            </div>
        )  
    }
    handleClick(e){
        this.props.actions.getAppInfo(this.props.params.id,e.item.props.index,e.key);
    }
}
    

AppDetail.propTypes = {
    // init: PropTypes.array.isRequired,
    appinfo: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        appinfo: state.apps.appinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppDetail)
