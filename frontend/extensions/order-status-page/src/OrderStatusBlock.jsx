import {
  reactExtension,
  Text,
  // useCustomer,
} from "@shopify/ui-extensions-react/customer-account";
import { useEffect, useState } from "react";

export default reactExtension("customer-account.page.render", () => <App />);

function App() {
  // const customer=useCustomer();
  // if(customer){
  //   console.log(customer?.id);
  // } else{
  //   console.log("Customer not available.")
  // }

  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    async function fetchCustomerID() {
      const response = await fetch(
        "shopify://customer-account/api/2025-04/graphql.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `query{
            customer{
            id
            }
            }`,
          }),
        }
      );

      const data=await response.json();
      console.log(data)
      const customerID=data?.data?.customer?.id?.split("Customer/")[1];
      console.log(customerID);
      setCustomer(customerID);
    }

    fetchCustomerID();
  }, []);

  return (
    <Text size="large" emphasis="bold" appearance="base">
      Orders
    </Text>
  );
}
