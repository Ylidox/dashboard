import { CustomerTable } from 'components/CustomerTable/CustomerTable';
import React, {useState} from 'react';
import {Card, Row} from 'reactstrap'

export const EditCustomer = () => {
  let [customerId, setCustomerId] = useState(0);

  return (
    <div className="content">
      <CustomerTable
        customerId={customerId}
        setCustomerId={setCustomerId}
        showButtonsGroup={true}
      />
    </div>
  );
}