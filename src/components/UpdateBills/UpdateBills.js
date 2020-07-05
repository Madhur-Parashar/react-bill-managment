import React from "react";
import "./updates-bills.scss";
import Modal from "../../app/ui-components/Modal/modal";
import Input from "../../app/ui-components/Input/input";
import Button from "../../app/ui-components/Button/button";
class AddBills extends React.Component {
  constructor(props) {
    super(props);
    this.state = { description: "", category: "", amount: "", date: "" };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitBtn = this.handleSubmitBtn.bind(this);
    this.handleClickModalBackground = this.handleClickModalBackground.bind(
      this
    );
  }

  handleInputChange(key, event) {
    this.setState({
      [key]: event.target.value,
      isModalVisible: true,
    });
  }
  handleSubmitBtn() {
    const { description, category, amount, date } = this.state;
    if (this.props.editedBills) {
      let updatedObject = {
        ...this.props.editedBills,
        description,
        category,
        amount,
        date,
      };
      this.props.onAddEditBills(updatedObject);
    } else {
      this.props.onAddEditBills(this.state);
    }
  }
  handleClickModalBackground() {
    this.setState({
      isModalVisible: false,
    });
  }

  componentDidMount() {
    if (this.props.editedBills) {
      const { editedBills } = this.props;
      this.setState({
        description: editedBills.description,
        category: editedBills.category,
        amount: editedBills.amount,
        date: editedBills.date,
      });
    }
  }

  render() {
    let title = this.props.editedBills ? 'Edit Details' : 'Add Details'
    return (
      <Modal
        onClickModalBackground={this.handleClickModalBackground}
        title={title}
        onModalClose= {this.props.onCloseModal}
      >
        <div className="update-bills">
          <Input
            placeholder="Please enter description"
            label="Description"
            type="text"
            value={this.state.description}
            onChange={this.handleInputChange.bind(this, "description")}
          />
          <Input
            placeholder="Please enter category"
            label="Category"
            type="text"
            value={this.state.category}
            onChange={this.handleInputChange.bind(this, "category")}
          />
          <Input
            placeholder="Please enter amount"
            label="Amount"
            type="number"
            value={this.state.amount}
            onChange={this.handleInputChange.bind(this, "amount")}
          />
          <Input
            placeholder="Please enter date"
            label="Date"
            type="date"
            value={this.state.date}
            onChange={this.handleInputChange.bind(this, "date")}
          />
          <div className="update-bills__btn">
            <Button onClick={this.handleSubmitBtn}>
              {this.props.editedBills ? "EDIT" : "ADD"} DETAILS
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddBills;
