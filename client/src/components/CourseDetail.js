import React, { Component } from 'react';
import {Link} from 'react-router-dom';
const ReactMarkdown = require('react-markdown');

export default class CourseDetail extends Component {

  constructor() {
    super();
    this.state = {
      course: []
    }
  }

// handles getCourseById()
  getCourseByIdHandler = () => {
    this.props.context.data.getCourseById(this.props.match.params.id)
      .then( courseDetail => {
        if(courseDetail !== null) {
          this.setState({course: courseDetail.course[0]});
        } else {
          this.props.history.push('/notfound');
        }
      })
      .catch(err => this.props.history.push('/error'));
  }

// initiating subscription of getCourseByIdHandler() to the Component
  componentDidMount(){
    this.getCourseByIdHandler();
  }

  render() {
    const { authenticatedUser } = this.props.context;
    const { course } = this.state;

    return(
      <div>
        <div class="actions--bar">
          <div class="bounds">
            <div class="grid-100">
              {
                authenticatedUser && authenticatedUser.id === course.userId ?
                <React.Fragment>
                  <span>
                    <Link class="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                    <Link class="button" onClick={this.deleteCourse} to="#">Delete Course</Link>
                  </span>
                </React.Fragment> : <React.Fragment> </React.Fragment>
              }
              <Link class="button button-secondary" to="/">Return to List</Link>
            </div>
          </div>
        </div>
        <div class="bounds course--detail">
          <div class="grid-66">
            <div class="course--header">
              <h4 class="course--label">Course</h4>
              <h3 class="course--title">{course.title}</h3>
              {
                course.userDetails ?
                  <React.Fragment>
                    <p>
                      By {course.userDetails.firstName} {course.userDetails.lastName}
                    </p>
                  </React.Fragment>
                  :
                  null
              }
            </div>
            <div class="course--description">
              <ReactMarkdown source={course.description}/>
            </div>
          </div>
          <div class="grid-25 grid-right">
            <div class="course--stats">
              <ul class="course--stats--list">
                <li class="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime}</h3>
                </li>
                <li class="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <ReactMarkdown source={course.materialsNeeded}/>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

// Handles deleteCourse()
  deleteCourse = () => {
    const { emailAddress, password } = this.props.context;
    this.props.context.data.deleteCourse(this.props.match.params.id, emailAddress, password)
      .then(() => this.props.history.push('/'));
  }
}
