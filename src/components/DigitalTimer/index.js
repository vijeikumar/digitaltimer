// Write your code here

import {Component} from 'react'

import './index.css'

const initialTimer = {
  isTimerRunning: false,
  timeLapsedInSeconds: 0,
  timeLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialTimer

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onDecreaseTimerInMinutes = () => {
    const {timeLimitInMinutes} = this.state
    if (timeLimitInMinutes > 1) {
      this.setState(prevValue => ({
        timeLimitInMinutes: prevValue.timeLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerInMinutes = () => {
    this.setState(prevValue => ({
      timeLimitInMinutes: prevValue.timeLimitInMinutes + 1,
    }))
  }

  renderInnerLimitContainer = () => {
    const {timeLimitInMinutes, timeLapsedInSeconds} = this.state
    const isButtonDisabled = timeLapsedInSeconds > 0
    return (
      <div className="time-limit-controller-container">
        <p className="limit-label">Set Timer Limit</p>
        <div className="time-limit-controller">
          <button
            className="limit-controller-button"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onDecreaseTimerInMinutes}
          >
            -
          </button>
          <div className="limit-label-value-container">
            <p className="limit-value">{timeLimitInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onIncreaseTimerInMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialTimer)
  }

  incrementTimerElapsedInSeconds = () => {
    const {timeLapsedInSeconds, timeLimitInMinutes} = this.state
    const isTimerCompleted = timeLapsedInSeconds === timeLimitInMinutes * 60
    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevValue => ({
        timeLapsedInSeconds: prevValue.timeLapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeLapsedInSeconds, timeLimitInMinutes} = this.state
    const isTimerCompleted = timeLapsedInSeconds === timeLimitInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timeLapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimerElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="timer-controller-container">
        <button
          type="button"
          className="timer-controller-button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImageUrl}
            alt={startOrPauseAltText}
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'start'}
          </p>
        </button>
        <button
          className="timer-controller-button"
          type="button"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="timer-controller-icon"
            alt="reset icon"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getLapsedSecondsInTimeFormat = () => {
    const {timeLapsedInSeconds, timeLimitInMinutes} = this.state
    const totalRemainingSeconds = timeLimitInMinutes * 60 - timeLapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimeRunning} = this.state
    const labelText = isTimeRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-container">
              <h1 className="elapsed-time">
                {this.getLapsedSecondsInTimeFormat()}
              </h1>
              <p className="time-state">{labelText}</p>
            </div>
          </div>
          <div className="controller-container">
            {this.renderTimerController()}
            {this.renderInnerLimitContainer()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
