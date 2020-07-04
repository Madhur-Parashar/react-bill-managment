import React from 'react';

import Bills from "../components/Bills";
import AddBills from "../components/UpdateBills";
import EditBils from "../components/EditBils";



import {connect} from "react-redux"

class MonthlyBills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isEditBills:false,editableBills:null};
    this.handleEditBtnClick = this.handleEditBtnClick.bind(this)
    this.handleUpdateBill =this.handleUpdateBill.bind(this)

  }
  handleEditBtnClick(bill){
    this.setState({
      isEditBills: true,
      editableBills: bill
    })
  }
  handleUpdateBill(payload){
    this.setState({
      isEditBills: false,
      editableBills: null
    })
    this.props.updateBill(payload)
  }

    render() {
      return (
          <div>       
            {this.state.isEditBills ?
             <EditBils editedBills={this.state.editableBills} onUpdateBill={this.handleUpdateBill}/> :
              <div>
                Monthly bills
                  <AddBills handleAddBills={this.props.addBills}/>
                  <Bills 
                  bills={this.props.monthlyBills} 
                  handleDeleteBill={this.props.deleteBill}
                  onEditBillsClick={this.handleEditBtnClick}
                  />
                
              </div>         
            }           
          </div>
      )
    }
  }

const mapStateToProps = state =>{
  return{
    monthlyBills: state.monthlyBills.bills
  }
}

const mapDispatchToProps = dispatch=>{
  return {
    addBills: (payload)=>dispatch({type:'ADD_BILLS',payload}),
    deleteBill : (id) => dispatch({type:'DELETE_BILLS',id}),
    updateBill : (payload) =>dispatch({type:'UPDATE_BILLS',payload}),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MonthlyBills);
