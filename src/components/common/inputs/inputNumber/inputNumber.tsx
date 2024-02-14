import { Component, ReactNode } from "react";
import styles from "./inputNumber.module.scss";
import { IInputNumberProps, IInputNumberStates } from "./inputNumber.constants";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

class InputNumber extends Component<IInputNumberProps, IInputNumberStates> {
  constructor(props: IInputNumberProps) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : 0,
    };
    this.handleIncOrDec = this.handleIncOrDec.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event: number) {
    this.setState({ value: event });
    this.props.setValue(event);
  }
  handleIncOrDec(val: number) {
    if (val === -1 && this.state.value === 0) return;
    let valTemp = this.state.value;
    this.setState({ value: valTemp + val });
    this.props.setValue(valTemp + val);
  }
  componentDidUpdate(
    prevProps: Readonly<IInputNumberProps>,
    prevState: Readonly<IInputNumberStates>
  ): void {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value ? this.props.value : this.state.value,
      });
    }
  }
  render(): ReactNode {
    const { label, error, text, max, disabled } = this.props;
    return (
      <div
        className={styles.box}
        style={{
          pointerEvents: disabled ? "none" : "all",
          opacity: disabled ? 0.7 : 1,
        }}
      >
        <div className={styles.selector}>
          <label htmlFor="filter" className={styles.label}>
            {label}
          </label>
          <div className={styles.input}>
            <input
              className={styles.inputField}
              type="number"
              value={this.state.value}
              onChange={(e) => {
                this.handleChange(+e.target.value);
              }}
              min={0}
              max={max ? max : ""}
            />
            <KeyboardArrowUpIcon
              className={styles.iconKU}
              onClick={() => this.handleIncOrDec(1)}
            />
            <KeyboardArrowDownIcon
              className={styles.iconKD}
              onClick={() => this.handleIncOrDec(-1)}
            />
          </div>
        </div>
        <p className={styles.error}>{error}</p>
        <p className={styles.text}>{text}</p>
      </div>
    );
  }
}

export default InputNumber;
