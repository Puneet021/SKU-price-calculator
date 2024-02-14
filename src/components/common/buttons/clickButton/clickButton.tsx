import { Component, ReactNode } from "react";
import styles from "./clickButton.module.scss";

interface BtnProps {
  text: string;
  disabled: boolean;
  handleClick: () => void;
}

class ClickButton extends Component<BtnProps> {
  render(): ReactNode {
    const { text, disabled, handleClick } = this.props;
    return (
      <button
        className={disabled ? styles.btnDis : styles.btn}
        onClick={() => (disabled ? {} : handleClick())}
      >
        {text}
      </button>
    );
  }
}

export default ClickButton;
