import React from 'react';


class AddBills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {description: '',category:'',amount:'',date:''};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitBtn = this.handleSubmitBtn.bind(this);
  }

  handleInputChange(key,event){
    this.setState({
      [key]: event.target.value
    })
  }
  handleSubmitBtn(){
    const {description,category,amount,date} = this.state
    if(this.props.editedBills){
      let updatedObject = {...this.props.editedBills,description,category,amount,date}
      this.props.onUpdateBill(updatedObject)
    }
    else{
      this.props.handleAddBills(this.state)
    }
    
  }

  componentDidMount(){
    if(this.props.editedBills){
      const {editedBills} = this.props
      this.setState({
        description : editedBills.description,
        category : editedBills.category,
        amount : editedBills.amount,
        date: editedBills.date
      })
    }
  }
    
    render() {

      return (
        <div>
          Add Details
          <div>Description</div>
          <span><input type="text" value={this.state.description}  onChange={this.handleInputChange.bind(this,'description')}/></span>
          <div>category</div>
          <span><input type="text" value={this.state.category} onChange={this.handleInputChange.bind(this,'category')}/></span>
          <div>Amount</div>
          <span><input type="number" value={this.state.amount} onChange={this.handleInputChange.bind(this,'amount')}/></span>
          <div>Date</div>
          <span><input type="date" value={this.state.date} onChange={this.handleInputChange.bind(this,'date')}/></span>
          <button onClick={this.handleSubmitBtn}>{this.props.editedBills ? 'EDIT': 'ADD'} DETAILS</button>
       </div>
      )
    }
  }


export default AddBills;
