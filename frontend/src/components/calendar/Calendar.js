import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../css/calendar.css';
import { getListOfProjects, showCategories_old } from '../../socket/projectSocket';
import { getTasksUsers } from '../../socket/taskSocket';
import dateFns from "date-fns";
import CalendarModal from './CalendarModal';

import moment from 'moment'



const mapStateToProps = state => ({
    projectCategoryList: state.project.projectCategoryList,
    userId: state.user.userId,
    isTaskOfDay: state.calendar.isTaskOfDay
});

class CalendarComponent extends Component {
    state = {
        currentMonth: new Date(),
        selectedDate: [],
        tasks: []
    }

    setDate(date) {
        console.log(date);
        this.setState({ milestones: date });
    }

    async test2(project, array) {
        return new Promise((resolve, reject) => {
            showCategories_old(project.projectID, (err, projectCategoryList) => {
                for (let category of projectCategoryList) {
                    array.push(category)
                }
                resolve(array);
            });
        })

    }

    async test() {
        return new Promise((resolve, reject) => {
            const array = [];
            getListOfProjects(this.props.userId, async (err, listOfProjects) => {
                for (let project of listOfProjects) {
                    const res = await this.test2(project, array);
                    res.forEach(elt => {
                        array.push(elt);
                    })
                }
                resolve(array);
            });
        })
    }
    async getTask() {
        return new Promise((resolve, reject) => {
            getTasksUsers(this.props.userId, (err, data) => {
                resolve(data);
            });
        })

    }
    async componentDidMount() {
        //let res = await this.test();
        let tasks = await this.getTask();
        console.log(tasks);
        let date = tasks.map(elt => elt.dueDate);
        this.setState({ selectedDate: date, tasks: tasks });
    }

    renderHeader() {
        const dateFormat = "MMMM YYYY";

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
              </div>
                </div>
                <div className="col col-center">
                    <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "dddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    }

    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${
                            !dateFns.isSameMonth(day, monthStart)
                                ? "disabled"
                                : (selectedDate.find(elt => dateFns.isSameDay(day, elt))) ? "selected" : ""
                            }`}
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    onDateClick = day => {
        let taskOfDay = [];
        this.state.tasks.forEach(task => {
            if (moment(task.dueDate).format('DD-MM-YY') == moment(day).format('DD-MM-YY'))
                taskOfDay.push(task)
        })
        if (taskOfDay.length > 0)
            this.props.dispatch({ type: "USER_DEMAND_TASK_OF_DAY", taskOfDay: taskOfDay });
    };

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    render() {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
                {this.props.isTaskOfDay && <CalendarModal />}
            </div>
        );
    }
    // onClickDay = date => {
    //     const listOfDates = this.state.date;
    //     listOfDates.forEach(elt => {
    //         if (moment(elt).format('DD/MM/YY') == moment(date).format('DD/MM/YY'))
    //             alert(date);
    //     })
    //     this.setState({ date: [new Date('08/08/2019'), new Date(),new Date('08/09/2019')] })
    // }

    // render() {
    //     return (
    //         <div class="center">
    //             <Calendar
    //                 value={this.state.date}
    //                 onClickDay={this.onClickDay}
    //             />
    //             {/* <Calendar
    //                 localizer={localizer}
    //                 events={this.state.date}
    //                 startAccessor="start"
    //                 endAccessor="end"
    //             /> */}
    //         </div>
    //     );
    // }
}


export default connect(mapStateToProps)(CalendarComponent);
