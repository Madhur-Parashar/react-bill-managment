import React from 'react';

import FilterBill from "./FilterBills"
import MonthlyExpense from './MonthlyExpense';


class Bills extends React.Component {
  constructor(props){
    super(props)
    this.state={
      filterList:props.bills,
      isFilterTextClear:false,
      monthlyBillPaidIds:[]
    }
    this.handleFilterBills = this.handleFilterBills.bind(this)
    this.handleDeleteBill = this.handleDeleteBill.bind(this)
    this.handleMonthlyBillPaid = this.handleMonthlyBillPaid.bind(this)
  }

  componentDidUpdate(prevProps){
    if (this.props.bills.length !== prevProps.bills.length) {
      this.setState({
        filterList: this.props.bills
      })
    }  
    
  }
  handleDeleteBill(bill){
    this.setState({
      isFilterTextClear: true
    })
    this.props.handleDeleteBill(bill.id)
  }


  handleFilterBills(filterText){
    if(filterText){
     let filterBills = this.props.bills.filter((bill) => bill.description.toLowerCase().indexOf(filterText.toLowerCase()) > -1 || bill.category.toLowerCase().indexOf(filterText.toLowerCase()) > -1)
     console.log(filterBills)
     this.setState({
      filterList : filterBills
    })
   }
   else{
     this.setState({
      filterList : this.props.bills
     })
   }
  }
  handleMonthlyBillPaid(ids){
    this.setState({
      monthlyBillPaidIds : ids
    })
  }

render(){
  console.log(this.props.bills)
  return (
    <div>
      list of bills
      <FilterBill onFilterBills={this.handleFilterBills} isFilterTextClear={this.state.isFilterTextClear}/>
      <MonthlyExpense monthlyBills={this.state.filterList} onInputMonthlyBill={this.handleMonthlyBillPaid}/>
      {this.state.filterList && this.state.filterList.map((bill)=>
        <div key={bill.id} className={this.state.monthlyBillPaidIds.includes(bill.id) ? 'highlight-bill': ''}>
           <div>
            <div >Description : {bill.description}</div>
            <div>Category : {bill.category}</div>
            <div>Amount : {bill.amount}</div>
            <div>Date : {bill.date}</div>
          </div>
          <button onClick={this.handleDeleteBill.bind(this,bill)}>DELETE</button>
          <button onClick={()=>this.props.onEditBillsClick(bill)}>EDIT</button>
        </div>
         
      )}
    </div>
  );
}
 
}

export default Bills;
