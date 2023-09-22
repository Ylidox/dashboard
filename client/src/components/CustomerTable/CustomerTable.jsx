import React, {useState, useEffect} from "react";
import {customerColumns} from 'defaultColumnDefs/customersColumns'
import { AgTable } from "components/Table/AgTable";
import { AddCustomer } from "../ModalCustomer/AddCustomer";
import { UpdateCustomer } from "components/ModalCustomer/UpdateCustomer";
import { DeleteCustomer } from '../ModalCustomer/DeleteCustomer';

export const CustomerTable = ({ 
    customerId,
    setCustomerId,
    showButtonsGroup,
  }) => {
  let [selectCustomer, setSelectCustomer] = useState({});
  let [customers, setCustomers] = useState([]);
  let [pageCustomers, setPageCustomers] = useState(0);
  let [gridCustomers, setGridCustomers] = useState(null);

  let [openAddCustomer, setOpenAddCustomer] = useState(false);
  let toggleAddCustomer = () => setOpenAddCustomer(!openAddCustomer);

  let [openUpdateCustomer, setOpenUpdateCustomer] = useState(false);
  let toggleUpdateCustomer = () => setOpenUpdateCustomer(!openUpdateCustomer);

  let [openDeleteCustomer, setOpenDeleteCustomer] = useState(false);
  let toggleDeleteCustomer = () => setOpenDeleteCustomer(!openDeleteCustomer);

  const onGridReadyCustomers = async (params) => {
    setGridCustomers(params);
    const dataSource = {
      rowCount: null,
      getRows: async (params) => {
        // setTimeout(async () => {
          try{
            let res = await fetch(`/customer/get?page=${pageCustomers}`);
            let ans = await res.json();
            let {count, rows} = ans;
            console.log(rows)
            if(rows.length == 0) throw new Error('Пользователи закончились');
            customers = customers.concat(rows)
            setCustomers([...customers]);
            pageCustomers++;
            setPageCustomers(pageCustomers)

            params.successCallback(rows, +count);
          }catch(e){
            console.log(e.message)
            pageCustomers = 0;
            setPageCustomers(pageCustomers)
          }
        // }, 500);
      }
    }
    params.api.setDatasource(dataSource)
  }

  let tableUpdate = () => {
    pageCustomers = 0;
    setPageCustomers(0);
    onGridReadyCustomers(gridCustomers)
  }

  return (
    <>
      <AgTable
        title={'Customers'}
        columnsDef={customerColumns}
        onGridReady={onGridReadyCustomers}
        rowModelType={'infinite'}
        onRowSelected={(event)=> {
          if(event.node.selected){
            setSelectCustomer(event.data);
            setCustomerId(event.data.id);
          }
        }}
        showButtonsGroup={showButtonsGroup}
        onClickAdd={toggleAddCustomer}
        onClickUpdate={toggleUpdateCustomer}
        onClickDelete={toggleDeleteCustomer}
      />
      <AddCustomer
        isOpen={openAddCustomer}
        toggle={toggleAddCustomer}
        tableUpdate={tableUpdate}
      />
      <UpdateCustomer
        isOpen={openUpdateCustomer}
        toggle={toggleUpdateCustomer}
        selectCustomer={selectCustomer}
        setSelectCustomer={setSelectCustomer}
        customerId={customerId}
        setCustomerId={setCustomerId}
        tableUpdate={tableUpdate}
      />
      <DeleteCustomer
        isOpen={openDeleteCustomer}
        toggle={toggleDeleteCustomer}
        customerId={customerId}
        tableUpdate={tableUpdate}
      />
    </>
  );
}