import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class FormTextInput extends Component {
  render() {
    const { input, label,  ...props } = this.props;
    return (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <FormControl type="text" { ...input } />
      </FormGroup>
    )
  }
}

export { FormTextInput }
