import React, { Component } from 'react';
import gql from "graphql-tag";

const GET_USER_QUERY = gql`
      query getUser( $id: ID ){
        getUser(id: $id) {
          user_image
      }
    }`;

export default class Cloudinary extends Component {
	
	componentDidMount() {
    // get url from database here instead of just the sample
    client.query({
      query: GET_USER_QUERY,
      variables: { id: this.state.loggedInUserId }
    })
      .then(result => {
        this.props.setUserImageSrc(result.user_image);
        console.log(this.props.userData);
    })

	}	

  render() {
    return (
      <div className="cloudinary">
        { this.props.children }
      </div>
    )
  }
}