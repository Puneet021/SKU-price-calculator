import React, { Component } from "react";
import styles from "./filter.module.scss";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { FilterProps, FilterStates } from "./filter.constants";
import arrow from "./../../../../images/drop-down.svg";

class Filter extends Component<FilterProps, FilterStates> {
  constructor(props: FilterProps) {
    super(props);
    this.state = {
      isMenuOpen: false,
      currentChoice: 0,
      filteredItems: [],
    };
    this.menuToggle = this.menuToggle.bind(this);
    this.handleClickAway = this.handleClickAway.bind(this);
    this.handleChangeInChoice = this.handleChangeInChoice.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchEnter = this.handleSearchEnter.bind(this);
    this.setToDefault = this.setToDefault.bind(this);
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
    this.setState({
      currentChoice:
        this.props.noDefaultVal === true ? -1 : this.state.currentChoice,
    });
  }

  setToDefault() {
    this.setState({ filteredItems: this.props.data.items });
  }

  handleChangeInChoice = (event: React.MouseEvent<HTMLElement>, i: number) => {
    this.handleClickAway();
    let val: number = Number((event.target as HTMLInputElement).value);
    this.props.setChoice(this.state.filteredItems[i].name);
    this.setState({
      currentChoice: val,
    });
  };

  handleSearch(event: React.ChangeEvent<HTMLElement>) {
    const val = (event.target as HTMLInputElement).value;
    const filteredData = this.props.data.items.filter((item) =>
      String(item.name).toLowerCase().includes(val.toLowerCase())
    );
    this.setState({ filteredItems: filteredData });
  }

  handleSearchEnter(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter") {
      const list = this.state.filteredItems;
      if (list.length === 1) {
        this.setState({
          currentChoice: this.state.filteredItems[0].value,
          isMenuOpen: false,
        });
        this.props.setChoice(this.state.filteredItems[0].name);
      }
    }
  }

  render(): React.ReactNode {
    const {
      data: { label, items },
      customWidth,
    } = this.props;
    const { isMenuOpen, currentChoice, filteredItems } = this.state;
    return (
      <div
        className={styles.box}
        style={{ width: customWidth ? customWidth : "" }}
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
            <p>{currentChoice === -1 ? "Select":items[currentChoice]?.name}</p>
            <img
              src={arrow}
              alt="arrow"
              className={isMenuOpen ? styles.iconup : styles.icon}
            />
            {isMenuOpen ? (
              <>
                <div className={styles.menuForSearch}>
                  <ClickAwayListener onClickAway={this.handleClickAway}>
                    <li value="-1" key={"search"} className={styles.menuSearch}>
                      <input
                        type="text"
                        className={styles.searchInput}
                        onChange={(e) => this.handleSearch(e)}
                        onKeyUp={this.handleSearchEnter}
                        placeholder="Search"
                        autoFocus
                      />
                    </li>
                  </ClickAwayListener>
                </div>
                <div className={styles.menu}>
                  {filteredItems?.map((item, i: number) => (
                    <li
                      key={i}
                      value={item.value}
                      onClick={(e) => this.handleChangeInChoice(e, i)}
                      className={styles.menuItem}
                      style={{
                        borderBottom: i + 1 === items?.length ? "none" : "",
                      }}
                    >
                      {item.name}
                    </li>
                  ))}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
