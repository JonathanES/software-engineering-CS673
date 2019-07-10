import React, { Component } from 'react';

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <div className='ProjectForm'>
        <div className='ProjectForm\_inner'>
          <h1>{this.props.text}</h1>
          <button onClick={this.props.closeProjectForm}>close me</button>
        </div>
      </div>
    );
  }
}

export default ProjectForm;

