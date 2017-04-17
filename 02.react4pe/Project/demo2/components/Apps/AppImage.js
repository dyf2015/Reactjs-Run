import {Row,Col,Pagination,Button,Icon,Tag} from 'antd';

import QueueAnim from 'rc-queue-anim';


class Main extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            theme:"imgframe",
            foottheme:"innerimageFooter",
        }
     }
    componentDidMount() {
        // this.props.actions.changeTheme("imgframe","innerimageFooter");
    }
    render() {
        const {theme,foottheme} = this.state;
        const msg = this.props.data;
        let innerimage;
        let count = 0;
//      console.log('msg.imgUrl',msg.imgUrl);
        if(msg.imgUrl!=""){
            innerimage = <div className="innerimage" style={{"backgroundImage":"url("+msg.imgUrl+")"}}></div> 
        }else{
            innerimage = <div className="innerimage" style={{"backgroundImage":"url(/cloudstore/images/default/coffee.jpg)"}}></div> 
        }
        return(
            <QueueAnim>
            <div key={msg.code} className="imgbody">
                <div className={theme} onMouseOver={this.isOver.bind(this)} onMouseLeave={this.isLeave.bind(this)} onClick={this.isClick.bind(this,msg.code,msg.name)}>
                    {innerimage}
                    <div className="innerimageBody">
                        <div className={foottheme}>
                        	<p><span>{msg.name}</span></p>
                        	<p className="version" ><span>{msg.version}</span></p>
                        </div>
                    </div>
               
                </div> 
            </div>
            </QueueAnim>          
        )  
    }
    isOver(){
        this.setState({
            theme: "imgframemove",
            foottheme:"innerimageFooter1",
        });
    }
    isLeave(){
        this.setState({
            theme: "imgframe",
            foottheme:"innerimageFooter",
        });
    }
    isClick(id,name){
        // console.log("history",this.props.history)
        // let ss = id[0].url.split("/");
        // this.props.history.pushState(null,"/newapps/"+ss+"/show");
        let kao = "["+id+"] "+name;
        // console.dir(this);
        // console.log("kao",kao);
        this._reactInternalInstance._context.router.push({ pathname:"/newapps/"+id+"/show",query:{ id: id,name:name }});
        $('html,body').animate({scrollTop:0},'slow');
    }
}
    

export default Main;