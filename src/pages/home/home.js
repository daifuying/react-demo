import React,{Component } from 'react';
import home from './style/home.module.scss'
import { Menu, Notify,Icon } from 'zent';
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom';
import test from '../test';
const { MenuItem, SubMenu  } = Menu;


const onClick = (e, key) => {
    console.log(e, key);
}

class Home extends Component {
    componentWillMount(){
        console.log('componentWillMount----组件将要挂载到页面的时刻，类似vue的created')
    }

    componentDidMount(){
        console.log('componentDidMount----组件挂载完成的时刻执行,此处请求接口')
    }
    logOut = (e) => {
        this.props.history.push('/')
    }
    render() {
        console.log('render---组件挂载中.......，state和props发生变化')
        return (
            <div>
                <header className={home.header}>
                   <div style={{
                       float:'right',
                       height: '30px',
                       padding: '10px',
                       cursor:'pointer'
                   }}
                        onClick={this.logOut}
                   >
                       <span style={{
                           padding: '10px'}}>退出</span>
                       <Icon  style={{
                           lineHeight: '30px',
                           }} type="export" />
                   </div>
                </header>
                <article className={home.article}>
                    <aside className={home.aside}>
                        <Menu
                            className={home.menu}
                            mode="inline"
                            defaultSelectedKey="1-3-3"
                            defaultExpandKeys={["1-3", "1-4"]}
                            onClick={onClick}

                        >
                            <MenuItem key="1-1">
                                经营概况
                            </MenuItem>
                            <MenuItem key="1-2" >
                                店铺装修
                            </MenuItem>
                            <SubMenu
                              title={<span><Icon type="youzan" />商品管理</span>} key="1-3">
                                <MenuItem key="1-3-1">商品管理</MenuItem>
                                <MenuItem key="1-3-2">商品分组</MenuItem>
                                <MenuItem key="1-3-3">商品页模板</MenuItem>
                            </SubMenu>
                            <SubMenu title={"订单管理"} key="1-4">
                                <MenuItem key="1-4-1">订单查询</MenuItem>
                                <MenuItem key="1-4-2">退款维权</MenuItem>
                            </SubMenu>
                        </Menu>
                    </aside>
                    <article className={home.main}>
                        <Switch>
                            <Route path="/" component={test} />
                        </Switch>
                    </article>
                </article>
            </div>

        );
    }
}

export default Home;
