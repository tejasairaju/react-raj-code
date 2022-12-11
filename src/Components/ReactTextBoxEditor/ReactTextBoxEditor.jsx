import React, { Component } from "react";
import { useState } from "react";
import RichTextEditor from "react-rte";

const ReactTextBoxEditor = ({ markup = '', onChangeGuidance = () => { } }) => {
    let value_lib = RichTextEditor.createValueFromString(markup, "html");
    const [value, setValue] = useState(value_lib);

    const onChange = (value_1) => {
        setValue(value_1);
        onChangeGuidance(value_1.toString("html"));
        // if (this.props.onChange) {
        //   // Send the changes up to the parent component as an HTML string.
        //   // This is here to demonstrate using `.toString()` but in a real app it
        //   // would be better to avoid generating a string on each change.
        //   this.props.onChange(value.toString("html"));
        // }
    };
    return <RichTextEditor value={value} onChange={onChange} />;
}


export default ReactTextBoxEditor;