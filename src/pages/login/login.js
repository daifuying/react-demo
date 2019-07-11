import React,{Component } from 'react';
import login from './style/login.module.scss'
import { Form, Button, Notify } from 'zent';
import HTTP from '../../api/http/login.js';
import { JSEncrypt } from 'jsencrypt';

const { FormInputField, createForm, SubmissionError } = Form;

class SubmitForm extends React.Component {
    resetForm = () => {
    };

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit(this.props.onSubmit)}  horizontal>
                <FormInputField
                    name="user"
                    type="text"
                    label="用户名:"
                    value="15"
                    validations={{ required: true }}
                    validationErrors={{ required: '用户名不能为空' }}
                />
                <FormInputField
                    name="password"
                    type="password"
                    label="密码:"
                    value="123456"
                    validations={{ required: true }}
                    validationErrors={{ required: '密码不能为空' }}
                />
                <div className="zent-form__form-actions">
                    <Button  type="primary" htmlType="submit" loading={this.props.isLogining}>登陆</Button>
                    <Button  type="primary" outline onClick={this.resetForm}>注册</Button>
                </div>
            </Form>
        );
    }
}
const WrappedForm = createForm()(SubmitForm);

class Login extends Component {
    state = {
        isLogining: false,
        publicKey: '',
    }
    componentWillMount(){
        console.log('componentWillMount----组件将要挂载到页面的时刻，类似vue的created')
    }

    componentDidMount(){
        console.log('componentDidMount----组件挂载完成的时刻执行,此处请求接口')
    }
    async login (user, password) {
        let params = {
            email: user,
            pwd: password
        };
        let res = await HTTP.login(params);
        if (res&& res.code == "0") {
            Notify.success(`登陆成功，管理员： daifuying`);
            this.props.history.push('home')
        }
    }
    // 登陆事件
    handleSubmit = ({ user, password }) => {
        this.setState({
            isLogining: true
        });
        this.login(user, password)
    }

    render() {
        console.log('render---组件挂载中.......，state和props发生变化')
        return (
            <div className={login.loginRoot}>
                <div className={login.loginBox}>
                    <div className={login.loginTitle}>SAAS商城</div>
                    <WrappedForm onSubmit={this.handleSubmit} loading={this.state.isLogining}  />
                </div>
            </div>
        );
    }
}

export default Login;
