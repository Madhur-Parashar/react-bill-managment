import React from 'react';
import EditBill from "./UpdateBills"


function editBill(props) {
  return (
    <div>
      Edit Bills
      <EditBill {...props} />
    </div>
  );
}

export default editBill;
