import React,{Component } from 'react';
import './style/login.scss'
import { Form, Button, Notify } from 'zent';
const { FormInputField, createForm, SubmissionError } = Form;

function onSubmitFail(error) {
    Notify.error(error);
}

function onSubmitSuccess(result) {
    Notify.success(result);
}

class SubmitForm extends React.Component {
    submit = (values, zentForm) => {
        const promise = new Promise((resolve) => setTimeout(resolve, 1000));

        return promise.then(() => {
            const random = Math.random() * 10;
            if (random > 4) {
                zentForm.setFieldExternalErrors({
                    user: '用户名已被占用'
                });
                // 可以使用throw SubmissionError 在 onSubmitFail 中处理，也可以在这里直接 alert 错误信息
                throw new SubmissionError('用户名已被占用');
            } else {
                // 可以将返回值传入到 onSubmitSuccess ，也可以直接在这里处理掉
                return '注册成功';
            }
        });
    };

    resetForm = () => {
        const { zentForm } = this.props;

        zentForm.resetFieldsValue();
    };

    render() {
        const { handleSubmit, zentForm } = this.props;
        const isSubmitting = zentForm.isSubmitting();

        return (
            <Form onSubmit={handleSubmit(this.submit)} horizontal>
                <FormInputField
                    name="user"
                    type="text"
                    label="用户名:"
                    value="111"
                    validations={{ required: true }}
                    validationErrors={{ required: '用户名不能为空' }}
                />
                <FormInputField
                    name="password"
                    type="password"
                    label="密码:"
                    value="222"
                    validations={{ required: true }}
                    validationErrors={{ required: '密码不能为空' }}
                />
                <FormInputField
                    name="confirmPassword"
                    type="password"
                    label="确认密码:"
                    value="222"
                    validations={{
                        required: true,
                        isPasswordEqual(values, value) {
                            if (values.password !== value) {
                                return '两次填写的密码不一致';
                            }
                            return true;
                        }
                    }}
                    validationErrors={{
                        required: '确认密码不能为空'
                    }}
                />
                <div className="zent-form__form-actions">
                    <Button type="primary" htmlType="submit" loading={isSubmitting}>注册</Button>
                    <Button type="primary" outline onClick={this.resetForm}>重置</Button>
                </div>
            </Form>
        );
    }
}

const WrappedForm = createForm()(SubmitForm);
class Login extends Component {
    render() {
        return (
            <div className="login-root">
                <WrappedForm scrollToError onSubmitFail={onSubmitFail} onSubmitSuccess={onSubmitSuccess} />
            </div>
        );
    }
}

export default Login;
