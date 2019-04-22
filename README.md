# 滑动条

---

基于 rc-slider 开发的 ui 组件：滚动条

## 何时使用

- 当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。

## 浏览器支持

IE 9+

## 安装

```bash
npm install @sdp.nd/rc-slider --save
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

### handle

```jsx
import '@sdp.nd/rc-slider/lib/style/';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import Slider from '@sdp.nd/rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const wrapperStyle = { width: 400, margin: 50 };
ReactDOM.render(
  <div>
    <div style={wrapperStyle}>
      <p>Slider with custom handle</p>
      <Slider min={0} max={20} defaultValue={3} handle={handle} />
    </div>
    <div style={wrapperStyle}>
      <p>Slider with fixed values</p>
      <Slider min={20} defaultValue={20} marks={{ 20: 20, 40: 40, 100: 100 }} step={null} />
    </div>
    <div style={wrapperStyle}>
      <p>Range with custom handle</p>
      <Range min={0} max={20} defaultValue={[3, 10]} tipFormatter={value => `${value}%`} />
    </div>
  </div>,
  mountNode
);
```

### marks

```jsx
import '@sdp.nd/rc-slider/lib/style/';
import Slider from '@sdp.nd/rc-slider';

const style = { width: 400, margin: 50 };
const marks = {
  '-10': '-10°C',
  0: <strong>0°C</strong>,
  26: '26°C',
  37: '37°C',
  50: '50°C',
  100: {
    style: {
      color: 'red',
    },
    label: <strong>100°C</strong>,
  },
};

function log(value) {
  console.log(value); //eslint-disable-line
}

ReactDOM.render(
  <div>
    <div style={style}>
      <p>Slider with marks, `step=null`</p>
      <Slider min={-10} marks={marks} step={null} onChange={log} defaultValue={20} />
    </div>
    <div style={style}>
      <p>Slider with marks and steps</p>
      <Slider dots min={-10} marks={marks} step={10} onChange={log} defaultValue={20} />
    </div>

    <div style={style}>
      <p>Slider with marks, `included=false`</p>
      <Slider min={-10} marks={marks} included={false} defaultValue={20} />
    </div>
    <div style={style}>
      <p>Slider with marks and steps, `included=false`</p>
      <Slider min={-10} marks={marks} step={10} included={false} defaultValue={20} />
    </div>

    <div style={style}>
      <p>Range with marks</p>
      <Slider.Range min={-10} marks={marks} onChange={log} defaultValue={[20, 25, 30, 40]} />
    </div>
    <div style={style}>
      <p>Range with marks and steps</p>
      <Slider.Range min={-10} marks={marks} step={10} onChange={log} defaultValue={[20, 40]} />
    </div>
  </div>
  , mountNode);
```

### range

```jsx
import '@sdp.nd/rc-slider/lib/style/';
import Slider from '@sdp.nd/rc-slider';

const Range = Slider.Range;

const style = { width: 400, margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}

class CustomizedRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lowerBound: 20,
      upperBound: 40,
      value: [20, 40],
    };
  }
  onLowerBoundChange = (e) => {
    this.setState({ lowerBound: +e.target.value });
  }
  onUpperBoundChange = (e) => {
    this.setState({ upperBound: +e.target.value });
  }
  onSliderChange = (value) => {
    log(value);
    this.setState({
      value,
    });
  }
  handleApply = () => {
    const { lowerBound, upperBound } = this.state;
    this.setState({ value: [lowerBound, upperBound] });
  }
  render() {
    return (
      <div>
        <label>LowerBound: </label>
        <input type="number" value={this.state.lowerBound} onChange={this.onLowerBoundChange} />
        <br />
        <label>UpperBound: </label>
        <input type="number" value={this.state.upperBound} onChange={this.onUpperBoundChange} />
        <br />
        <button onClick={this.handleApply}>Apply</button>
        <br /><br />
        <Range allowCross={false} value={this.state.value} onChange={this.onSliderChange} />
      </div>
    );
  }
}

class DynamicBounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      max: 100,
    };
  }
  onSliderChange = (value) => {
    log(value);
  }
  onMinChange = (e) => {
    this.setState({
      min: +e.target.value || 0,
    });
  }
  onMaxChange = (e) => {
    this.setState({
      max: +e.target.value || 100,
    });
  }
  render() {
    return (
      <div>
        <label>Min: </label>
        <input type="number" value={this.state.min} onChange={this.onMinChange} />
        <br />
        <label>Max: </label>
        <input type="number" value={this.state.max} onChange={this.onMaxChange} />
        <br /><br />
        <Range defaultValue={[20, 50]} min={this.state.min} max={this.state.max}
          onChange={this.onSliderChange}
        />
      </div>
    );
  }
}

class ControlledRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [20, 40, 60, 80],
    };
  }
  handleChange = (value) => {
    this.setState({
      value,
    });
  }
  render() {
    return (
      <Range value={this.state.value} onChange={this.handleChange} />
    );
  }
}

class ControlledRangeDisableAcross extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [20, 40, 60, 80],
    };
  }
  handleChange = (value) => {
    this.setState({
      value,
    });
  }
  render() {
    return (
      <Range
        value={this.state.value}
        onChange={this.handleChange}
        allowCross={false}
        {...this.props}
      />
    );
  }
}

// https://github.com/react-component/slider/issues/226
class PureRenderRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: false,
    };
  }
  handleChange = (value) => {
    console.log(value);
    this.setState({
      foo: !this.state.foo,
    });
  }
  render() {
    return (
      <Range defaultValue={[20, 40, 60, 80]} onChange={this.handleChange} allowCross={false} />
    );
  }
}

ReactDOM.render(
  <div>
    <div style={style}>
      <p>Basic Range，`allowCross=false`</p>
      <Range allowCross={false} defaultValue={[0, 20]} onChange={log} />
    </div>
    <div style={style}>
      <p>Basic Range，`step=20` </p>
      <Range step={20} defaultValue={[20, 20]} onBeforeChange={log} />
    </div>
    <div style={style}>
      <p>Basic Range，`step=20, dots` </p>
      <Range dots step={20} defaultValue={[20, 40]} onAfterChange={log} />
    </div>
    <div style={style}>
      <p>Basic Range，disabled</p>
      <Range allowCross={false} defaultValue={[0, 20]} onChange={log} disabled />
    </div>
    <div style={style}>
      <p>Controlled Range</p>
      <ControlledRange />
    </div>
    <div style={style}>
      <p>Controlled Range, not allow across</p>
      <ControlledRangeDisableAcross />
    </div>
    <div style={style}>
      <p>Controlled Range, not allow across, pushable=5</p>
      <ControlledRangeDisableAcross pushable={5} />
    </div>
    <div style={style}>
      <p>Multi Range</p>
      <Range count={3} defaultValue={[20, 40, 60, 80]} pushable />
    </div>
    <div style={style}>
      <p>Multi Range with custom track and handle style</p>
      <Range count={3} defaultValue={[20, 40, 60, 80]} pushable
        trackStyle={[{ backgroundColor: 'red' }, { backgroundColor: 'green' }]}
        handleStyle={[{ backgroundColor: 'yellow' }, { backgroundColor: 'gray' }]}
        railStyle={{ backgroundColor: 'black' }}
      />
    </div>
    <div style={style}>
      <p>Customized Range</p>
      <CustomizedRange />
    </div>
    <div style={style}>
      <p>Range with dynamic `max` `min`</p>
      <DynamicBounds />
    </div>
    <div style={style}>
      <p>Range as child component</p>
      <PureRenderRange />
    </div>
  </div>
  , mountNode);
```

### slider

```jsx
import '@sdp.nd/rc-slider/lib/style/';
import Slider, { createSliderWithTooltip } from '@sdp.nd/rc-slider';

const style = { width: 600, margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}


function percentFormatter(v) {
  return `${v} %`;
}

const SliderWithTooltip = createSliderWithTooltip(Slider);

class NullableSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  onSliderChange = (value) => {
    log(value);
    this.setState({
      value,
    });
  };
  onAfterChange = (value) => {
    console.log(value); //eslint-disable-line
  };
  reset = () => {
    console.log('reset value') // eslint-disable-line
    this.setState({ value: null });
  };
  render() {
    return (
      <div>
        <Slider
          value={this.state.value}
          onChange={this.onSliderChange}
          onAfterChange={this.onAfterChange}
        />
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

class CustomizedSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
    };
  }
  onSliderChange = (value) => {
    log(value);
    this.setState({
      value,
    });
  }
  onAfterChange = (value) => {
    console.log(value); //eslint-disable-line
  }
  render() {
    return (
      <Slider value={this.state.value}
        onChange={this.onSliderChange} onAfterChange={this.onAfterChange}
      />
    );
  }
}

class DynamicBounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 1,
      max: 100,
      step: 10,
      value: 1,
    };
  }
  onSliderChange = (value) => {
    log(value);
    this.setState({value});
  }
  onMinChange = (e) => {
    this.setState({
      min: +e.target.value || 0,
    });
  }
  onMaxChange = (e) => {
    this.setState({
      max: +e.target.value || 100,
    });
  }
  onStepChange = (e) => {
    this.setState({
      step: +e.target.value || 1,
    });
  }
  render() {
    const labelStyle = { minWidth: '60px', display: 'inline-block' };
    const inputStyle = { marginBottom: '10px'};
    return (
      <div>
        <label style={labelStyle}>Min: </label>
        <input type="number" value={this.state.min} onChange={this.onMinChange} style={inputStyle} />
        <br />
        <label style={labelStyle}>Max: </label>
        <input type="number" value={this.state.max} onChange={this.onMaxChange} style={inputStyle} />
        <br />
        <label style={labelStyle}>Step: </label>
        <input type="number" value={this.state.step} onChange={this.onStepChange} style={inputStyle} />
        <br /><br />
        <label style={labelStyle}>Value: </label><span>{this.state.value}</span>
        <br /><br />
        <Slider value={this.state.value} min={this.state.min} max={this.state.max} step={this.state.step}
          onChange={this.onSliderChange}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <div style={style}>
      <p>Basic Slider</p>
      <Slider onChange={log} />
    </div>
    <div style={style}>
      <p>Basic Slider，`step=20`</p>
      <Slider step={20} defaultValue={50} onBeforeChange={log} />
    </div>
    <div style={style}>
      <p>Basic Slider，`step=20, dots`</p>
      <Slider dots step={20} defaultValue={100} onAfterChange={log} />
    </div>
    <div style={style}>
      <p>Basic Slider，`step=20, dots, dotStyle={"{borderColor: 'orange'}"}, activeDotStyle={"{borderColor: 'yellow'}"}`</p>
      <Slider dots step={20} defaultValue={100} onAfterChange={log} dotStyle={{ borderColor: 'orange' }} activeDotStyle={{ borderColor: 'yellow' }} />
    </div>
    <div style={style}>
      <p>Slider with tooltip, with custom `tipFormatter`</p>
      <SliderWithTooltip
        tipFormatter={percentFormatter}
        tipProps={{ overlayClassName: 'foo' }}
        onChange={log}
      />
    </div>
    <div style={style}>
      <p>Slider with custom handle and track style.<strong>(old api, will be deprecated)</strong></p>
      <Slider
        defaultValue={30}
        railStyle={{ backgroundColor: 'red', height: 10 }}
        trackStyle={{ backgroundColor: 'blue', height: 10 }}
        handleStyle={{
          borderColor: 'blue',
          height: 28,
          width: 28,
          marginLeft: -14,
          marginTop: -9,
          backgroundColor: 'black',
        }}
      />
    </div>
    <div style={style}>
      <p>Slider with custom handle and track style.<strong>(The recommended new api)</strong></p>
      <Slider
        defaultValue={30}
        trackStyle={{ backgroundColor: 'blue', height: 10 }}
        handleStyle={{
          borderColor: 'blue',
          height: 28,
          width: 28,
          marginLeft: -14,
          marginTop: -9,
          backgroundColor: 'black',
        }}
        railStyle={{ backgroundColor: 'red', height: 10 }}
      />
    </div>
    <div style={style}>
      <p>Basic Slider, disabled</p>
      <Slider onChange={log} disabled />
    </div>
    <div style={style}>
      <p>Controlled Slider</p>
      <Slider value={50} />
    </div>
    <div style={style}>
      <p>Customized Slider</p>
      <CustomizedSlider />
    </div>
    <div style={style}>
      <p>Slider with null value and reset button</p>
      <NullableSlider />
    </div>
    <div style={style}>
      <p>Slider with dynamic `min` `max` `step`</p>
      <DynamicBounds />
    </div>
  </div>
  , mountNode);

```

### vertical

```jsx
import '@sdp.nd/rc-slider/lib/style/';
import Slider from '@sdp.nd/rc-slider';

const style = { float: 'left', width: 160, height: 400, marginBottom: 160, marginLeft: 50 };
const parentStyle = { overflow: 'hidden' };
const pStyle = { marginBottom: 20 };

const marks = {
  '-10': '-10°C',
  0: <strong>0°C</strong>,
  26: '26°C',
  37: '37°C',
  50: '50°C',
  100: {
    style: {
      color: 'red',
    },
    label: <strong>100°C</strong>,
  },
};

function log(value) {
  console.log(value); //eslint-disable-line
}

ReactDOM.render(
  <div style={parentStyle}>
    <div style={style}>
      <p style={pStyle}>Slider with marks, `step=null`</p>
      <Slider vertical min={-10} marks={marks} step={null} onChange={log} defaultValue={20} />
    </div>
    <div style={style}>
      <p style={pStyle}>Slider with marks and steps</p>
      <Slider vertical dots min={-10} marks={marks} step={10} onChange={log} defaultValue={20} />
    </div>
    <div style={style}>
      <p style={pStyle}>Slider with marks, `included=false`</p>
      <Slider vertical min={-10} marks={marks} included={false} defaultValue={20} />
    </div>
    <div style={style}>
      <p style={pStyle}>Slider with marks and steps, `included=false`</p>
      <Slider vertical min={-10} marks={marks} step={10} included={false} defaultValue={20} />
    </div>
    <div style={style}>
      <p style={pStyle}>Range with marks</p>
      <Slider.Range vertical min={-10} marks={marks} onChange={log} defaultValue={[20, 40]} />
    </div>
    <div style={style}>
      <p style={pStyle}>Range with marks and steps</p>
      <Slider.Range vertical min={-10} marks={marks} step={10}
        onChange={log} defaultValue={[20, 40]}
      />
    </div>
  </div>
  , mountNode);
```

## API

### createSliderWithTooltip(Slider | Range) => React.Component

An extension to make Slider or Range support Tooltip on handle.

```
const Slider = require('@sdp.nd/rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
```

[Online demo](http://react-component.github.io/slider/examples/handle.html)

After Range or Slider was wrapped by createSliderWithTooltip, it will have the following props:

| Name         | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| tipFormatter | (value: number): React.ReactNode | `value => value` | A function to format tooltip's overlay |
| tipProps | Object | `{` <br>`placement: 'top',` <br> ` prefixCls: 'rc-slider-tooltip',` <br> `overlay: tipFormatter(value)` <br> `}` | A function to format tooltip's overlay |

### Common API

The following APIs are shared by Slider and Range.

| Name         | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| className | string | `''` | Additional CSS class for the root DOM node |
| min | number | `0` | The minimum value of the slider |
| max | number | `100` | The maximum value of the slider |
| marks | `{number: string}` or`{number: { style, label }}` | `{}` | Marks on the slider. The key determines the position, and the value determines what will show. If you want to set the style of a specific mark point, the value should be an object which contains `style` and `label` properties. |
| step | number or `null` | `1` | Value to be added or subtracted on each step the slider makes. Must be greater than zero, and `max` - `min` should be evenly divisible by the step value. <br /> When `marks` is not an empty object, `step` can be set to `null`, to make `marks` as steps. |
| vertical | boolean | `false` | If vertical is `true`, the slider will be vertical. |
| handle | (props) => React.ReactNode | | A handle generator which could be used to customized handle. |
| included | boolean | `true` | If the value is `true`, it means a continuous value interval, otherwise, it is a independent value. |
| disabled | boolean | `false` | If `true`, handles can't be moved. |
| dots | boolean | `false` | When the `step` value is greater than 1, you can set the `dots` to  `true` if you want to render the slider with dots. |
| onBeforeChange | Function | NOOP | `onBeforeChange` will be triggered when `ontouchstart` or `onmousedown` is triggered. |
| onChange | Function | NOOP | `onChange` will be triggered while the value of Slider changing. |
| onAfterChange | Function | NOOP | `onAfterChange` will be triggered when `ontouchend` or `onmouseup` is triggered. |
| minimumTrackStyle | Object |  | please use  `trackStyle` instead. (`only used for slider, just for compatibility , will be deprecate at rc-slider@9.x `) |
| maximumTrackStyle | Object |  | please use  `railStyle` instead (`only used for slider, just for compatibility , will be deprecate at rc-slider@9.x`) |
| handleStyle | Array[Object] \| Object | `[{}]` | The style used for handle. (`both for slider(`Object`) and range(`Array of Object`), the array will be used for multi handle following element order`) |
| trackStyle | Array[Object] \| Object | `[{}]` | The style used for track. (`both for slider(`Object`) and range(`Array of Object`), the array will be used for multi track following element order`)|
| railStyle | Object | `{}` | The style used for the track base color.  |
| dotStyle | Object | `{}` | The style used for the dots. |
| activeDotStyle | Object | `{}` | The style used for the active dots. |

### Slider

| Name         | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| defaultValue | number | `0` | Set initial value of slider. |
| value | number | - | Set current value of slider. |
| tabIndex | number | `0` | Set the tabIndex of the slider handle. |

### Range

| Name         | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| defaultValue | `number[]` | `[0, 0]` | Set initial positions of handles. |
| value | `number[]` | | Set current positions of handles. |
| tabIndex | number[] | `[0, 0]` | Set the tabIndex of each handle. |
| count | number | `1` | Determine how many ranges to render, and multiple handles will be rendered (number + 1). |
| allowCross | boolean | `true` | `allowCross` could be set as `true` to allow those handles to cross. |
| pushable | boolean or number | `false` | `pushable` could be set as `true` to allow pushing of surrounding handles when moving a handle. When set to a number, the number will be the minimum ensured distance between handles. Example: ![](http://i.giphy.com/l46Cs36c9HrHMExoc.gif) |
