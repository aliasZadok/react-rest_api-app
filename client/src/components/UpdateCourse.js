import React, { Component } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {

  constructor() {
    super();
    this.state = {
      userId: '',
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      errors: []
    }
  }

  getCourseByIdHandler = () => {
    this.props.context.data.getCourseById(this.props.match.params.id)
      .then( res => {
        if (res == null) {
          this.props.history.push('/notFound')
        } else {
          if (this.props.context.authenticatedUser.id === res.userId) {
            const {
              title,
              description,
              estimatedTime,
              materialsNeeded,
              errors
            } = res;

            this.setState({
              title,
              description,
              estimatedTime,
              materialsNeeded,
              errors
            });
          } else {
            this.props.history.push('/forbidden')
          }
        }
      })
      .catch(err => this.props.history.push('/error'));
  }

  componentDidMount(){
    this.getCourseByIdHandler();
  }

  render(){

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    return(
      <div class="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <div class="grid-66">
                <div class="course--header">
                  <h4 class="course--label">Course</h4>
                  <div>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      class="input-title course--title--input"
                      placeholder="Course title..."
                      value={title}
                      onChange={this.change}/>
                  </div>
                  <p>By {this.props.context.authenticatedUser.firstName} {this.props.context.authenticatedUser.lastName}</p>
                </div>
                <div class="course--description">
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      class=""
                      value={description}
                      onChange={this.change}
                      placeholder="Course description...">
                    </textarea>
                  </div>
                </div>
              </div>
              <div class="grid-25 grid-right">
                <div class="course--stats">
                  <ul class="course--stats--list">
                    <li class="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          class="course--time--input"
                          placeholder="Hours"
                          value={estimatedTime}
                          onChange={this.change}/>
                        </div>
                    </li>
                    <li class="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          class=""
                          value={materialsNeeded}
                          onChange={this.change}
                          placeholder="List materials...">
                        </textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          )}/>
        </div>
      </div>
    );

  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;

    const {
      userId,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const course = {
      userId,
      title,
      description,
      estimatedTime,
      materialsNeeded
    };

    const {emailAddress, password} = this.props.context

    context.data.updateCourse(this.props.match.params.id, course, emailAddress, password)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push('/')
        }
      })
      .catch( err => {
        this.props.history.push('/error')
      });;

  }

  cancel = () => {
    this.props.history.goBack();
  }
}
