import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import styled from 'styled-components';


class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.value);
    this.props.mutate({
      variables: { comment: this.state.value }
    })
    .then(({ data }) => {
      console.log("came back");
    }).catch((error) => {
      console.log("error");
    });
    event.preventDefault();
  }
  render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
}

const createComment = gql`
  mutation($comment: String){
    submitComment(comment: $comment)
  }
`;

export default (graphql(createComment)(MainComponent));
