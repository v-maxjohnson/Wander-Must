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
        <Form onSubmit={this.setTerm}>
            <FormGroup row>
                <Col sm={1}></Col>
                <Label for="notes_title" sm={4}>Title</Label>
                <Col sm={5}>
                <Input type="text" name="note_title" placeholder="THE ENDLESS SUMMER" value={this.state.term} onChange={this.handleTermChange}/>
                </Col>
                <Col sm={2}>
                </Col>
            </FormGroup>
                <FormGroup row>
                <Label for="exampleEmail" sm={3}>Body</Label>
                <Col sm={9}>
                <Input type="textarea" name="notes" placeholder="Please tell us about your trip!" />
                </Col>
            </FormGroup>
        </Form> 

        </div>
      )
    }
  }