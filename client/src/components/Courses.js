import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Courses extends Component {

  constructor() {
    super();
    this.state = {
      courses: []
    }
  }

// handles getCourse()
  getCoursesHandler = () => {
    this.props.context.data.getCourse()
      .then(course => this.setState({ courses: course.courses }))
      .catch(err => this.props.history.push('/error'));
  }

// initiating subscription of getCoursesHandler() to the Component
  componentDidMount(){
    this.getCoursesHandler();
  }

  render() {
    const courses = this.state.courses.map( course => {
      return(
        <div class="grid-33" key={course.id}>
          <Link class="course--module course--link" to={`/courses/${course.id}`}>
            <h4 class="course--label">Course</h4>
            <h3 class="course--title">{course.title}</h3>
          </Link>
        </div>
      )
    })
    return (
      <div class="bounds">
        {courses}
        <div class="grid-33"><Link class="course--module course--add--module" to="/courses/create">
            <h3 class="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" class="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </Link></div>
      </div>
    );
  }
}
