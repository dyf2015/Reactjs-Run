import {Menu, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import {WeaMenu} from 'weaCom'


import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../../actions/Apps';

let markIframe = [];

class Main extends React.Component {
	componentDidMount() {
		const {actions,params} = this.props;
        actions.getAppInfo(params.id);
    }
    render() {
    	let {app,actions} = this.props;
//  	let app = {pl:[{key:'2',name:'2',url:''},{key:'4',name:'4',url:''},{key:'3',name:'3',url:''},{key:'1',name:'1',url:''}]};
    	!!app && app.pl.sort((a,b)=>{return a.key - b.key});
//  	console.log(app);
    	const menus = !!app && app.pl.map((o)=>{
    		o.id = o.key;
    		o.icon = '/wui/theme/ecology8/page/images/menuicon/dark/portal01_wev8.png';
    		return o;
    	});
//		let iconType = ['home','setting','file','book','folder','appstore-o','exception'];
        return (<div style={{backgroundColor:'#fff',width:'100%',height:'100%'}} className="testtesttest">
        	{!!app ? (
        		app.pl.length == 1  ?
        		<iframe src={app.pl[0].url} width="100%" height='100%' style={{border:0}}></iframe>
        		:
	            <div style={{width:'100%',height:'100%'}}>
	            	<WeaMenu 
	            		style={{float:'left',width:"15%"}}
						mode="inline"
						defaultSelectedKey='1'
						datas={menus}
						onSelect={(key,data,type)=>{
							actions.setAppMenuKey(key);
							// app.pl.map((o)=>{
							// 	if(o.key==key) {
							// 		markIframe[o.key] = o.url;
							// 	}
							// 	jQuery("#if"+o.key).hide();
							// })
							// //console.log("key:",key," iframe:",markIframe[key]);
							// if(!jQuery("#if"+key).attr("src")) {
							// 	setTimeout(function() {
							// 		console.log("1sa");
							// 		jQuery("#if"+key).attr("src",markIframe[key] || "");
							// 		jQuery("#if"+key).show();
							// 	}, 250);
							// }
							// else {
							// 	jQuery("#if"+key).show();
							// }
						}}
						inlineWidth={'100%'}
						needSwitch={false}
						/>
					{this.renderIframe()}
	            </div>
	            )
        	: ""}
        </div>)
    }
	//
//	            	<Menu style={{ width: '15%',height:'100%',float:'left' }} mode="inline" onClick={this.handleClick.bind(this)} defaultSelectedKeys={['1']}>
//	            		{
//	            			app.pl.map(o=>{
//		            			return <Menu.Item key={o.key} style={{height:50,lineHeight:'50px',fontSize:'14px'}}><Icon type='file' />{o.name}</Menu.Item>
//		            		})
//	            		}
//	            	</Menu>
    renderIframe2(){
    	const {appMenuKey,app} = this.props;
    	//console.log("hehe",app,appMenuKey);
    	if(!!app){
			//console.log("app:",app);
    		return app.pl.map(o=>{
				// if(o.key == appMenuKey) 
				// 	markIframe[o.key] = o.url;
				//src={markIframe[o.key]||''}
    			return <iframe id={"if"+o.key} width="85%" height='100%' style={{border:0,float:'left',display:(o.key==appMenuKey?'inline':'none')}}></iframe>
				// if(o.key == appMenuKey){
	    		// 	return <iframe src={o.url} width="85%" height='100%' style={{border:0,float:'left'}}></iframe>
    			// }
    		})
    	}
    	
    }
	renderIframe(){
    	const {appMenuKey,app} = this.props;
    	//console.log("hehe",app,appMenuKey);
    	if(!!app){
    		return app.pl.map(o=>{
    			if(o.key == appMenuKey){
	    			return <iframe src={o.url} width="85%" height='100%' style={{border:0,float:'left'}}></iframe>
    			}
    		})
    	}
    	
    }
    handleClick(key){
    	//console.log("hehekey",key);
    	
		//if(o.key == appMenuKey) 
		//markIframe[key]
		//jQuery("#"+key).attr("")
		//console.log("key:",key," iframe:");

		//const {actions} = this.props;
    	//actions.setAppMenuKey(key);
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
