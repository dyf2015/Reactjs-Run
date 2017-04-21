import { DatePicker,Button,Icon,Input,Form,Row,Col,Tabs,Upload,message,Alert,Spin,Select,Table } from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
//import Top from '../ComponentsV1/Top';
import {WeaTop} from 'weaCom';
const Option = Select.Option;

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

const Main = React.createClass({
	getInitialState() {
		return {
			showUpload:false,
			loading:false,
			date:"",
			type:"",
			mainKey:"idCard",
			msgArr:null,
			datas:null,
			date1:"",
		};
	},
	getDatas(value) {
		let that = this;
		this.setState({
			loading:true,
		})
		$.ajax({
	        type:"POST",
	        url:"/cloudstore/app/no0000005/ControlServlet.jsp?action=Action_DoSalaryDatasGet&isHr=0&date="+value,
	        success(datas) {
	        	//console.log(datas);
	        	//console.log(datas.length);
	        	message.success("数据获取成功！");
	        	that.setState({
	        		datas:datas,
	        		loading:false,
	        		date1:value,
	        	});
	        },
	        error(datas) {
	        	message.success("数据获取失败！");
	        	that.setState({
	        		loading:false,
	        	});
	        },
	        dataType: "json"
	    });
	},
	handleChange(info) {
		//console.log("info:");
		//console.log(info.file.response);
		//console.log("msg");
		this.setState({
			msgArr:info.file.response,
			loading:false,
		});
	},
	setValue(name,e) {
		if(name=="date") {
			const date = format(e,"yyyy-MM");
			const type = this.state.type;
			const showUpload = date!=""&&type!=""&&date!=null&&type!=null;
			this.setState({
				date:date,
				showUpload:showUpload,
			});
			//console.log("name:"+name);
			//console.log("value:"+format(e,"yyyy-MM"));
		}
		if(name=="type") {
			const date = this.state.date;
			const type = e.target.value;
			const showUpload = date!=""&&type!=""&&date!=null&&type!=null;
			this.setState({
				type:type,
				showUpload:showUpload,
			});
			//console.log("name:"+name);
			//console.log("value:"+e.target.value);
		}
		if(name=="mainKey") {
			//console.log("select value:"+e);
			this.setState({
				mainKey:e
			});
		}
		if(name=="date1") {
			const date = format(e,"yyyy-MM");
			this.getDatas(date);
			//console.log("name:"+name);
			//console.log("value:"+format(e,"yyyy-MM"));
		}
		//console.log("value:"+e.target.value);
	},
	render() {
		//console.log("action:/cloudstore/app/NO0000005/ControlServlet.jsp?action=Action_DoSalaryImport&date="+this.state.date+"&type="+this.state.type);
		//console.log("loading:"+this.state.loading);
		return (
				<div style={{"padding-top":"10px","padding-left":"15px","padding-right":"15px"}}>
	               <WeaTop title="工资导入"></WeaTop>
	               <div style={{"padding-top":"8px"}}>
				   <Tabs tabPosition="left">
				   <TabPane tab="导入" key="0">
						{this.impRender()}
				   </TabPane>
	               <TabPane tab="维护" key="1">
	               		{this.dataRender()}
	               </TabPane>
	               </Tabs>
	               </div>
               </div>
        )
              
	},
	impRender() {
		let that = this;
		const fileProps = {
			name:"excelFile",
			action: "/cloudstore/app/no0000005/ControlServlet.jsp?action=Action_DoSalaryImport",
			data:this.state,
			onChange: this.handleChange,
			beforeUpload: function (file) {
				//console.log(file.type);
				/*
				const isJPG = file.type === 'image/jpeg';
				if (!isJPG) {
					message.error('只能上传 JPG 文件哦！');
				}
				return isJPG;
				*/
				that.setState({
					loading:true
				})
				return true;
			}
		};
		return (
			<Form horizontal>
				<Row style={{"margin-top":"10px"}}>
					<Col span="8">
						<FormItem
					      label="日期："
					      labelCol={{ span: 6 }}
					      wrapperCol={{ span: 16 }}
					      required>
					      <MonthPicker format="yyyy-MM" defaultValue="" onChange={this.setValue.bind(this,'date')} />
					    </FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="8">
						<FormItem
					      label="工资类型："
					      labelCol={{ span: 6 }}
					      wrapperCol={{ span: 16 }}
					      required>
					      <Input onChange={this.setValue.bind(this,'type')} />
					    </FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="8" style={{"text-align":"left"}}>
						<FormItem
					      label="导入主键："
					      labelCol={{ span: 6 }}
					      wrapperCol={{ span: 16 }}
					      required>
					      <Select defaultValue="身份证" style={{ width: 120 }} onChange={this.setValue.bind(this,'mainKey')}>
						      <Option value="idCard">身份证</Option>
						      <Option value="workCode">工号</Option>
						  </Select>
					    </FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="8" style={{"text-align":"left"}}>
						<FormItem
					      label="操作："
					      labelCol={{ span: 6 }}
					      wrapperCol={{ span: 16 }}>
					      {
					      this.state.showUpload?
					      <div>
						   <Upload {...fileProps}>
						    <Button type="ghost">
						      <Icon type="upload" /> 选择文件自动上传
						    </Button>
						  </Upload>
						  </div>
						  :
						  <p className="ant-form-text">
						  请先填写【日期】和【工资类型】
						  </p>
						  }
					    </FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="24" style={{"text-align":"left"}}>
						<FormItem
					      label="说明："
					      labelCol={{ span: 2 }}
					      wrapperCol={{ span: 20 }}>
					      <div>
						  <Alert
					    message=""
					    description={<div>
					    			<p>（1）导入后请到维护界面确认，确认后才工资条会发送到用户手中；</p>
							    	<p>（2）系统中必须维护主键相关字段，导入方式为覆盖式导入；</p>
							    	<p>（3）除了主键列以外的列可以自由定义，根据不同【工资类型】和【日期】可以有不一样的列；</p>
							    	<p>（4）系统会根据【工资类型】生成工资单，如果有不同的【工资类型】就会生成不同的工资单；</p>
							    	<p>（5）如果有文本字段，比如备注字段，请在excel列标题上加上“[string]”字符。</p>
							    	<p>（6）参考模板：<a href="/cloudstore/app/no0000005/demo1.xls">导入模板1</a> <a href="/cloudstore/app/no0000005/demo1.xls">导入模板2</a></p>
							    	</div>}
					    type="info"
					    showIcon />
						  </div>
					    </FormItem>
					</Col>
				</Row>
				{
				this.state.msgArr?
				<Row>
					<Col span="24" style={{"text-align":"left"}}>
						<FormItem
					      label="提示："
					      labelCol={{ span: 2 }}
					      wrapperCol={{ span: 20 }}>
					      <div>
						  {
						  		this.state.msgArr.map(function(msg) {
						  			return <Alert
										    message=""
										    description={msg.value}
										    type={msg.type}
										    showIcon />
						  		})
						  }
						  </div>
					    </FormItem>
					</Col>
				</Row>
				:""
				}
			</Form>
		)
	},
	dataDel(setId) {
		let that = this;
		$.ajax({
	        type:"POST",
	        url:"/cloudstore/app/no0000005/ControlServlet.jsp?action=Action_DoSalaryDel&setId="+setId,
	        success(datas) {
	        	message.success("删除成功！");
	        	that.getDatas(that.state.date1);
	        },
	        error(datas) {
	        	message.error("删除失败！");
	        },
	        dataType: "json"
	    });
	},
	dataSend(setId) {
		let that = this;
		$.ajax({
	        type:"POST",
	        url:"/cloudstore/app/no0000005/ControlServlet.jsp?action=Action_DoSalarySend&setId="+setId,
	        success(datas) {
	        	message.success("发送/收回工资条成功！");
	        	that.getDatas(that.state.date1);
	        },
	        error(datas) {
	        	message.error("删除失败！");
	        },
	        dataType: "json"
	    });
	},
	dataExcelOut(setId,date) {
		let that = this;
		this.setState({
			loading:true,
		})
		$.ajax({
	        type:"POST",
	        url:"/cloudstore/app/no0000005/ControlServlet.jsp?action=Action_DoSalaryOutput",
	        data:{
	        	isHr:0,
	        	date:date,
	        	setId:setId
	        },
	        success(datas) {
	        	//console.log("datas:",datas);
	        	datas = datas.replace(/(^\s*)|(\s*$)/g,'');
	        	//console.log(datas.length);
	        	if(datas!="1") {
		        	message.success("EXCEL导出成功！");
		        	//console.log("datas:",datas);
		        	window.open(datas);
		        }
		        else {
		        	message.success("EXCEL导出失败！");
		        }
	        	that.setState({
	        		loading:false
	        	});
	        },
	        error(datas) {
	        	message.success("EXCEL导出失败！");
	        	that.setState({
	        		loading:false
	        	});
	        },
	        dataType: "html"
	    });
	},
	dataMsgSend(setId) {

	},
	dataRender() {
		const datas = this.state.datas==null?[]:this.state.datas;
		//console.log("datas:",datas);
		let tableArr = [];
		let setIdArr = [];
		let dateArr = [];
		let tmpSetId = "";
		for(let i=0;i<datas.length;i++) {
			const data = datas[i];
			if(data.setId!=tmpSetId) {
				setIdArr[setIdArr.length] = data.setId;
				dateArr[dateArr.length] = data.date;
				tmpSetId = data.setId;
			}
		}
		for(let j=0;j<setIdArr.length;j++) {
			const setId = setIdArr[j];
			let tbWidth = 130;
			let columns = [{
				title:"人员",
				dataIndex:"userName",
				key:"userName",
				width:50,
				fixedLeft:true
			},{
				title:"工资类型",
				dataIndex:"type",
			 	key:"type",
				width:80,
				fixedLeft:true
			}];
			let find = false;
			for(let i=0;i<datas.length&&!find;i++) {
				const data = datas[i];
				if(data.setId==setId) {
					const nameArr = data.names.split(",");
					for(let m=0;m<nameArr.length;m++) {
						columns[columns.length] = {
							title:nameArr[m],
							dataIndex:"v"+m,
							key:"v"+m,
							width:60
						};
						tbWidth+= 60;
					}
					find = true;
				}
			}
			let dataSource = [];
			let isSend = "1";
			for(let i=0;i<datas.length;i++) {
				let data = datas[i];
				if(data.setId==setId) {
					const valueArr = data.values.split(",");
					for(let m=0;m<valueArr.length;m++) {
						data["v"+m] = valueArr[m];
					}
					dataSource.push(data);
					if(data.isSend=="-1")
						isSend = "-1";
				}
			}
			const pagination = {
				total: dataSource.length,
				showSizeChanger: true
			};
			tableArr[tableArr.length] = <div style={{"text-align":"right","padding-bottom":"10px"}}>
										<Button onClick={this.dataSend.bind(this,setId)}>{isSend=="1"?"发送工资条":"收回工资条"}</Button>
										&nbsp;&nbsp;&nbsp;
										<Button onClick={this.dataExcelOut.bind(this,setId,dateArr[j])}>导出工资条</Button>
										&nbsp;&nbsp;&nbsp;
										<Button onClick={this.dataDel.bind(this,setId)}>删除工资条</Button>
										</div>
			tableArr[tableArr.length] = <Table rowKey="id" dataSource={dataSource} columns={columns} pagination={pagination} bordered scroll={{ x: tbWidth }}  />
		}
		return (
			<Form horizontal>
			<Row style={{"margin-top":"10px"}}>
				<Col span="8">
					<FormItem
				      label="日期："
				      labelCol={{ span: 6 }}
				      wrapperCol={{ span: 16 }}>
				      <MonthPicker format="yyyy-MM" defaultValue="" onChange={this.setValue.bind(this,'date1')} />
				    </FormItem>
				</Col>
			</Row>
			<Row>
				<Col>
					{tableArr.length>0?tableArr:<Alert type="info" description="暂无数据" showIcon />}
				</Col>
			</Row>
			</Form>
		);	
	}
});

export default Main

//ReactDOM.render(<Main />,document.getElementById("container"));