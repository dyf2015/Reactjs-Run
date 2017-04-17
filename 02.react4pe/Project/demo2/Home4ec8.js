import { Provider, connect } from 'react-redux'

import ReactRouter from 'react-router/lib/index'
import Link from 'react-router/lib/Link';
import { Breadcrumb, Menu, Icon } from 'antd';

import Init from './components/Init';
import Auth from './components/Auth';
import AppDetail from './components/Apps/NewAppsDetail';
import RoleList from './components/RoleList';
import Role from './components/Role';
import NewApps from './components/Apps/NewApps';
import QueueAnim from 'rc-queue-anim';

class Home extends React.Component {
    render() {
        // console.log("render" + this.props.util);
        const page = this.props.children;
        const key = this.props.location.pathname.replace('/','');
        const keys = key?key:"home";
        return (
            <div>
            {page?
                <div key={key}>
                    <div className="Breadcrumb"><Breadcrumb {...this.props} router={ReactRouter} /></div>
                    <div className="Container">{page}</div>
                </div>
            :
            <QueueAnim type={['right','left']} >
                <div key="home" className="Banner">
                    <QueueAnim>
                        <h1 key="a">泛微云应用商店</h1>
                        <p key="b">客户端 for ECOLOGY</p>
                    </QueueAnim>
                </div>
            </QueueAnim>
            }

            {
                (this.props.util && this.props.util.loading) && (
                    <div className="spinnerWrapper">
                        <div className="spinner">
                            <div className="rect1"></div>
                            <div className="rect2"></div>
                            <div className="rect3"></div>
                            <div className="rect4"></div>
                            <div className="rect5"></div>
                        </div>
                    </div>
                )
            }
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        util: state.util,
        // total: state
    }
}
export default connect(mapStateToProps)(Home);