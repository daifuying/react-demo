import React,{Component } from 'react';
import home from './style/home.module.scss'
import { Form, Button, Notify } from 'zent';

class Home extends Component {
    state = {
        isLogining: false
    }
    componentWillMount(){
        console.log('componentWillMount----组件将要挂载到页面的时刻，类似vue的created')
    }

    componentDidMount(){
        console.log('componentDidMount----组件挂载完成的时刻执行,此处请求接口')
    }
    // 登陆事件
    handleSubmit = ({ mobile, password }) => {
        this.setState({
            isLogining: true
        });
        Notify.success(`登陆成功，管理员： daifuying`);
        this.props.history.push('home')
    }

    render() {
        console.log('render---组件挂载中.......，state和props发生变化')
        return (
            <div>
                <header className={home.header}>
                   head
                </header>
                <article className={home.article}>
                    <aside className={home.aside}>
                        aside
                    </aside>
                    <article className={home.main}>article</article>
                </article>
            </div>

        );
    }
}

export default Home;
