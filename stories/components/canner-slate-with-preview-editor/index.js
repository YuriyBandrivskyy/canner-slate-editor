// @flow
import React from "react";
import { Value } from "slate";
import initialValue from "./initialValue";
import CannerEditor from "packages/editors/canner-slate-editor/src";
import { Affix, Button } from "antd";

export default class DemoEditor extends React.Component<*, { value: Value }> {
  // Set the initial state when the app is first constructed.
  state = {
    value: initialValue,
    edit: true
  };

  render() {
    const { value } = this.state;
    const onChange = ({ value }) => this.setState({ value });
    const ButtonGroup = Button.Group;
    return (
      <div style={{ margin: "20px" }} id={"editor"}>
        <CannerEditor
          value={value}
          onChange={onChange}
          serviceConfig={{
            name: "image",
            accept: "image/*",
            action: "https://api.imgur.com/3/image",
            headers: {
              Authorization: "Client-ID a214c4836559c77",
              "X-Requested-With": null
            }
          }}
          galleryConfig={null}
          readOnly={!this.state.edit}
        />

        <Affix
          offsetBottom={10}
          target={
            () =>
              window /*TODO bad practice https://github.com/ant-design/ant-design/issues/4037*/
          }
        >
          <ButtonGroup>
            <Button
              type="primary"
              disabled={this.state.edit}
              onClick={() => {
                this.setState({
                  edit: true
                });
              }}
            >
              Edit
            </Button>
            <Button
              type="primary"
              disabled={!this.state.edit}
              onClick={() => {
                this.setState({
                  edit: false
                });
              }}
            >
              Preview
            </Button>
          </ButtonGroup>
        </Affix>
      </div>
    );
  }
}
