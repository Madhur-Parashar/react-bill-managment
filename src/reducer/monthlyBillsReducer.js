
import initialState from "../utility/bills.json"

const monthlyBills = (state=initialState,action)=>{
        switch(action.type){
          case 'ADD_BILLS':      
          const addedBills =  [...state.bills,{id:state.totalBills + 1,...action.payload}]
            return {
               ...state,
               bills : addedBills,
               totalBills: state.totalBills +1
               
            }
            case 'DELETE_BILLS':
            const deleteBills = state.bills.filter((bill) => bill.id !== action.id)
            return {
               ...state,
               bills: deleteBills,
               totalBills:state.totalBills - 1
            }
            case 'UPDATE_BILLS':
              const updateBills = state.bills.map((bill)=>{
                if(bill.id !== action.payload.id){
                  return bill
                }
                else{
                  return {
                    ...bill,
                    description : action.payload.description,
                    category : action.payload.category,
                    amount : action.payload.amount,
                    date : action.payload.date
                  }
            
                }
              })
              return {
                 ...state,
                 bills: updateBills
              }
              default :
              return state
          }
     
    
}
export default monthlyBills