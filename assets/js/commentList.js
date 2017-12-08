import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import styled from 'styled-components';


class MainComponent extends Component {
  render() {
    console.log("-----");
    console.log(this.props.data);
    console.log("-----");
    if(this.props.data && this.props.data.commentAdded){
      return (<div>{this.props.data.commentAdded}</div>);
    } else{
      return (<div>loading...</div>);
    }
  }
}

const query = gql`
subscription{
  commentAdded
}`

export default (graphql(query))(MainComponent);
