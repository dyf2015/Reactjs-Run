import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, Switch, Row, Col, Alert, Button, Modal, Input } from 'antd';
import QueueAnim from 'rc-queue-anim';

import Pro from 'promise';
import * as sysActions from '../actions/Sys';

class Main extends React.Component {
	componentDidMount() {
		const {actions} = this.props;
		actions.getVersion();
		actions.getTokenStatus();
		actions.getCsMenu({type:'pc'});
		actions.getCsMenu({type:'mobile'});
		actions.getJoin();
		actions.setSuccess(false);
	}
	render() {
		const {version,tokenBol,visible,actions,canSubmit,loading,success,pcIsOpen,mobileIsOpen,orderFields,isJoin} = this.props;
		const {getFieldProps} = this.props.form;
		const formItemLayout = {
	      	labelCol: { span: 4 },
	      	wrapperCol: { span: 14 },
	    };
	    const formModelLayout = {
	      	labelCol: { span: 7 },
	      	wrapperCol: { span: 14 },
	    };
		return (
			<QueueAnim>
				<div className="Authdiv" key="a" >
				<Form horizontal>
					<Form.Item label="当前客户端版本 " {...formItemLayout}>
						<Row>
							<Col span="6">
								<div className="ant-text">{version}</div>
							</Col>
							<Col span="18">
								<Alert message="您当前的云商店客户端版本，客户端用于管理您的云商店应用程序，应用为私有部署。" type="info" />
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="加入泛微云计划" {...formItemLayout}>
						<Row>
							<Col span="6">
								<Button type="primary" size='small' onClick={()=>{actions.setModelVisible(true)}}>{isJoin ? "变更信息":"我要加入"}</Button>
								<Modal width={400} title={isJoin ? "变更信息" : "加入泛微云"} 
						            visible={visible}
						            onCancel={this.shutDown.bind(this)}
						            footer={[
							            <Button key="back" type="ghost" onClick={this.shutDown.bind(this)}>返 回</Button>,
							            <Button key="submit" type="primary" onClick={this.handleOk.bind(this)} disabled={!canSubmit} loading={loading}>提 交</Button>
									]}>
									<Form horizontal style={{"paddingTop":"10px"}}>
										<Row>
											<Col>
												<Form.Item required label="邮箱 ："  {...formModelLayout} hasFeedback> 
										        	<Input size="large" type="text" {...getFieldProps('mail',{
										        		validateTrigger: ['onBlur', 'onChange'],
													    rules: [{ validator: this.checkMail.bind(this)}]
													})} />
										        </Form.Item>
											</Col>
										</Row>
										<Row>
											<Col>
												<Form.Item required label="手机号 ："  {...formModelLayout} hasFeedback>
										        	<Input size="large" type="text" {...getFieldProps('mobile',{
										        		validateTrigger: ['onBlur', 'onChange'],
													    rules: [{ validator: this.checkPhoneNum.bind(this) }]
													})} />
										        </Form.Item>
											</Col>
										</Row>
										{success ? 
											<Row>
												<Col span={7}></Col>
												<Col span={14}>
													<Alert showIcon message={isJoin ? "修改成功！" : "提交成功！"} type="success" />
												</Col>
											</Row>
										: ""}
									</Form>
								</Modal>
							</Col>
							<Col span="18">
								<Alert message={<div>
									<p>为了更好的提升服务，我们邀请您一起加入“泛微云”计划。该计划可以完成以下功能：</p>
									<p>1、应用商店中应用功能查阅、申请试用、在线体验及下载</p>
									<p>2、应用商店中应用新版本更新提示、新版本下载</p>
									<p>3、应用商店中应用评论以及查阅评论</p>
									<p>其它服务陆续增加中...</p>
									<p>加入“泛微云”需要您的系统的服务器可以访问外网，我们不会收集您任何信息，仅做连接标识，如果您不能访问外网并且想加入计划，可登录此地址【http://e-cloudstore.com】提交您的注册或者申请意向。</p>
								</div>} type="info" />
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="应用商店访问" {...formItemLayout}>
						<Row>
							<Col span="6">
								{tokenBol?(<a className="antd-form-text" target="_blank" href="/cloudstore/system/GoToCloudstore.jsp?ip=e-cloudstore.com">一键登录/注册</a>):(<span>请进行初始化</span>)}
							</Col>
							<Col span="18">
								<Alert message={<div>
									<p>初始化配置通过之后，可开启一键注册并登录云商店，此链接管理员使用，管理员登录我们不会收集任何信息。</p>
								</div>} type="info" />
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="开启云商店PC版地址" {...formItemLayout}>
						<Row>
							<Col span="6">
								<Switch checked={pcIsOpen} onChange={this.onChangeTokenbinding.bind(this,'pc')} />
							</Col>
							<Col span="18">
								<Alert message={<div>
									<p>开启后将自动配置一个菜单到您的门户顶部菜单中，具体位置为【顶部菜单->商店】，如果您同意开放，贵公司所有账号均可登录云商店，登录时您的以下信息会被收集：</p>
									<p>单位、部门、岗位、姓名，我们承诺您的信息仅用来被登记注册，不会用作其它用途。</p>
								</div>} type="warning" />
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="开启云商店MOBILE版地址" {...formItemLayout}>
						<Row>
							<Col span="6">
								<Switch checked={mobileIsOpen} onChange={this.onChangeTokenbinding.bind(this,'mobile')} />
							</Col>
							<Col span="18">
								<Alert message={<div>
									<p>开启后将自动配置一个菜单到您的移动APP中，注意需要在emobile端重启，并手动开启菜单权限，具体位置【APP应用首页->商店】。</p>
								</div>} type="warning" />
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="泛微云客服联系方式（QQ）" {...formItemLayout}>
						<Row>
							<Col span="6">
								<div className="ant-form-text">2783225228</div>
							</Col>
							<Col span="18">
								<Alert message={<div>
									<p>如果您应用部署/使用、客户端使用或者加入“云计划”过程中遇到困难，请通过此QQ联系我们。</p>
								</div>} type="info" />
							</Col>
						</Row>
					</Form.Item>
				</Form>
				</div>
			</QueueAnim>
		)
	}
	shutDown(){
		const {actions,success} = this.props;
		actions.setModelVisible(false);
		success && actions.getJoin();
		actions.setSuccess(false)
	}
	handleOk(){
		const {actions} = this.props;
		const {getFieldsValue,validateFields} = this.props.form;
		validateFields((errors,valus)=>{
			if(!!errors){
				return
			}else{
				let params = getFieldsValue();
				actions.sendToJoin(params);
				setTimeout(()=>{actions.canSubmit(false)},500)
			}
		})
	}
	onChangeTokenbinding(type,bool){
		const {actions} = this.props;
        actions.setCsMenu({type:type,isOpen:bool});
//      let bol = checked;
//      let params = bol? {"config":0}:{"config":1};
//      actions.getVersion();
//      actions.getTokenStatus();
//      actions.GetCloudStoreStatus(params);
    }
	checkMail(rule,value,callback){
		checkMail(value) ? callback() : callback([new Error('请输入正确的邮箱')]) ;
	}
	checkPhoneNum(rule,value,callback){
		checkPhoneNum(value) ? callback() : callback([new Error('请输入正确的电话号码')]);
	}
}


const checkMail = value => {
	return /^([a-z0-9_\-\.]+)@(([a-z0-9]+[_\-]?)\.)+[a-z]{2,3}$/.test(value)
}

const checkPhoneNum = value => {
	return /^(1(([3,8][0-9])|(4[5,7])|(5[^4])|(7[0,6,7,8])))\d{8}$/.test(value)
}

Main.propTypes = {
    version: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    tokenBol: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    canSubmit: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    pcIsOpen: PropTypes.bool.isRequired,
    mobileIsOpen: PropTypes.bool.isRequired,
    isJoin: PropTypes.bool.isRequired,
}


function mapStateToProps(state) {
	//console.log("state:",state);
    return {
        version: state.sys.version,
        tokenBol: state.sys.tokenBol,
        visible: state.sys.modelVisible,
        orderFields: state.sys.orderFields,
        canSubmit: state.sys.canSubmit,
        loading: state.sys.loading,
        success: state.sys.success,
        pcIsOpen: state.sys.pcIsOpen,
        mobileIsOpen: state.sys.mobileIsOpen,
        isJoin: state.sys.isJoin,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(sysActions, dispatch)
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create({
	onFieldsChange: (props, fields) => {
		const orderFields = Object.assign({},props.orderFields,fields);
		props.actions.saveOrderFields(orderFields);
		const mail = orderFields["mail"] ? orderFields["mail"].value:"";
		const mobile = orderFields["mobile"] ? orderFields["mobile"].value:"";
		checkMail(mail) && checkPhoneNum(mobile) ? props.actions.canSubmit(true) : props.actions.canSubmit(false);
	},
	mapPropsToFields: props => {
		const {orderFields} = props;
		return orderFields;
  	}
})(Main))