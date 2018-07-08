import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Blog extends Component {

    state = {
        note_title: "",
        notes: ""
    };
  
  
    handleInputChange = (event) => {
        const { name, newvalue } = event.target;

        // Set the state for the appropriate input field
        this.setState({
          [name]: newvalue
        });
    };
    
  
    handleFormSubmit = event => {
        event.preventDefault();
        this.setState({ note_title: "", notes: ""});
    };
  
    render() {
      return (
        
            <Form onSubmit={this.setTerm}>
                <FormGroup row>
                    <Col sm={1}/>
                    <Col sm={2}>
                        <Label for="note_title" >Title</Label>
                    </Col>
                    <Col sm={7}>
                        <Input 
                            type="text" 
                            name="note_title" 
                            value={this.props.note_title} 
                            newvalue={this.state.note_title} 
                            onChange={this.handleInputChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={1}/>
                    <Col sm={2}>
                        <Label for="notes">Body</Label>
                    </Col>
                    <Col sm={7}>
                        <Input 
                            type="textarea" 
                            name="notes" 
                            rows={8}
                            value={this.props.notes} 
                            newvalue={this.state.notes} 
                            onChange={this.handleInputChange} 
                        />
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 2, offset: 5 }}>
                    <Button color="primary" onClick={this.handleFormSubmit} >Submit</Button>
                    </Col>
                </FormGroup>
            </Form> 

        
      )
    }
  }