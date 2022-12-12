import React, { Component } from "react";
import RichTextEditor from "react-rte";

export default class MyStatefulEditor extends Component {
  value = RichTextEditor.createValueFromString(this.props.markup, "html");
  state = {
    value: this.value
  };

  componentDidMount() {
    console.log(this.props.markup);
    this.setState({ value:  RichTextEditor.createValueFromString(this.props.markup, "html") });
  }

  onChange = (value) => {
    this.setState({ value });
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(value.toString("html"));
    }
  };

  render() {
    return <RichTextEditor value={this.state.value} onChange={this.onChange} />;
  }
}
