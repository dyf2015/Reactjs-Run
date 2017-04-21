import {Form,Row,Col,DatePicker,Input,Select,Button,Alert,Table} from 'antd';
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const Option = Select.Option;
//import Top from '../ComponentsV1/Top';
//import WeaInput4Hrm from '../ComponentsV1/Form/WeaInput4Hrm';

import {WeaTop,WeaInput4Hrm} from 'weaCom';

const createForm = Form.create;

function format(d,fmt) { //author: meizz 
    let o = {
        "M+": d.getMonth() + 1, //月份 
        "d+": d.getDate(), //日 
        "h+": d.getHours(), //小时 
        "m+": d.getMinutes(), //分 
        "s+": d.getSeconds(), //秒 
        "q+": Math.floor((d.getMonth() + 3) / 3), //季度 
        "S": d.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

let that = null;

let Main = React.createClass({
	getInitialState() {
		that = this;
        return {
            canGetMsgList:true,
            salaryTypeList:[],
            salaryMsgList:[],
            loadingMsgList:false,
            loadingMsgSend:false,
        }
    },
	render() {
		const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
		const columns = [{
		  title: '姓名',
		  dataIndex: 'userName',
		  key: 'userName',
		}, {
		  title: '部门',
		  dataIndex: 'depName',
		  key: 'depName',
		}, {
		  title: '公司',
		  dataIndex: 'comName',
		  key: 'comName',
		}, {
		  title: '导入者',
		  dataIndex: 'hrName',
		  key: 'hrName',
		  render(text, row, index) {
		  	if(""==text) {
		  		return <div>无</div>
		  	}
		  	else {
		  		return <div>{text}</div>
		  	}
		  }
		}, {
		  title: '短信内容',
		  dataIndex: 'msgContext',
		  key: 'msgContext'
		}, {
		  title: '工资条',
		  dataIndex: 'isSend',
		  key: 'isSend',
		  render(text, row, index) {
		  	if("-1"==text) {
		  		return <div>已发送</div>
		  	}
		  	else {
		  		return <div>未发送</div>
		  	}
		  }
		}, {
		  title: '短信',
		  dataIndex: 'isMsgSend',
		  key: 'isMsgSend',
		  render(text, row, index) {
		  	//console.log("isMsgSend:"+text);
		  	if("-1"==text) {
		  		return <div>已发送</div>
		  	}
		  	else if("-2"==text) {
		  		return <div>失败：无手机号</div>
		  	}
		  	else if("-3"==text) {
		  		return <div>失败：发送异常</div>
		  	}
		  	else {
		  		return <div>未发送</div>
		  	}
		  },
		  filters: [{
		    text: '已发送',
		    value: '-1'
		  }, {
		    text: '失败：无手机号',
		    value: '-2'
		  }, {
		    text: '失败：发送异常',
		    value: '-3'
		  },{
		    text: '未发送',
		    value: '1'
		  }],
		  filterMultiple: false,
		  onFilter(value, record) {
		    return record.isMsgSend===value;
		    //return record.address.indexOf(value) === 0;
		  },
		}];
		const pagination = {
		  total: this.state.salaryMsgList.length,
		  showSizeChanger: true
		};
		return ( 
		<div style={{"padding-top":"10px","padding-left":"15px","padding-right":"15px"}}>
		<WeaTop title="工资单短信"></WeaTop>
		<Form horizontal>
			<Row>
				<Col span="8">
				<Row style={{"margin-top":"10px"}}>
					<Col>
						<FormItem
					      label="日期："
					      labelCol={{ span: 6 }}
					      wrapperCol={{ span: 16 }}
					      required>
					      <MonthPicker format="yyyy-MM" defaultValue="" {...getFieldProps('date')} />
					    </FormItem>
					</Col>
				</Row>
				<Row>
					<Col>
						<FormItem
					      label="导入主键："
					      labelCol={{ span: 6 }}
					      wrapperCol={{ span: 16 }}
					      required>
					      <Select defaultValue="身份证" style={{ width: 120 }} 
					      		{...getFieldProps('mainKey',{
					      			initialValue:"idCard",
					      			valuePropName:"value",
					      		})}
					      		>
						      <Option value="idCard">身份证</Option>
						      <Option value="workCode">工号</Option>
						  </Select>
					    </FormItem>
					</Col>
				</Row>
				<Row>
					<Col>
						<FormItem
					      label="工资类型："
					      labelCol={{ span: 6 }}
					      wrapperCol={{ span: 16 }}
					      required>
					      <Select {...getFieldProps('type')}>
					      		{
					      			this.state.salaryTypeList.map(function(data) {
					      				return <Option value={data}>{data}</Option>
					      			})
					      		}
					      </Select>
					    </FormItem>
					</Col>
				</Row>
				<Row>
					<Col>
						<FormItem
					      label="人员选择："
					      labelCol={{ span: 6 }}
					      wrapperCol={{ span: 16 }}
					      required>
					      <WeaInput4Hrm name="createrIds" isMult={true} {...getFieldProps('userIds')} />
					    </FormItem>
					</Col>
				</Row>
				<Row>
					<Col>
						<FormItem
					      label="短信模板："
					      labelCol={{ span: 6 }}
					      wrapperCol={{ span: 16 }}
					      required>
					      <Input type="textarea" rows="3" 
					      {...getFieldProps('context',{
					      		initialValue:"[name]您[date]的工资详细为：应发合计[应发合计]元，实发合计[实发合计]元。",
					      })} 
					      defaultValue="[name]您[date]的工资详细为：应发合计[应发合计]元，实发合计[实发合计]元。" />
					    </FormItem>
					</Col>
				</Row>
				<Row>
					<Col>
						<FormItem
					      label="操作："
					      labelCol={{ span: 6 }}
					      wrapperCol={{ span: 16 }}>
					      <Button onClick={this.getMsgList} disabled={this.state.canGetMsgList||this.state.loadingMsgSend} loading={this.state.loadingMsgList}>生成短信</Button>
					      &nbsp;&nbsp;&nbsp;
					      <Button onClick={this.sendMsg} disabled={(this.state.loadingMsgList&&this.state.salaryMsgList.length==0)||this.state.loadingMsgList} loading={this.state.loadingMsgSend}>发送短信</Button>
					    </FormItem>
					</Col>
				</Row>
				<Row>
					<Col>
						<FormItem
					      label="说明："
					      labelCol={{ span: 6 }}
					      wrapperCol={{ span: 16 }}>
					       <Alert
						    message=""
						    description={<div>
						    			<p>（1）[name]等于姓名;</p>
								    	<p>（2）[date]等于年-月;</p>
								    	<p>（3）[应发合计]会直接取相应工资列</p>
								    	</div>}
						    type="info" />
					    </FormItem>
					</Col>
				</Row>
			</Col>
			<Col span="16" style={{"paddingTop":"5px","paddingLeft":"10px"}}>
				<Table dataSource={this.state.salaryMsgList} columns={columns} pagination={pagination} loading={this.state.loadingMsgList||this.state.loadingMsgSend} />
			</Col>
		</Row>
		</Form>
		</div>);
	},
	sendMsg(e) {
		e.preventDefault();
		const that = this;
		this.props.form.validateFields((errors, values) => {
		    if (!!errors) {
	        	console.log('Errors in form!!!');
		        return;
		    }
	        //console.log('Submit!!!');
	        //values.date = format(values.date,"yyyy-MM");
	        //console.log(values);
	        const params = values;
	        let paramsData = "";
    		for(var p in params) {
	        //console.log(typeof(params[p]));
	        //console.log(params[p]);
		        const type = typeof(params[p]);
		        if(type=="string") {
		            paramsData += p+"="+(typeof(params[p])=="undefined"?"":params[p])+"&";
		        } 
		    }
		    //console.log("paramsData:"+paramsData);
		    that.setState({
		    	loadingMsgSend:true
		    })
		    setTimeout(() => {
				$.ajax({
			        type:"POST",
			        url:"/cloudstore/app/no0000005/ControlServlet.jsp?action=Action_DoSalaryMsgSend",
			        data:paramsData,
			        success(datas) {
			        	console.log(datas);
			        	that.setState({
			        		salaryMsgList:datas,
			        		loadingMsgSend:false,
			        	})
			        },
			        error(datas) {
			        	that.setState({
			        		salaryMsgList:[],
			        		loadingMsgSend:false,
			        	})
			        },
			        dataType: "json"
			    });
			}, 500);
    	});
	},
	getMsgList(e) {
		e.preventDefault();
		const that = this;
		this.props.form.validateFields((errors, values) => {
		    if (!!errors) {
	        	console.log('Errors in form!!!');
		        return;
		    }
	        //console.log('Submit!!!');
	        //values.date = format(values.date,"yyyy-MM");
	        //console.log(values);
	        const params = values;
	        let paramsData = "";
    		for(var p in params) {
	        //console.log(typeof(params[p]));
	        //console.log(params[p]);
		        const type = typeof(params[p]);
		        if(type=="string") {
		            paramsData += p+"="+(typeof(params[p])=="undefined"?"":params[p])+"&";
		        } 
		    }
		    //console.log("paramsData:"+paramsData);
		    that.setState({
		    	loadingMsgList:true
		    })
		    setTimeout(() => {
				$.ajax({
			        type:"POST",
			        url:"/cloudstore/app/no0000005/ControlServlet.jsp?action=Action_DoSalaryMsgDatasGet",
			        data:paramsData,
			        success(datas) {
			        	that.setState({
			        		salaryMsgList:datas,
			        		loadingMsgList:false,
			        	})
			        },
			        error(datas) {
			        	that.setState({
			        		salaryMsgList:[],
			        		loadingMsgList:false,
			        	})
			        },
			        dataType: "json"
			    });
			}, 500);
    	});
	}
});

const options = {
	onFieldsChange:function(props,fields) {
		//console.log(props);
		if(fields.date) fields.date.value = format(fields.date.value,"yyyy-MM");
		that.props.form.validateFields((errors, values) => {
		    if(!!errors) {
	        	console.log('Errors in form!!!');
		        return;
		    }
	        //console.log(values);
	        const date = typeof(values.date)=="undefined"?"":values.date;
        	const mainKey = typeof(values.mainKey)=="undefined"?"":values.mainKey;
        	const type = typeof(values.type)=="undefined"?"":values.type;
        	const userIds = typeof(values.userIds)=="undefined"?"":values.userIds;
        	//console.log("date:"+date+" mainKey:"+mainKey);
        	//console.log("fields.date:"+fields.date+" fields.mainKey:"+fields.mainKey);
	        if(fields.date||fields.mainKey) {
	        	$.ajax({
			        type:"POST",
			        url:"/cloudstore/app/no0000005/ControlServlet.jsp?action=Action_DoSalaryTypesGet&date="+date+"&mainKey="+mainKey,
			        success(datas) {
			        	//console.log(datas);
			        	//console.log(that.props.form);
			        	that.props.form.setFieldsValue({type:""});
			        	that.setState({
			        		salaryTypeList:datas
			        	})
			        },
			        error(datas) {
			        	that.setState({
			        		salaryTypeList:[]
			        	})
			        	that.props.form.setFieldsValue({type:""});
			        },
			        dataType: "json"
			    });
	        }
	        if(date!=""&&mainKey!=""&&userIds!=""&&type!="") {
	        	that.setState({
					canGetMsgList:false
				})
	        }
	        else {
	        	that.setState({
					canGetMsgList:true
				})
	        }
    	});
	}
}

Main = createForm(options)(Main);

export default Main

//ReactDOM.render(<Main />,document.getElementById("container"));