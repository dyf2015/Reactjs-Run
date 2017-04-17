import { Pagination, Tabs,Menu, Icon ,Row ,Col ,Button,Card } from 'antd';
import QueueAnim from 'rc-queue-anim';
//import Row from '../_antd1.11.2/row'
//import Col from '../_antd1.11.2/col'
//import Pagination from '../_antd1.11.2/pagination'
//import Tabs from '../_antd1.11.2/tabs'
//import Menu from '../_antd1.11.2/menu'
//import Button from '../_antd1.11.2/button'
//import Icon from '../_antd1.11.2/icon'

const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import AppImages from './AppImage';

import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../../actions/Apps';



class Apps extends React.Component {
    componentDidMount() {
        this.props.actions.getPartApp(0,15,{current:1,pageSize:15,});
    }
    render() {
        const {apps} = this.props;
        let params = apps.params;
     	let partapp = apps.partapp
     	const that = this;
        return (
            <div className="NAContainer">
            	<QueueAnim>
	                <div className="imgdiv" key="a">
	                    <div style={{width:'100%',overflow:'hidden'}}>
		                    {
		                        partapp && partapp.map(msg=>{
		                            return  (
		                            	<div key={msg.code} style={{width:'20%',float:'left'}}>
				                            <Card style={{width:'90%',height:80,padding:10,margin:'0 auto 20px',borderRadius:'8px',cursor:'pointer',overflow:'hidden',whiteSpace: "nowrap"}} bodyStyle={{ padding: 0 }} onClick={that.isClick.bind(that,msg)}>
											    <img style={{display:'inline-block',width:60,height:60,verticalAlign: 'middle'}} src={msg.imgUrl} />
											    <div style={{display:'inline-block',lineHeight:'30px',padding:'0 10px',verticalAlign: 'middle'}}>
											    	<h4 style={{overflow:"hidden",whiteSpace: "nowrap",textOverflow:"ellipsis"}}>{msg.name}</h4>
											    	<p>{msg.version}</p>
											    </div>
											</Card>
										</div>
									)
		                        })
		                    }
	                    </div>
	                    <div style={{width:'100%',padding:'5px 10px 10px'}}>
	                    	<Pagination showQuickJumper size='small' current={params.current} total={apps.count} pageSize={params.pageSize} onChange={this.handleChange.bind(this)}/>
	                	</div>
	                </div>
           		</QueueAnim>
            </div>
        )
    }
    isClick(msg){
    	window.open("/cloudstore/system/index.jsp#/"+msg.code+"/set");
    }
    handleChange(page){
        let params = this.props.apps.params;
        params.current = page;
        let pagesize = params.pageSize;
        let left = pagesize*(page-1);
        let right = page*pagesize
        this.props.actions.getPartApp(left,right,params);
    }
   
};

Apps.propTypes = {
    apps: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        apps: state.apps
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
)(Apps)
