import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Blog extends Component {
    state = {
        note_title: "",
        notes: "",
        suitcase_image: ""
    }

    componentDidMount(){
        this.setState({
            note_title: this.props.note_title,
            notes: this.props.notes,
            suitcase_image: this.props.suitcase_image
        })        
    }


    handleInputChange = (event) => {
        const { name, value } = event.target;

        // Set the state for the appropriate input field
        this.setState({
            [name]: value
        });
    };


    handleFormSubmit = event => {
        event.preventDefault();
        
        let existingData = {...this.state};
        let updated = {
            note_title: this.state.note_title,
            notes: this.state.notes,
            suitcase_image: this.state.suitcase_image
        };

        Object.keys(updated).forEach( item => updated[item] ? null: delete updated[item] );

        updated = {...existingData, ...updated};
        console.log(updated);
    };

    render() {
        return (
            <div className="blog">
                <Form onSubmit={this.setTerm}>
                    <FormGroup row>
                        <Col sm={1} />
                        <Col sm={2}>
                            <Label for="note_title" >Title</Label>
                        </Col>
                        <Col sm={7}>
                            <Input
                                type="text"
                                name="note_title"
                                placeholder={this.props.note_title}
                                value={this.state.note_title}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={1} />
                        <Col sm={2}>
                            <Label for="notes">Body</Label>
                        </Col>
                        <Col sm={7}>
                            <Input
                                type="textarea"
                                name="notes"
                                rows={8}
                                value={this.state.notes}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={1} />
                        <Col sm={5}>
                            <Label for="exampleFile">Your city-scape</Label>
                            <Input type="file" name="file" id="exampleFile" />
                            <FormText color="muted">
                            Choose a photo for your suitcase! If you don't care, we can provide you with a skyline.
                            </FormText>
                        </Col>
                         <Col sm={5}>
                            <div className="currentSuitcaseImage border">
                                <img width="100%" src={this.state.suitcase_image} alt="suitcase background"/>
                            </div>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 2, offset: 5 }}>
                            <Button color="primary" onClick={this.handleFormSubmit} >Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>

                <div className="row">
                    <div className="col-12 text-center">
                        {this.props.loggedInUserIdNumber === this.props.suitcaseUserId ? (
                            <button className="btn btn-primary" onClick={() => { this.props.showConfirmationModal() }}><i className="fa fa-trash mr-2"></i> Delete this suitcase</button>
                        ) : (<div></div>
                            )}
                    </div>
                </div>

            </div>
        )
    }
}