import React, { Component } from 'react'
import './doomsday.css'
import { doomDays } from './doomsday.utils'

const GOOD_JOB_MESSAGE = "Congratulations, you guessed the right day of the week. Here's a new one."
const WRONG_ANSWER_MESSAGE = "Incorrect, would you like to try again?"
const GIVE_UP_MESSAGE = "The correct answer was "

export default class DoomsDay extends Component<{ date: Date, updateDate(date: Date): any }, { dayOfWeek: number, message: string, submitWasPressed: boolean }> {
    constructor(props) {
        super(props)
        this.state = {
            dayOfWeek: null,
            message: "",
            submitWasPressed: false
        }
        this.props.updateDate(this.generateNewDate())
    }

    updateDayOfWeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ dayOfWeek: parseInt(event.currentTarget.value) })
    }

    generateNewDate = () => {
        const randomYear = Math.floor(1700 + Math.random() * (399)) // 1700-2099
        const randomMonth = Math.floor(Math.random() * 12)
        const month = new Date(randomYear, randomMonth, 0) // Used to get num of days as 0 days makes it roll to the end of the month
        const randomDay = 1 + Math.random() * (month.getDate() - 1)
        return new Date(randomYear, randomMonth, randomDay)
    }

    submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const isCorrectDate = this.props.date.getDay() === this.state.dayOfWeek
        if (isCorrectDate) {
            const newDate = this.generateNewDate()
            this.props.updateDate(newDate)
            this.setState({
                message: GOOD_JOB_MESSAGE,
                submitWasPressed: false,
                dayOfWeek: null
            })
        } else {
            this.setState({
                message: `${WRONG_ANSWER_MESSAGE}`,
                submitWasPressed: true
            })
        }
    }
    giveUp = (event: React.FormEvent<HTMLButtonElement>) => {
        this.setState({
            message: `${GIVE_UP_MESSAGE}${doomDays[this.props.date.getDay()].name}.`,
            submitWasPressed: false
        })
    }
    render() {
        return (
            <section className="doomsday">
                <h2 style={{ textAlign: "center" }}>What is the day of this date:</h2>
                <div style={{fontSize:"1.5em", fontWeight: "bold"}}>{this.props.date.toLocaleDateString()}</div>
                {this.state.message ? <div>{this.state.message}</div> : <div></div>}
                <form className="option-group" onSubmit={this.submit}>
                    {Object.entries(doomDays).map(([k, v], idx) => (
                        <div className="option" key={`${k}-${v.name}`}>
                            <input checked={this.state.dayOfWeek === parseInt(k)} onChange={this.updateDayOfWeek} id={v.name} type="radio" name="day" value={k} />
                            <div className="radio"></div>
                            <label htmlFor={v.name}>{v.name}</label>
                        </div>
                    ))}
                    <div className="button-group">
                        <button type="submit">Submit</button>
                        {this.state.submitWasPressed ? <button onClick={this.giveUp}>Give up?</button> : ""}
                    </div>
                </form>
            </section>
        )
    }
}
