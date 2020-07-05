import React from "react";
import searchImg from "../../img/search.svg";
import "./filter-bills.scss";

class FilterBills extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filterText: "", timer: null };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.deBounce = this.deBounce.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.isFilterTextClear !== prevProps.isFilterTextClear) {
      this.setState({
        filterText: "",
      });
    }
  }

  handleTextChange(event) {
    this.setState({
      filterText: event.target.value,
    });
    this.deBounce();
  }
  deBounce() {
    if (this.state.timer) {
      clearTimeout(this.state.timer);
      this.setState({
        timer: null,
      });
    }
    this.setState({
      timer: setTimeout(() => {
        this.props.onFilterBills(this.state.filterText);
      }, 1000),
    });
  }

  render() {
    return (
      <div className="filter-bills">
        <input
          type="text"
          value={this.state.filterText}
          placeholder="Search for description and category"
          onChange={this.handleTextChange}
        />
        <img src={searchImg} alt="search"/>
      </div>
    );
  }
}

export default FilterBills;
