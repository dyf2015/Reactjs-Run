import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as RoleActions from '../actions/Role';
//
//const ReactRouter = require('react-router');
//let {Link} = ReactRouter;
import Link from 'react-router/lib/Link';
import { Row,Col,Breadcrumb,Icon,Button,Form,Input,Popconfirm,message } from 'antd';


const FormItem = Form.Item;
// import Com from '../../ComponentsV1/index';
// const WeaInput = Com.Input;
// const WeaInput4Hrm = Com.Input4Hrm;
// const WeaInput4Dep = Com.Input4Dep;
// const WeaInput4Com = Com.Input4Com;
// const WeaTable = Com.Table;
// const WeaTableAction = WeaTable.TableActions;
// const Top = Com.Top;
// const SearchForm = Com.SearchForm;

import {WeaInput,WeaInput4Hrm,WeaInput4Dep,WeaInput4Com} from 'weaCom';
import {WeaTable,WeaTop,WeaSearchForm} from 'weaCom';
const WeaTableAction = WeaTable.TableActions;
// import RoleStore from '../reducers/Role';
// const RoleActions = RoleStore.Actions;
import QueueAnim from 'rc-queue-anim';



function doRoleDel(id) {
    RoleActions.doRoleDel(id,WeaTableAction.search(tableOptions));
}

function reSizeHeight() {
//  jQuery(".Container").height(jQuery("body").height());
    document.querySelector('.Container').style.height = document.getElementsByTagName('body')[0].style.height;
}
    const columns = [
        {
            key: '1',
            title: '角色名称',
            dataIndex: 'roleName'
        }, 
        {
            key: '2',
            title: '角色编码',
            dataIndex: 'roleCode'
        },
        {
            key: '3',
            title: '应用编号',
            dataIndex: 'appCode'
        },
        {
            key: '6',
            title: '操作',
            dataIndex: '',
            render:function(text,record) {
                const id = record.id;
                const toEdit = "/roleList/"+id+"/edit";
                const toShow = "/roleList/"+id+"/show";
                return (<span>
                          <Popconfirm title="确定要删除这个角色吗？" onConfirm={doRoleDel.bind(this,id)}>
                             <a href="javascript:void(0)">删除</a>
                          </Popconfirm>
                          <span className="ant-divider"></span>
                          <Link to={toEdit}>编辑</Link>
                          <span className="ant-divider"></span>
                          <Link to={toShow}>查看</Link>
                        </span>
                )
            }
        }
    ];

    const tableOptions = {
        formId:"dyfform", //表单id
        dataUrl:"/cloudstore/system/ControlServlet.jsp?action=Action_GetRoles", //数据，返回固定格式json
        numUrl:"/cloudstore/system/ControlServlet.jsp?action=Action_GetRolesNum", //最大数量
        columns:columns,
        pageNum:10,
        quickSearch:true, //是否开启快速搜素
        maxSearchNum:5000, //开启快速搜索时如果大于maxSearchNum自动转为关闭快速搜索状态
    }

class RoleList extends React.Component {

    componentDidMount() {
        reSizeHeight();
        this.doSearch(tableOptions);
        this.props.actions.putDispatch()
        // this.props.actions.doClean()
    }
   
    render() {
        return this.props.children?this.renderChildren():this.renderList();
    }
    renderChildren() {
        return this.props.children;
    }
    renderList() {
        let {role} = this.props;
        // console.dir(role)
        // console.log("showForm",role&&role.showForm)
        return (<QueueAnim>
                    <div className="RoleListdiv" key="a">
                    <input type="hidden" value={role&&role.isRoleDel}/>
                    <WeaTop  title="角色查询">
                        <Link to="/roleList/add" style={{"margin-right":"5px"}}><Button type="primary">新建角色</Button></Link>
                        <Button type="ghost" onClick={this.doShowForm.bind(this)}><Icon type="search" />{role&&role.showForm?"隐藏高级查询":"显示高级查询"}</Button>
                    </WeaTop>
                    <WeaSearchForm key="b" showForm={role&&role.showForm} id={tableOptions.formId} >
                        <Row>
                            <Col span="8" className="form-item-full">
                                <FormItem label="角色名称：" labelCol={{span: 6}} wrapperCol={{span: 18}}>
                                    <WeaInput  name="roleName" style={{"width":"100%"}} />
                                </FormItem>
                            </Col>
                            <Col span="8" className="form-item-full">
                                <FormItem label="角色编码：" labelCol={{span: 6}} wrapperCol={{span: 18}}>
                                    <WeaInput name="roleCode" style={{"width":"100%"}} />
                                </FormItem>
                            </Col>
                            <Col span="8" className="form-item-full">
                                <FormItem label="角色说明：" labelCol={{span: 6}} wrapperCol={{span: 18}}>
                                    <WeaInput name="roleDesc" style={{"width":"100%"}} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8" offset="2">
                                <Button type="primary" style={{"margin-right":"5px"}} onClick={this.doSearch.bind(this,tableOptions)}>查询</Button>
                            </Col>
                        </Row>
                    </WeaSearchForm>
                    <WeaTable options={tableOptions} showForm={role&&role.showForm} bordered />
                    </div>
              </QueueAnim>
        )
    }
    doSearch(tableOptions) {
        WeaTableAction.search(tableOptions);
    }
    doShowForm() {
        this.props.actions.showForm();
        WeaTableAction.search(tableOptions);
    }


};

RoleList.propTypes = {
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
)(RoleList)
