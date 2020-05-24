import React, { Component, useState } from 'react'
import { CFS, months, isLeapYear, getLocaleDateString, doomDays } from './doomsday.utils'
import './doomsday-reference.css'
export default class DoomsDayReference extends Component<{ date: Date }, { CFSCollapsed: boolean, MDCollapsed: boolean, dayCollapsed: boolean }> {
    constructor(props) {
        super(props)
        this.state = {
            CFSCollapsed: true,
            MDCollapsed: true,
            dayCollapsed: true
        }
    }
    toggleCFSCollapsed = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => this.setState({ CFSCollapsed: !this.state.CFSCollapsed })
    toggleMDCollapsed = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => this.setState({ MDCollapsed: !this.state.MDCollapsed })
    toggleDayCollapsed = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => this.setState({ dayCollapsed: !this.state.dayCollapsed })

    render() {
        const monthRefrenceType = isLeapYear(this.props.date.getFullYear()) ? "leap" : "normal"
        const userDateFormat = getLocaleDateString()
        return (
            <div className="steps">
                <div>{userDateFormat}</div>
                <div>T = yy</div>
                <div>if T is odd then T = T + 11</div>
                <div>T = T / 2</div>
                <div>if T is odd then T = T + 11</div>
                <div>T = T + <button className="link" onClick={this.toggleCFSCollapsed}>CFS</button>[cc]</div>
                {this.state.CFSCollapsed ? "" : <YearReference />}
                <div>T = T + <button className="link" onClick={this.toggleMDCollapsed}>MD</button>[MM]</div>
                {this.state.MDCollapsed ? "" : <MonthReference date={this.props.date} type={monthRefrenceType} />}
                <div>T = T <a target="_blank" href="https://en.wikipedia.org/wiki/Modulo_operation">%</a> 7</div>
                <div><button className="link" onClick={this.toggleDayCollapsed}>Day</button> = dd – T</div>
                {this.state.dayCollapsed ? "" : <DayReference />}
                <div>if Day is negative then Day = 7 - Day </div>
            </div>
        )
    }
}


const YearReference = (props) => (
    <div>
        <div>Mnemonic:</div>
        <div>"No Tuna For Friday"</div>
        <table>
            <thead>
                <tr>
                    <th>Century</th>
                    <th>(CFS) Century's First Sunday</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(CFS).map(([k, v], idx) => (
                    <tr key={`${k}-${v}-${idx}`}>
                        <td>{k}00</td>
                        <td>{v}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)

const MonthReference = (props) => {
    const [state, setState] = useState({ leapReferenceCollapsed: false })
    const toggleLeapYearReferenceCollapsed = (event) => setState({ leapReferenceCollapsed: !state.leapReferenceCollapsed })
    return (
        <div style={{ textAlign: "center" }}>
            <button className="link" onClick={toggleLeapYearReferenceCollapsed}>Leap Year Reference</button>
            {state.leapReferenceCollapsed ? <LeapYearReference /> : ""}
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>First Sunday of the Month</th>
                        <th>Mnemonic</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(months).map(([k, v], idx) => {
                        let date = new Date()
                        date.setMonth(parseInt(k))
                        let month = date.toLocaleString('default', { month: 'long' });
                        return (
                            <tr key={`${idx}-${month}-${v}`}>
                                <td>{month}</td>
                                <td>{v[props.type]}</td>
                                <td>{v.mnemonic}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}


const DayReference = (props) => (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Day Name</th>
                    <th>Day Number</th>
                    <th>Mnemonic</th>
                </tr>
            </thead>
            <tbody>

                {Object.entries(doomDays).map(([k, v], idx) => (
                    <tr>
                        <td>{v.name}</td>
                        <td>{k}</td>
                        <td>{v.mnemonic}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)

const LeapYearReference = (props) => (
    <div className="steps">
        <div>The year is a leap year if</div>
        <div>yyyy % 4 = 0 or yyyy % 400 = 0</div>
        <div>Except It is not if</div>
        <div>yyyy % 100 = 0</div>
        <div>example: 1700 is not a leap year, but 1600 and 2000 are</div>
    </div>
)