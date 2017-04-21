import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as RoleActions from '../actions/Role';

//const ReactRouter = require('react-router');
//let {Link} = ReactRouter;
import Link from 'react-router/lib/Link';

import {Form, Input, Select, Checkbox, Row, Col, Table, Button , Icon ,Popover ,Alert ,message} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
// import Com from '../../ComponentsV1/index';
// const WeaInput = Com.Input;
// const WeaSelect = Com.Select;
// const WeaInput4Hrm = Com.Input4Hrm;
// const WeaInput4Dep = Com.Input4Dep;
// const WeaInput4Com = Com.Input4Com;
// const Top = Com.Top;
import {WeaInput,WeaSelect,WeaInput4Hrm,WeaInput4Dep,WeaInput4Com,WeaTop} from 'weaCom';

import QueueAnim from 'rc-queue-anim';



const mtDatas = [
    {name:"个人",value:"0"},
    {name:"部门",value:"1"},
    {name:"分部",value:"2"},
];

const rlDatas = [
    {name:"本人部门",value:"1"},
    {name:"本人分部",value:"2"},
    {name:"本人总部",value:"3"},
];

//根据value获取name
function getOptionName(type,value){
  let returnName = "";
  if(type=="mt"){
    mtDatas.map((mtdata)=>{
      switch(mtdata.value){
        case value:
        returnName = mtdata.name;
      }
    }) 
  }else if(type=="rl"){
    rlDatas.map((rldata)=>{
      switch(rldata.value){
        case value:
        returnName = rldata.name;
      }
    }) 
  }
  return returnName;
}

function reSizeHeight() {
//  jQuery(".Container").height(jQuery("body").height());
    document.querySelector('.Container').style.height = document.getElementsByTagName('body')[0].style.height;
}




class Role extends React.Component {

    componentDidMount() {
        const id = this.props.params.id?this.props.params.id:"0";
        const pathArr = this.props.location.pathname.split("/");
        const opType = pathArr[pathArr.length-1];
        reSizeHeight();
        this.props.actions.doInit(id,opType);
    }

    componentWillUnmount() {
        this.props.actions.gClean();
    }
 
    render() {
        let {role,actions} = this.props;
        const opType = role.opType;
        let that = this;
        const { getFieldProps,getFieldValue } = this.props.form;
        const rowSelection = {
            onSelect: function(record, selected, selectedRows) {
                actions.setSelectDatas(selectedRows);
            },
            onSelectAll: function(selected, selectedRows) {
                actions.setSelectDatas(selectedRows);
            }
        };
        // console.log("object",getFieldValue("memberObj"))


        //控制添加权限
        const canAddRoleMember = !(!getFieldValue("memberObj")&&!getFieldValue("memberObja")&&!getFieldValue("memberObjb"));
        // const canAddRoleMember = true;
        //控制删除权限
        const canDelRoleMember = (role.roleMemberDatas.length>0); 
        const canMainSave = !(!role.roles.roleName||!role.roles.roleCode||!role.roles.appCode)
         //控制保存按钮
        const canSave = getFieldValue("roleName")!=undefined&&getFieldValue("roleName")!=""&&getFieldValue("roleCode")!=undefined&&getFieldValue("roleCode")!=""&&getFieldValue("appCode")!=undefined&&getFieldValue("appCode")!=""&&role.roleMemberDatas.length>0&&opType!="show"
        //下面那个column
        const columns = [{
          title: '授权范围',
          dataIndex: 'memberTypeName',
          render: function(text,record) {
              if("show"==opType)
                  return <div>{text}</div>
              else
                 return that.getMemberTypeBtn(record.key,"","200px",that.setDetailValue.bind(that,"memberType",record.key));
          }
        }, {
          title: '授权对象',
          dataIndex: 'memberObjName',
          render: function(text,record) {
              if("show"==opType)
                  return <div>{text}</div>
              else
                  return <div>{that.getMemberObjBtn(text,false,record.key,"100%",that.setDetailValue.bind(that,"memberObj",record.key))}</div>
          }
        }, {
          title: '权限等级',
          dataIndex: 'roleLevelName',
          render: function(text,record) {
              
              if("show"==opType)
                  return <div>{text}</div>
              else
                  return that.getRoleLevelBtn(record.key,"","200px",that.setDetailValue.bind(that,"roleLevel",record.key));
          }
        }, {
          title: '权限对象',
          dataIndex: 'roleObjName',
          render: function(text,record) {
              if("show"==opType)
                  return <div>{text}</div>
              else
                  return <div>{that.getRoleObjBtn(text,false,record.key,"200px",that.setDetailValue.bind(that,"roleObj",record.key))}</div>
          }
        }];


        return (
        <div className="rolediv">
        <Form horizontal id="dyfform">
        <QueueAnim>
          <WeaTop key="a" title={opType=="add"?"新建角色":(opType=="edit"?"编辑角色":"查看角色")}>
              <Button type="primary" style={{"margin-right":"5px"}} onClick={this.doRoleSave.bind(this)} disabled={!canSave}>保存</Button>
              <Link to="/roleList"><Button type="primary">返回</Button></Link>
          </WeaTop>
                <p style={{"margin-top":"5px"}}>基本信息</p>
                <Row style={{"margin-top":"5px","padding":"10px","border":"1px solid #d9d9d9","border-radius":"5px"}}>
                  <Col>
                <Row>
                  <Col span="6">
                       
                        <FormItem label="名称：" labelCol={{span: 8}} wrapperCol={{span: 16}} >
                           <Input name="roleName"  id="weainputname" {...getFieldProps('roleName',{initialValue:role.roles.roleName})}
                             style={{"width":"100%"}} required={opType!="show"} disabled={opType=="show"}/>
                        </FormItem>
                  </Col>
                  <Col span="6">
                      <FormItem label="功能编码：" labelCol={{span: 8}} wrapperCol={{span: 16}}>
                        <Input name="roleCode"  id="weainputcode" {...getFieldProps('roleCode',{initialValue:role.roles.roleCode})}
                           style={{"width":"100%"}} required={opType!="show"}   disabled={opType=="show"} />
                      </FormItem>
                  </Col>
                    <Col span="6">
                      <FormItem label="应用：" labelCol={{span: 8}} wrapperCol={{span: 16}}>   
                        <WeaSelect name="appCode" disabled={opType=="show"}
                            isMult={false} datas={role.appList} required={opType!="show"} id="weainputapp"  
                            style={{"width":"100%"}} size="large" {...getFieldProps('appCode',{initialValue:role.roles.appCode})}/>                      
                      </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                      <FormItem label="说明：" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                         <Input name="roleDesc" style={{"width":"100%"}} {...getFieldProps('roleDesc',{initialValue:role.roles.roleDesc})} id="weainputdetail" disabled={opType=="show"} />
                      </FormItem>:
                    </Col>
                </Row>
                  </Col>
                </Row>
                <p style={{"margin-top":"5px"}}>权限信息</p>
                <Row style={{"margin-top":"5px","padding":"10px","border":"1px solid #d9d9d9","border-radius":"5px"}}>
                  <Col>
                        {opType!="show"?
                        <Row>
                          <Col span="6">
                              {that.getMemberTypeBtn("Mult","授权范围：","100%",that.setMemberType.bind(that))}
                          </Col>
                          <Col span="6" className="form-item-full">
                              {that.getMemberObjBtn("",true,"","100%",that.setMemberObj.bind(that))}
                          </Col>
                          <Col span="6">
                              {that.getRoleLevelBtn("Mult","权限等级：","100%","")}
                          </Col>
                          <Col span="6" className="form-item-full">
                              {that.getRoleObjBtn("",true,"","100%","")}
                          </Col>
                      </Row>
                      :""}
                      <Row>
                          <Col>
                              {opType!="show"?
                              <div style={{"text-align":"right","padding-bottom":"5px"}}>
                                  {canDelRoleMember?
                                    <Button size="small" onClick={this.delRoleMember.bind(this)} style={{"margin-right":"5px"}}>删除权限</Button>
                                    :
                                    <Button size="small" onClick={this.delRoleMember.bind(this)} style={{"margin-right":"5px"}} disabled>删除权限</Button>
                                  }
                                  {canAddRoleMember?
                                    <Button size="small" onClick={this.addRoleMember.bind(this)}>添加权限</Button>
                                    :
                                    <Button size="small" onClick={this.addRoleMember.bind(this)} disabled>添加权限</Button>
                                  }
                              </div>
                              :""}
                              <Table rowSelection={opType!="show"?rowSelection:""} columns={columns} dataSource={role.roleMemberDatas} size="middle" />
                          </Col>
                      </Row>
                  </Col>
              </Row>
              {opType!="show"?
              <Row>
              <Col style={{"padding-top":"10px"}}>
              {canMainSave&&canDelRoleMember&&!role.haveNoSaveDetail?<Alert message={"数据校验已通过可以提交"} type="success" showIcon style={{"margin-top":"10px"}} />:""}
              {!canMainSave?<Alert message={"主表还有必填项未填写"} type="error" showIcon style={{"margin-top":"10px"}} />:""}
              {!canDelRoleMember||role.haveNoSaveDetail?<Alert message={"明细表还有必填项未填写"} type="error" showIcon style={{"margin-top":"10px"}} />:""}
              </Col>
              </Row>
              :""}
        </QueueAnim>
       </Form>
       </div>
       );
    }


    //保存
    doRoleSave() {
        const { getFieldProps,getFieldValue,getFieldsValue,getFieldInstance } = this.props.form;
        this.props.actions.doRoleSave("dyfform",this.props.role.opType,this.props.role.roleMemberDatas,getFieldValue("appCode"));
    }

    //删除权限
    delRoleMember() {
        this.props.actions.doRoleMemberDel(this.props.role.selectDatas);
    }
    //上1
    setMemberType(ids,names) {
      this.props.actions.saveMemberTypeMsg = names;
    }
    setMemberObj(ids,names) {
      this.props.actions.saveMemberObjMsgids = ids;
      this.props.actions.saveMemberObjMsg = names;
    }
    
   //添加权限
    addRoleMember() {

      const { getFieldProps,getFieldValue,getFieldsValue,getFieldInstance } = this.props.form;
      const roleMember = {
          memberType:{
              id:getFieldsValue().memberType,
              name:getOptionName("mt",getFieldsValue().memberType)
          },
          memberObj:{
              ids:this.props.actions.saveMemberObjMsgids,
              names:this.props.actions.saveMemberObjMsg
          },
          roleLevel:{
              id:getFieldsValue().roleLevelName,
              name:getOptionName("rl",getFieldsValue().roleLevelName)
          },
          roleObj:{
              ids:"0",
              names:"全部"
          }
      };
      this.props.actions.doRoleMemberAdd(roleMember,this.props.role.roleMemberDatas);
      // this.props.actions.cleanMemberObj(this.props.role.roles);
    }


  setDetailValue(field,key,id,name) {
      this.props.actions.doRoleMemberEdit(field,key,id,name);
  }


//第一个输入框 授权范围 ，上下都用  fun,"Mult","授权范围：",memberTypeMult,"100%"
 getMemberTypeBtn(name,label,width,fun) {
    let that = this;
    const {role} = this.props
    const { getFieldProps,getFieldValue } = this.props.form;
    if(""!=label) {
        return <FormItem label={label} labelCol={{span: 8}} wrapperCol={{span: 16}}><WeaSelect name={"memberType"+name}
                {...getFieldProps('memberType',{initialValue:role.roleMemberDatas[0]&&role.roleMemberDatas[0].memberType,onChange:fun})}
                isMult={false} datas={mtDatas}  
                style={{"width":width}} size="large" /></FormItem>
    }
    else {
        return <WeaSelect NoFormItem={true} name={"memberType"+name} isMult={false} datas={mtDatas} 
                style={{"width":width}} size="large" {...getFieldProps('memberType1',{initialValue:role.roleMemberDatas[name]&&role.roleMemberDatas[name].memberType,onChange:fun})}/>   
    } 
  }

//第二个输入框 授权人员  ("",true,"","100%")
 getMemberObjBtn(valueName,haveLabel,key,width,fun) {
    
    let that = this;
    const {role} = this.props
    const { getFieldProps,getFieldValue } = this.props.form;
    if(getFieldValue('memberType')=="0"||getFieldValue('memberType')==undefined) {
        if(haveLabel) {
          return (
            <FormItem label={"授权人员："} labelCol={{span: 8}} wrapperCol={{span: 16}}>
              <WeaInput4Hrm name={"memberHrm"+key} isMult={key==""}  style={{"width":width}}   
                {...getFieldProps('memberObj',{onChange:fun})}
              valueSpan={valueName} />
            </FormItem>
          )
        }
        else {
          return (
            <WeaInput4Hrm name={"memberHrm"+key} {...getFieldProps('memberObj1',{initialValue:"",onChange:fun})} isMult={key==""} style={{"width":width}}  valueSpan={valueName} />
          )
        }
    }
    else if(getFieldValue('memberType')=="1"||getFieldValue('memberType')==undefined) {
      if(haveLabel) {
          return (
            <FormItem label={"授权部门："} labelCol={{span: 8}} wrapperCol={{span: 16}}>
            <WeaInput4Dep name={"memberDep"+key} isMult={key==""} style={{"width":width}} 
            {...getFieldProps('memberObja',{onChange:fun})}
            valueSpan={valueName} />
            </FormItem>
          )
        }
        else {
          return (
            <WeaInput4Dep name={"memberDep"+key} {...getFieldProps('memberObj2',{initialValue:role.roleMemberDatas[0]&&role.roleMemberDatas[0].memberObj,onChange:fun})} isMult={key==""} style={{"width":width}} valueSpan={valueName} />
          )
        }
    }
    else if(getFieldValue('memberType')=="2"||getFieldValue('memberType')==undefined) {
        if(haveLabel) {
          return (
            <FormItem label={"授权分部："} labelCol={{span: 8}} wrapperCol={{span: 16}}>
            <WeaInput4Com name={"memberCom"+key} isMult={key==""} style={{"width":width}} 
             {...getFieldProps('memberObjb',{onChange:fun})}
            valueSpan={valueName} />
            </FormItem>
          )
        }
        else {
          return (
            <WeaInput4Com  {...getFieldProps('memberObj3',{initialValue:role.roleMemberDatas[0]&&role.roleMemberDatas[0].memberObj,onChange:fun})} name={"memberCom"+key} isMult={key==""} style={{"width":width}} valueSpan={valueName} />
          )
        }
    }
    else
        return <div></div>
}


//第三个输入框  权限等级 fun,"Mult","权限等级：",roleLevelMult,"100%"
  getRoleLevelBtn(name,label,width,fun) {
    const {role} = this.props
    const { getFieldProps,getFieldValue } = this.props.form;
    if(""!=label) {
        return <FormItem label={label} labelCol={{span: 8}} wrapperCol={{span: 16}}>
              <WeaSelect name={"roleLevel"+name} 
                  isMult={false} datas={rlDatas} 
                  {...getFieldProps('roleLevelName',{initialValue:role.roleMemberDatas[0]&&role.roleMemberDatas[0].roleLevel,onChange:fun})}
                  style={{"width":width}} size="large" /></FormItem>
    }
    else {
        return <WeaSelect name={"roleLevel"+name} isMult={false} datas={rlDatas} 
        {...getFieldProps('roleLevelName1',{initialValue:role.roleMemberDatas[name]&&role.roleMemberDatas[name].roleLevel,onChange:fun})}
                  style={{"width":width}} size="large" />
    }
  }


//第四个输入框  权限对象 fun,"","",true,"","100%"
  getRoleObjBtn(valueName,haveLabel,key,width,fun) {

    let that = this;
    const {role} = this.props
    const { getFieldProps,getFieldValue } = this.props.form;
    if(getFieldValue('roleLevelName')=="5")
          return <FormItem label={haveLabel?"权限分部：":""} labelCol={{span: 8}} {...getFieldProps('roleObj',{initialValue:role.roleMemberDatas[0]&&role.roleMemberDatas[0].roleObj,onChange:fun})} wrapperCol={{span: 16}}><WeaInput4Com name={"roleCom"+key} isMult={key==""} style={{"width":width}}   valueSpan={value=="0"?"":valueName} /></FormItem>
    else if(getFieldValue('roleLevelName')=="4")
          return <FormItem label={haveLabel?"权限部门：":""} labelCol={{span: 8}} {...getFieldProps('roleObj',{initialValue:role.roleMemberDatas[0]&&role.roleMemberDatas[0].roleObj,onChange:fun})} wrapperCol={{span: 16}}><WeaInput4Dep name={"roleDep"+key} isMult={key==""} style={{"width":width}}   valueSpan={value=="0"?"":valueName} /></FormItem>
    else if(getFieldValue('roleLevelName')=="1"||getFieldValue('roleLevelName')=="2"||getFieldValue('roleLevelName')=="3"||getFieldValue('roleLevelName')==undefined) {
          if(haveLabel) {
              return <FormItem label={"权限对象："} labelCol={{span: 8}} wrapperCol={{span: 16}}>
                    <Input  {...getFieldProps('roleObj',{initialValue:"全部",onChange:fun})} />
                    <Input type="hidden" name={"roleAll"+key} value={0} />
                  </FormItem>
          }
          else {
              return <div>
                  <Input type="text" {...getFieldProps('roleObj1',{initialValue:"全部",onChange:fun})} disabled style={{"width":width}} />
                    <Input type="hidden" name={"roleAll"+key} value={0} />
              </div>
          }
    }
    else
        return <div></div>
  }
};
Role = Form.create({onFieldsChange:(props,field)=>{
  let fieldName;
  for(var i in field){//用javascript的for/in循环遍历对象的属性 
    // console.log("修改前props",props.role.roles[i])
    props.role.roles[i] = field[i].value;
    // console.log("修改后props",props.role.roles[i])
  } 
}
})(Role);
Role.propTypes = {
    // init: PropTypes.array.isRequired,
    role: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        role: state.role
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(RoleActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Role)