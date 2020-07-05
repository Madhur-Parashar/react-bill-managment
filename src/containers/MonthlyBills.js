import React from "react";

import Bills from "../components/Bills/Bills";

import { connect } from "react-redux";

class MonthlyBills extends React.Component {
  render() {
    return (
      <div>
        <h2>Monthly bills</h2>
        <Bills
          bills={this.props.monthlyBills}
          handleDeleteBill={this.props.deleteBill}
          onEditBills={this.props.updateBill}
          onAddBills={this.props.addBills}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    monthlyBills: state.monthlyBills.bills,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBills: (payload) => dispatch({ type: "ADD_BILLS", payload }),
    deleteBill: (id) => dispatch({ type: "DELETE_BILLS", id }),
    updateBill: (payload) => dispatch({ type: "UPDATE_BILLS", payload }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MonthlyBills);
