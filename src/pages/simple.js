import React,{Component } from 'react';
import { Design, Button, Layout, Notify } from 'zent';
import 'zent/css/index.css';
// ⚠️注意：这个示例里面代码的引入和实际使用时有一些区别。

// Please replace 'design/...' with 'zent/lib/design/...' in your own code
import configConf from 'zent/lib/design/components/config';
import ConfigEditor from 'zent/lib/design/components/config/ConfigEditor';
import whitespaceConf from 'zent/lib/design/components/whitespace';
import lineConf from 'zent/lib/design/components/line';
import richtextConf from 'zent/lib/design/components/richtext';
import imageAdConf from 'zent/lib/design/components/image-ad';

// 我们仅仅提供了少数几个 Design 组件作为示例，更多业务组件需要根据你的业务需求自己实现。
// If you use these two default design components, you have to
// manually include the styles in your own code:
import 'zent/css/design-config.css';
import 'zent/css/design-whitespace.css';
import 'zent/css/design-line.css';
import 'zent/css/design-image-ad.css';

const { Row, Col } = Layout;

const components = [
    Object.assign({}, configConf, {
        // 是否可以拖拽
        dragable: false,

        // 是否出现在底部的添加组件区域
        appendable: false,

        // 是否可以编辑，UMP里面有些地方config是不能编辑的
        // editable: true,

        configurable: false,

        highlightWhenSelect: false
    }),

    richtextConf,

    imageAdConf,

    Object.assign({ limit: 1 }, whitespaceConf),

    Object.assign({ limit: 2 }, lineConf)
];

const groupedComponents = [
    Object.assign({}, configConf, {
        // 是否可以拖拽
        dragable: false,

        // 是否出现在底部的添加组件区域
        appendable: false,

        // 是否可以编辑，UMP里面有些地方config是不能编辑的
        // editable: true,

        configurable: false,

        highlightWhenSelect: false
    }),

    Design.group('基础'),
    richtextConf,
    imageAdConf,

    Design.group('其他'),
    Object.assign({ limit: 1 }, whitespaceConf),
    Object.assign({ limit: 2 }, lineConf)
];

class Simple extends Component {
    state = {
        grouped: true,
        value: [
            {
                type: configConf.type,
                ...ConfigEditor.getInitialValue()
            }
        ],
        settings: {
            // previewBackground: 'red'
        }
    };

    onChange = newValue => {
        this.setState({
            value: newValue
        });
    };

    onSettingsChange = newSettings => {
        this.setState({
            settings: newSettings
        });
    };

    switchMode = () => {
        const { grouped } = this.state;

        this.setState({
            grouped: !grouped
        });
    };

    render() {
        const { grouped } = this.state;

        return (
            <div>
                <Design
                    ref={this.saveDesign}
                    cache
                    cacheId="zent-design-test"
                    confirmUnsavedLeave={false}
                    components={grouped ? groupedComponents : components}
                    value={this.state.value}
                    onChange={this.onChange}
                    settings={this.state.settings}
                    onSettingsChange={this.onSettingsChange}
                    scrollTopOffset={-270}
                    globalConfig={window._global}
                />
                <div className="design-example-actions">
                    <Button type="primary" onClick={this.submit}>
                        上架
                    </Button>
                    <Button onClick={this.notImplemented}>
                        保存草稿
                    </Button>
                    <Button onClick={this.notImplemented}>
                        预览
                    </Button>
                    <Button onClick={this.switchMode}>
                        {grouped ? '组件合并显示' : '组件分组显示'}
                    </Button>
                </div>
            </div>
        );
    }

    notImplemented() {
        Notify.error('仅作为演示，功能未开发');
    }

    saveDesign = instance => {
        this.design = instance && instance.getDecoratedComponentInstance();
    };

    triggerDesignValidation() {
        return this.design.validate();
    }

    submit = () => {
        this.triggerDesignValidation()
            .then(() => {
                const data = Design.stripUUID(this.state.value);
                console.log(data);
                // submit this.state.value to server
                this.design.markAsSaved();
                Notify.success('提交成功');
            })
            .catch(validations => {
                console.log(validations);
            });
    };
}
export default Simple;
