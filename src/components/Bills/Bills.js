import React from "react";

import FilterBill from "../FilterBills/FilterBills";
import MonthlyExpense from "../MonthlyExpense/MonthlyExpense";
import AddEditBills from "../UpdateBills/UpdateBills";

import Button from "../../app/ui-components/Button/button";

import "./bills.scss";

class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterList: props.bills,
      isFilterTextClear: false,
      monthlyBillPaidIds: [],
      editableBills: null,
      isAddBills: false,
      isEditBills:false
    };
    this.handleFilterBills = this.handleFilterBills.bind(this);
    this.handleDeleteBill = this.handleDeleteBill.bind(this);
    this.handleMonthlyBillPaid = this.handleMonthlyBillPaid.bind(this);
    this.handleAddBills = this.handleAddBills.bind(this);
    this.handleEditBillsClick = this.handleEditBillsClick.bind(this);
    this.handleAddAndEditBill = this.handleAddAndEditBill.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)

  }

  componentDidUpdate(prevProps) {
    if (this.props.bills !== prevProps.bills) {
      this.setState({
        filterList: this.props.bills,
      });
    }
  }
  handleDeleteBill(bill) {
    this.setState({
      isFilterTextClear: true,
    });
    this.props.handleDeleteBill(bill.id);
  }

  handleFilterBills(filterText) {
    if (filterText) {
      let filterBills = this.props.bills.filter(
        (bill) =>
          bill.description.toLowerCase().indexOf(filterText.toLowerCase()) >
            -1 ||
          bill.category.toLowerCase().indexOf(filterText.toLowerCase()) > -1
      );
      console.log(filterBills);
      this.setState({
        filterList: filterBills,
      });
    } else {
      this.setState({
        filterList: this.props.bills,
      });
    }
  }
  handleMonthlyBillPaid(ids) {
    this.setState({
      monthlyBillPaidIds: ids,
    });
  }
  handleAddAndEditBill(payload) {
    console.log('payload in handle',payload)
    if(this.state.isEditBills){
      console.log('reached')
      this.props.onEditBills(payload);
    }
    else{
      this.props.onAddBills(payload)
    }
    this.handleCloseModal()
  }
  handleCloseModal(){
    this.setState({
      isEditBills: false,
      isAddBills:false,
      editableBills: null,
    });
  }
  handleEditBillsClick(bill) {
    this.setState({
      editableBills: bill,
      isEditBills: true,
    });
  }
  handleAddBills(){
    this.setState({
      isAddBills: true
    });
  }

  render() {
    return (
      <div className="bills">
        <div className="bills__header">
          <MonthlyExpense
            monthlyBills={this.state.filterList}
            onInputMonthlyBill={this.handleMonthlyBillPaid}
          />
          <FilterBill
            onFilterBills={this.handleFilterBills}
            isFilterTextClear={this.state.isFilterTextClear}
          />
          <div className="bills__add" onClick={this.handleAddBills}>+ ADD BILL</div>
        </div>
        <div className="bills__list">
          <div className="bills__title-column">
            <div>Description</div>
            <div>Category </div>
            <div>Amount </div>
            <div>Date </div>
            <div>Actions</div>
          </div>
          <div className="bills__list--rows">
            {this.state.filterList &&
              this.state.filterList.map((bill) => (
                <div
                  key={bill.id}
                  className={
                    this.state.monthlyBillPaidIds.includes(bill.id)
                      ? "bills__list--row highlight-bill"
                      : "bills__list--row"
                  }
                >
                  <div>{bill.description}</div>
                  <div>{bill.category}</div>
                  <div>{bill.amount}</div>
                  <div>{bill.date}</div>
                  <div className="bills__btn-group">
                    <Button onClick={this.handleDeleteBill.bind(this, bill)}>
                      DELETE
                    </Button>
                    <Button onClick={() => this.handleEditBillsClick(bill)}>
                      EDIT
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {this.state.isAddBills || this.state.isEditBills ? (
          <AddEditBills
            editedBills={this.state.editableBills}
            onAddEditBills={this.handleAddAndEditBill}
            onCloseModal = {this.handleCloseModal}
          />
        ) : null}
      </div>
    );
  }
}

export default Bills;
