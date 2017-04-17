//****************************************
import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as InitActions from '../actions/Init';
// import InitStore from '../reducers/Init';
// const InitActions = InitStore.Actions;
//****************************************
import { Row,Col,Breadcrumb,Icon,Steps,Alert,Button } from 'antd';



const Step = Steps.Step;

import QueueAnim from 'rc-queue-anim';

function reSizeHeight() {
//  jQuery(".Container").height(jQuery("body").height());
    document.querySelector('.Container').style.height = document.getElementsByTagName('body')[0].style.height;
}

class Init extends React.Component {

	componentDidMount() {
		reSizeHeight();
	}

	render() {
		// console.log("render")
		//****************************************
		// const {msgsArr,msgsBtn} = this.state;
		const {init,actions} = this.props;
		let msgsArr = init.msgsArr;
		let msgsBtn = init.msgsBtn;
		//****************************************

		const steps = [{
		  title: '步骤一',
		  description: 'jar包、class文件自动检测'
		},{
		  title: '步骤二',
		  description: 'web.xml自动检测'
		},{
		  title: '步骤三',
		  description: 'web.xml自动配置和备份'
		},{
		  title: '步骤四',
		  description: '应用数据库脚本执行及检测'
		}, {
		  title: '步骤五',
		  description: '完成初始化并进行授权状态检测'
		}].map((s, i) => <Step key={i} title={s.title} description={s.description} />);
		//console.log("tesss1"); //<Steps current={msgsArr.length-1}>{steps}</Steps>
		//
		return (
			<QueueAnim>
				<div className="initdiv" key="a">
				<Steps current={msgsArr.length>0?(msgsArr.length-1):0}>{steps}</Steps>
				<div  style={{"marginTop":"10px"}}>
				<QueueAnim>
					{
						msgsArr.map(function(data,index) {
							return (
								<div style={{"marginTop":"10px"}} key={index}>
									<Alert message={data.title}
									    description={data.value}
									    type={data.type}
									    showIcon />
								</div>
							)
						})
					}
				</QueueAnim>
				</div>
				<div key="b" style={{"marginTop":"10px"}}>
				{msgsArr.length==0 && (<Button type="primary" size="large" onClick={()=>actions.doInit()}>开始自动检测</Button>)}
				{msgsArr.length==5 && (<Button type="primary" size="large" onClick={()=>actions.doInit()}>重新自动检测</Button>)}
				{msgsBtn && (<Button type="primary" size="large" onClick={()=>actions.doXmlConfig()}>确认进入第三步</Button>)}
				</div>
				</div>
			</QueueAnim>
		)
	}
};

//****************************************
//组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求
Init.propTypes = {
    // init: PropTypes.array.isRequired,
    init: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}
//mapStateToProps是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系
function mapStateToProps(state) {
    return {
        init: state.init
    }
}

//mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(InitActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Init)

// export default Init;
//****************************************