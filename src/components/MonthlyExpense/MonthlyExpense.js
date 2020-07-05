import React from "react";
import "./monthly-expense.scss";
import searchImg from "../../img/search.svg";

class MonthlyExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyBudget: "",
      bills: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.debounce = this.debounce.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      monthlyBudget: event.target.value,
    });
    this.debounce();
  }

  debounce() {
    console.log("in debounce");
    if (this.state.timer) {
      clearTimeout(this.state.timer);
      this.setState({
        timer: null,
      });
    }
    this.setState({
      timer: setTimeout(() => {
        let monthlyBudget = Number(this.state.monthlyBudget);
        const bills = this.props.monthlyBills.map((a) => ({ ...a }));
        console.log(bills);

        bills.sort(function (a, b) {
          var amountA = Number(a.amount);
          var amountB = Number(b.amount);
          if (amountA < amountB) {
            return -1;
          }
          if (amountA > amountB) {
            return 1;
          }

          return 0;
        });
        let items = [];
        let amount = 0;
        let i = 0;
        while (amount < monthlyBudget && i < bills.length) {
          if (amount + Number(bills[i].amount) > monthlyBudget) {
            break;
          }

          amount = amount + Number(bills[i].amount);
          items.push(bills[i].id);
          i++;
        }
        console.log(items);
        this.props.onInputMonthlyBill(items);
      }, 1000),
    });
  }

  render() {
    let bills = this.props.monthlyBills;
    console.log(bills);
    return (
      <div>
        <div className="monthly-expense">
          <input
            type="text"
            value={this.state.monthlyBudget}
            onChange={this.handleInputChange}
            placeholder="Enter your Monthly Expenses"
          />
          <img src={searchImg} alt="search"/>
        </div>
        <div className="monthly-expense__info">
          * minimum number of bills that should be paid (n)
        </div>
      </div>
    );
  }
}

export default MonthlyExpense;
