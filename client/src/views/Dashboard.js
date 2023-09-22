import React, {useState, useEffect} from "react";

import { AddressTable } from "components/AddressTable/AddressTable";
import { CustomerTable } from "components/CustomerTable/CustomerTable";

function Dashboard(props) {  
  let [customerId, setCustomerId] = useState(0);

  return (
    <>
      <div className="content">
        <CustomerTable
          customerId={customerId}
          setCustomerId={setCustomerId}
        />
        <AddressTable
          customerId={customerId}
        />
      </div>
    </>
  );
}

export default Dashboard;
