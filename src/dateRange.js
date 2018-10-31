import React from 'react'
import { Select, DatePicker } from 'fish'
import moment from 'moment'
import defaultLocale from './locale/zh-CN'
import classnames from 'classnames'
const RangePicker = DatePicker.RangePicker
const DEFAULT_RANGE = [null, null]
const DEFAULT_SELECT = 'week'
export default class DateRange extends React.Component {
  static defaultProps = {
    prefixCls: 'md-date-range'
  }
  static propTypes = {
    locale: React.PropTypes.object,
    prefixCls: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onDateRangeLoading: React.PropTypes.func
  }
  state = {
    showCustom: false,
    selectValue: DEFAULT_SELECT
  }
  getRangeBySelectValue = value => {
    if (value === 'all') {
      return DEFAULT_RANGE
    }
    let nowStart = moment()
    let nowEnd = moment()
    if (value === 'lastWeek') {
      nowStart = moment().subtract(7, 'days')
      nowEnd = moment().subtract(7, 'days')
      value = 'week'
    }
    return [nowStart.startOf(value), nowEnd.endOf(value)]
  }
  handleSelectChange = value => {
    const range = this.getRangeBySelectValue(value)
    this.setState({ selectValue: value, showCustom: false })
    this.changeRangeDate(range)
  }
  onChangeRange = timeRange => {
    this.setState({
      selectValue: timeRange[0] ? 'custom' : 'all',
      showCustom: timeRange[0]
    })
    this.changeRangeDate(timeRange)
  }
  changeRangeDate = timeRange => {
    this.setState({ value: timeRange })
    this.props.onChange && this.props.onChange(timeRange[0], timeRange[1])
  }
  componentDidMount() {
    let timeRange = this.getRangeBySelectValue(this.state.selectValue)
    if (!timeRange) {
      timeRange = DEFAULT_RANGE
    }
    this.setState({ value: timeRange })
    this.props.onDateRangeLoading && this.props.onDateRangeLoading(timeRange[0], timeRange[1])
  }
  render() {
    const { locale = defaultLocale, prefixCls, className, style } = this.props

    return (
      <div className={classnames(className, `${prefixCls}-dateselect-wrapper`)} style={style}>
        <Select
          className={`${prefixCls}-week-select`}
          onChange={this.handleSelectChange}
          value={this.state.selectValue}
        >
          <Select.Option value="day" title={locale['date.range.day']}>
            {locale['date.range.day']}
          </Select.Option>
          <Select.Option value="week" title={locale['date.range.week']}>
            {locale['date.range.week']}
          </Select.Option>
          <Select.Option value="lastWeek" title={locale['date.range.lastWeek']}>
            {locale['date.range.lastWeek']}
          </Select.Option>
          <Select.Option value="month" title={locale['date.range.month']}>
            {locale['date.range.month']}
          </Select.Option>
          <Select.Option value="all" title={locale['date.range.all']}>
            {locale['date.range.all']}
          </Select.Option>
          <Select.Option
            value="custom"
            title={locale['date.range.custom']}
            style={{ display: this.state.showCustom ? 'block' : 'none' }}
          >
            {locale['date.range.custom']}
          </Select.Option>
        </Select>
        <RangePicker value={this.state.value} pickerInputClass={`${prefixCls}-date-select`} onChange={this.onChangeRange} />
      </div>
    )
  }
}
