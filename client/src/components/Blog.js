import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Blog extends Component {

  
    // componentDidMount() {
    //   this.makeYelpCall();
    // }
  
  
    // handleTermChange = (event) => {
    //   this.setState({
    //     term: event.target.value
    //   });
    // };
    
  
    // setTerm = (event) =>{
    //   event.preventDefault();
      
    //   this.makeYelpCall();
    // }
  
    render() {
      return (
        <div className="blog-wrapper">
            <h3> Title </h3>
            <p> hi   {this.props.notes} </p>

        </div>
      )
    }
  }