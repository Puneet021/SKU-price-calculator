import { Component, ReactNode } from "react";
import styles from "./multi-select.module.scss";
import {
  IMultiSelectProps,
  IMultiSelectStates,
} from "./multi-select.constants";
import arrow from "./../../../../images/drop-down.svg";
import { ClickAwayListener } from "@mui/material";

class MultiSelect extends Component<IMultiSelectProps, IMultiSelectStates> {
  constructor(props: IMultiSelectProps) {
    super(props);
    this.state = {
      isMenuOpen: false,
      originalItems: [],
      filteredItems: [],
      selectedItems: [],
      searchVal: "",
    };
    this.menuToggle = this.menuToggle.bind(this);
    this.handleClickAway = this.handleClickAway.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchEnter = this.handleSearchEnter.bind(this);
    this.setToDefault = this.setToDefault.bind(this);
    this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
  }

  menuToggle = () => {
    this.setState({
      isMenuOpen: true,
    });
    this.setToDefault();
  };

  handleClickAway = () => {
    this.setState({
      isMenuOpen: false,
    });
    this.setToDefault();
  };

  componentDidMount() {
    this.setToDefault();
  }

  setToDefault() {
    const { searchVal } = this.state;
    this.setState({
      filteredItems:
        searchVal === ""
          ? this.props.data.items
          : this.props.data.items.filter((i) => i.name.includes(searchVal)),
      originalItems: this.props.data.items,
      selectedItems: this.props.data.items.filter((item) => item.checked),
    });
  }

  handleSearch(event: React.ChangeEvent<HTMLElement>) {
    const val = (event.target as HTMLInputElement).value;
    this.setState({ searchVal: val });
    const filteredData = this.state.originalItems.filter((item) =>
      String(item.name).toLowerCase().includes(val.toLowerCase())
    );
    this.setState({ filteredItems: filteredData });
  }

  handleSearchEnter(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter") {
      const list = this.state.filteredItems;
      if (list.length === 1) {
        let item = this.state.filteredItems[0];
        this.props.setChecked(item.id, !item.checked);
      }
    }
  }
  handleChangeCheckBox(ind: number) {
    let items = this.state.originalItems;
    this.props.setChecked(ind, !items[ind].checked);
  }

  componentDidUpdate(
    prevProps: Readonly<IMultiSelectProps>,
    prevState: Readonly<IMultiSelectStates>
  ): void {
    if (prevProps.data.items !== this.props.data.items) {
      this.setToDefault();
    }
  }

  render(): ReactNode {
    const {
      data: { label, items },
      customWidth,
      disabled,
    } = this.props;
    const { isMenuOpen, filteredItems, selectedItems } = this.state;
    return (
      <div
        className={styles.box}
        style={{
          width: customWidth ? customWidth : "",
          pointerEvents: disabled === true ? "none" : "all",
          opacity: disabled === true ? 0.7 : 1,
        }}
      >
        <div className={styles.selector}>
          <label htmlFor="filter" className={styles.label}>
            {label}
          </label>
          <div
            id="filter"
            className={styles.selectField}
            onClick={this.menuToggle}
          >
            <p className={styles.selected}>
              {selectedItems.length
                ? selectedItems.map(
                    (item, i) =>
                      item.name + (i < selectedItems.length - 1 ? ", " : "")
                  )
                : "Select"}
            </p>
            <img
              src={arrow}
              alt="arrow"
              className={isMenuOpen ? styles.iconup : styles.icon}
            />
            {isMenuOpen ? (
              <ClickAwayListener onClickAway={this.handleClickAway}>
                <div>
                  <div className={styles.menuForSearch}>
                    <li value="-1" key={"search"} className={styles.menuSearch}>
                      <input
                        type="text"
                        className={styles.searchInput}
                        value={this.state.searchVal}
                        onChange={(e) => this.handleSearch(e)}
                        onKeyUp={this.handleSearchEnter}
                        placeholder="Search"
                        autoFocus
                      />
                    </li>
                  </div>
                  <div className={styles.menu}>
                    {filteredItems.map((item, i: number) => (
                      <li
                        key={i}
                        onClick={(e) => this.handleChangeCheckBox(item.id)}
                        className={styles.menuItem}
                        style={{
                          borderBottom: i + 1 === items.length ? "none" : "",
                        }}
                      >
                        <input
                          type="checkbox"
                          className={styles.checkBox}
                          checked={item.checked}
                          onChange={() => this.handleChangeCheckBox(item.id)}
                        />
                        {item.name}
                      </li>
                    ))}
                  </div>
                </div>
              </ClickAwayListener>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MultiSelect;
