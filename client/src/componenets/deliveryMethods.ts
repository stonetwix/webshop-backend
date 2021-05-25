// import { Component } from "react";




// class deliveryMethods extends Component<State> {

  

 
// }


// export default deliveryMethods; 

// export const deliveryMethods: DeliveryMethod[] = [
//   {
//     id: 1,
//     company: 'PostNord',
//     time: 24,
//     price: 145,
//   },
//   {
//     id: 2,
//     company: 'Bring',
//     time: 48,
//     price: 129,
//   },
//   {
//     id: 3,
//     company: 'DB Schenker',
//     time: 72,
//     price: 89,
//   }
// ];


export function calculateDeliveryDay(timeInHours: number) {
  const today = new Date()
  const deliveryDay = new Date(today);
  deliveryDay.setDate(deliveryDay.getDate() + timeInHours / 24);
  return deliveryDay.toISOString().split('T')[0];
  
}

