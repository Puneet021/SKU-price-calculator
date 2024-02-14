import { Component, ReactNode } from "react";
import styles from "./inputText.module.scss";
import { InputTextProps, InputTextStates } from "./inputText.constants";

class InputText extends Component<InputTextProps, InputTextStates> {
  constructor(props: InputTextProps) {
    super(props);
    this.state = {
      value: "",
    };
  }
  handleChange(event: React.ChangeEvent<HTMLElement>) {
    const val = (event.target as HTMLInputElement).value;
    this.setState({ value: val });
  }
  handleSearchEnter(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter") {
      this.props.setChoice(this.state.value);
    }
  }
  render(): ReactNode {
    const { label } = this.props;
    return (
      <div className={styles.box}>
        <div className={styles.selector}>
          <label htmlFor="filter" className={styles.label}>
            {label}
          </label>
          <div className={styles.input}>
            <input
              className={styles.inputField}
              type="text"
              value={this.state.value}
              onChange={(e) => this.handleChange(e)}
              onKeyUp={(e) => this.handleSearchEnter(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default InputText;
