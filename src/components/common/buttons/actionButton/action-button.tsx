import { Component, ReactNode } from "react";
import styled from "styled-components";

interface IActionButtonProps {
  text: string;
  disabled: boolean;
  onClick: () => void;
}

interface IActionButtonStates {}

const Button = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  font-size: 0.8em;
  color: white;
  background-color: #0ba10b;
  border-radius: 6px;
  padding: 0.52em 0.8em;
  margin-right: 1em;
  transition: all 0.2s;
  &:hover {
    background-color: #0ec40e;
    transition: all 0.2s;
  }
`;

class ActionButton extends Component<IActionButtonProps, IActionButtonStates> {
  render(): ReactNode {
    const { text, disabled } = this.props;
    return (
      <Button
        onClick={this.props.onClick}
        disabled={disabled}
        style={{
          backgroundColor: disabled ? "#9d9fa2" : "",
          cursor: disabled ? "not-allowed" : "",
        }}
      >
        {text}
      </Button>
    );
  }
}

export default ActionButton;
