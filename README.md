# 快速选择时间范围

---

基于 fish 时间组件开发的业务组件：快速选择时间范围

## 何时使用

- 快速选择时间范围的时候

## 浏览器支持

IE 8+

## 安装

```bash
npm install @sdp.nd/md-date-range --save
```

## 运行

```bash
# 默认开启服务器，地址为 ：http://local:8000/

# 能在ie9+下浏览本站，修改代码后自动重新构建，且能在ie10+运行热更新，页面会自动刷新
npm run start

# 构建生产环境静态文件，用于发布文档
npm run site
```

## 代码演示

```css
.ant-input {
  border: 1px solid red;
}
```

### 快速选择时间

最简单的用法，通过`onChange`获取选中的时间范围

```jsx
import "@sdp.nd/md-date-range/lib/style/";
import DateRange from "@sdp.nd/md-date-range";
class App extends React.Component {
  render() {
    return <DateRange onChange={(start, end) => console.log("onChange", start, end)} />;
  }
}
ReactDOM.render(<App />, mountNode);
```

### 自定义容器样式

通过设置`style`参数自定义容器样式

```jsx
import "@sdp.nd/md-date-range/lib/style/";
import DateRange from "@sdp.nd/md-date-range";
class App extends React.Component {
  render() {
    return <DateRange style={{ backgroundColor: "gray" }} />;
  }
}
ReactDOM.render(<App />, mountNode);
```

## API

| 参数               | 说明               | 类型                               | 默认值          | 是否必填 |
| ------------------ | ------------------ | ---------------------------------- | --------------- | -------- |
| onChange           | 时间范围变化时回调 | Function(start:moment, end:moment) | -               | false    |
| onDateRangeLoading | 初始化结束回调     | Function(start:moment, end:moment) | -               | false    |
| locale             | 语言包             | Object                             | -               | false    |
| className          | 容器节点样式类名称 | string                             | -               | false    |
| style              | 容器节点样式       | Object                             | -               | false    |
| prefixCls          | 组件样式类名称前缀 | string                             | 'md-date-range' | false    |
