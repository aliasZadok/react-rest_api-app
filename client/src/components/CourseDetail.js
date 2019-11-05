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

  getCourseByIdHandler = () => {
    this.props.context.data.getCourseById(this.props.match.params.id)
      .then( courseDetail => {
        if(courseDetail !== null) {
          this.setState({course: courseDetail});
        } else {
          this.props.history.push('/notfound');
        }
      })
      .catch(err => this.props.history.push('/error'));
  }

  componentDidMount(){
    this.getCourseByIdHandler();
  }

  render() {
    const { authenticatedUser } = this.props.context;
    const { course } = this.state;

    if (course) {
      console.log(course);
    }
    return(
      <div>
        
      </div>
    );
  }

  deleteCourse = () => {
    const { username, password } = this.props.context;
    this.props.context.data.deleteCourse(this.props.match.params.id, username, password)
      .then(() => this.props.history.push('/'));
  }
}
