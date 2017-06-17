import React, { Component, PropTypes } from 'react'
import Link from 'react-router/lib/Link'
import {Row,Col,Card} from 'antd'

class Home extends Component {
	render() {
		return (
			<div className="code-box-demo" style={{ background: '#ECECEC', padding: '30px' }}>
				<Row>
					<Col span="12">
						<Card title="普通用户功能" bordered={false}>
							<Link to="/show">工资查询</Link>、<Link to="/mobile">移动工资查询</Link>
						</Card>
					</Col>
					<Col span="12">
						<Card title="管理员功能" bordered={false}>
							<Link to="/set">工资设置</Link>、<Link to="/msg">工资短信</Link>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}

export default Home
