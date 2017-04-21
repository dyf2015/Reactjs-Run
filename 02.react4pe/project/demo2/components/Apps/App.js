import {Menu, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import {WeaMenu} from 'weaCom'


import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../../actions/Apps';

class Main extends React.Component {
	componentDidMount() {
		const {actions,params} = this.props;
        actions.getAppInfo(params.id);
    }
    render() {
    	let {app,actions} = this.props;
    	!!app && app.pl.sort((a,b)=>{return a.key - b.key});
        return (<div style={{backgroundColor:'#fff',width:'100%',height:'100%'}} className="testtesttest">
        	{!!app ? (
        		app.pl.length == 1  ?
        		<iframe src={app.pl[0].url} width="100%" height='100%' style={{border:0}}></iframe>
        		:
	            <div style={{width:'100%',height:'100%'}}>
	            	<Menu style={{ width: '15%',height:'100%',float:'left' }} mode="inline" onClick={this.handleClick.bind(this)} defaultSelectedKeys={['1']}>
	            		{
	            			app.pl.map(o=>{
		            			return <Menu.Item key={o.key} style={{height:50,lineHeight:'50px',fontSize:'14px'}}><Icon type='file' />{o.name}</Menu.Item>
		            		})
	            		}
	            	</Menu>
	            	{this.renderIframe()}
	            </div>
	            )
        	: ""}
        </div>)
    }
    renderIframe(){
    	const {appMenuKey,app} = this.props;
    	if(!!app){
    		return app.pl.map(o=>{
    			if(o.key == appMenuKey){
	    			return <iframe src={o.url} width="85%" height='100%' style={{border:0,float:'left'}}></iframe>
    			}
    		})
    	}
    	
    }
    handleClick(e){
    	const {actions} = this.props;
    	actions.setAppMenuKey(e.key);
    }
};

function mapStateToProps(state) {
    return {
        app: state.apps.appinfo.data,
        appMenuKey: state.apps.appMenuKey
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
)(Main)
