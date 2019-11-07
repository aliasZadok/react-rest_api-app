import config from './config';

export default class Data {

  /**
   * [api description]
   * @param  {[type]}  path                 [description]
   * @param  {String}  [method='GET']       [description]
   * @param  {[type]}  [body=null]          [description]
   * @param  {Boolean} [requiresAuth=false] [description]
   * @param  {[type]}  [credentials=null]   [description]
   * @return {[type]}                       [description]
   */
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

/**
 * [getUser description]
 * @param  {[type]}  emailAddress [description]
 * @param  {[type]}  password     [description]
 * @return {Promise}              [description]
 */
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

/**
 * [createUser description]
 * @param  {[type]}  user [description]
 * @return {Promise}      [description]
 */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

/**
 * [getCourse description]
 * @return {Promise} [description]
 */
  async getCourse() {
    const response = await this.api(`/courses`, 'GET');
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error();
    }
  }

/**
 * [getCourseById description]
 * @param  {[type]}  id [description]
 * @return {Promise}    [description]
 */
  async getCourseById(id) {
    const response = await this.api(`/courses/${id}`, 'GET');
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      throw new Error('404 not found');
    } else {
      throw new Error();
    }
  }

/**
 * [createCourse description]
 * @param  {[type]}  course       [description]
 * @param  {[type]}  emailAddress [description]
 * @param  {[type]}  password     [description]
 * @return {Promise}              [description]
 */
  async createCourse(course, emailAddress, password) {
    const response = await this.api(`/courses`, 'POST', course, true ,{ emailAddress, password });
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
         return data.errors;
       });
    }
    else {
      throw new Error();
    }
  }

/**
 * [updateCourse description]
 * @param  {[type]}  id           [description]
 * @param  {[type]}  course       [description]
 * @param  {[type]}  emailAddress [description]
 * @param  {[type]}  password     [description]
 * @return {Promise}              [description]
 */
  async updateCourse(id, course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password });
    if(response.status === 204){
      return []
    } else if (response.status === 400) {
      return response.json().then(data => {
         return data.errors;
       });
    } else {
      throw new Error();
    }
  }

/**
 * [deleteCourse description]
 * @param  {[type]}  id           [description]
 * @param  {[type]}  emailAddress [description]
 * @param  {[type]}  password     [description]
 * @return {Promise}              [description]
 */
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password });
    if (response.status !== 204 && response.status !== 403) {
      throw new Error();
    }
  }
}
