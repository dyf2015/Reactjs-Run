import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from '../actions/Auth';

import { Row,Col,Breadcrumb,Icon,Table,Input,Button,Alert } from 'antd';


const InputGroup = Input.Group;

import QueueAnim from 'rc-queue-anim';

function handleSearch(record,value,actions) {
	actions.doKeySave(record.code,value);//applist getApplist
}

function reSizeHeight() {
//  jQuery(".Container").height(jQuery("body").height());
    document.querySelector('.Container').style.height = document.getElementsByTagName('body')[0].style.height;
}

function expandedRowRender(record) {
	//console.log(record);
	let pageArr = [];
	const pl = record.pl;
	for(let i=0;i<pl.length;i++) {
		const page = pl[i];
		pageArr[i] = <p>{page.name}地址：<a href={page.url} target="_blank">{page.url}</a></p>
	}
	return <div key={record.key}><p>应用详细描述：{record.desc}</p>{pageArr}</div>;
}
// handleSearch.bind(this,this.props.record,this.state.value)
class Save extends React.Component {

	render() {
		const {actions,record,auth} = this.props;
		return <InputGroup className="ant-search-input" style={{"width":"100%"}}>
			      <Input onChange={this.handleChange.bind(this)}  />
			      <div className="ant-input-group-wrap">
			        <Button className="ant-search-btn" onClick={handleSearch.bind(this,record,auth.value,actions)}>
			          <Icon type="save" />
			        </Button>
			      </div>
			    </InputGroup>;
	}
	handleChange(e) {
		// console.log("e",e);
		this.props.actions.changeValue(e.target.value)
	}
};



class Auth extends React.Component {

	componentDidMount() {
		const {actions} = this.props;
	  	actions.doAppListGet();
	}


	render() {
		const {auth,actions} = this.props;
		let datas = auth.applist;
		let that = this;
		const columns = [
			{title: '应用编码', dataIndex: 'code', key: 'code'},
			{title: '应用名称', dataIndex: 'name', key: 'name'},
			{title: '版本', dataIndex: 'version', key: 'version'},
			{title: '授权状态', dataIndex: 'keyDate', key: 'keyDate', render:function(text,record) {
					if(""==record.keyDate) 
						return <div>未授权</div>
					else if(record.keyDate.indexOf("9999")==0)
						return <div>永久授权</div>
					else
						return <div>授权至[{record.keyDate}]</div>
			}},
			{title: '授权码', dataIndex: 'key', key: 'keyStr', render:function(text,record) {
					//if(record.keyDate.indexOf("9999")==0)
						//return <div>{record.key}</div>
					return <div style={{"width":"400px"}}><Save record={record} auth={auth} actions={actions}/></div>
			}}
		];
		return (
			<QueueAnim>
				<div className="Authdiv" key="a" >
	   			<Table 
	   			  columns={columns}
				  dataSource={datas}
				  expandedRowRender={expandedRowRender}
				  
				  size="middle"
				  className="table" />
				 <Alert key="b" message="提示"
				    description="（1）可以直接在列表上直接提交licenseCode；（2）点击每行左边的加号可以查看应用描述及具体链接。"
				    type="info"
				    showIcon />
				</div>
	   		</QueueAnim>
	   	);
	}
};


Auth.propTypes = {
    // init: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth)