import React, {useState, useEffect} from 'react';
import { addressesColumns } from 'defaultColumnDefs/addressesColumns';
import { AgTable } from "components/Table/AgTable";
import { AddAddress } from "components/Modal/AddAddress";
import { UpdateAddress } from "components/Modal/UpdateAddress";
import { DeleteAddress } from 'components/Modal/DeleteAddress';

export const AddressTable = ({customerId}) => {
  let [selectAddress, setSelectAddress] = useState({});

  let [addresses, setAddresses] = useState([]);
  let [gridAddress, setGridAddress] = useState(null);

  let [openAddAddress, setOpenAddAddress] = useState(false);
  let toggleAddAddress = () => setOpenAddAddress(!openAddAddress);

  let [openUpdateAddress, setOpenUpdateAddress] = useState(false);
  let toggleUpdateAddress = () => setOpenUpdateAddress(!openUpdateAddress);

  let [openDeleteAddress, setOpenDeleteAddress] = useState(false);
  let toggleDeleteAddress = () => setOpenDeleteAddress(!openDeleteAddress);

  useEffect(() => {
    if(gridAddress !== null)onGridReadyAddresses({api: gridAddress});
  }, [customerId]);

  const onGridReadyAddresses = async (params) => {
    setGridAddress(params.api)
    let res = await fetch(`/address/get?customer_id=${customerId}`);
    let rows = await res.json();
    setAddresses(rows)
    console.log(customerId, rows)
    params.api.setRowData(rows);
  }

  return (
    <>
      <AgTable
        title={'Addresses'}
        columnsDef={addressesColumns}
        onGridReady={onGridReadyAddresses} 
        rowModelType={'clientSide'}
        showButtonsGroup={true}
        onRowSelected={(event)=> {
          if(event.node.selected) setSelectAddress(event.data);
        }}
        onClickAdd={toggleAddAddress}
        onClickUpdate={toggleUpdateAddress}
        onClickDelete={toggleDeleteAddress}
      />
      <AddAddress 
        customerId={customerId}
        isOpen={openAddAddress} 
        toggle={toggleAddAddress} 
        tableUpdate={() => onGridReadyAddresses({api: gridAddress})}
      />
      <UpdateAddress
        customerId={customerId}
        isOpen={openUpdateAddress}
        toggle={toggleUpdateAddress}
        selectAddress={selectAddress}
        setSelectAddress={setSelectAddress}
        tableUpdate={() => onGridReadyAddresses({api: gridAddress})}
      />
      <DeleteAddress
        isOpen={openDeleteAddress}
        toggle={toggleDeleteAddress}
        idAddress={selectAddress.id}
        tableUpdate={() => onGridReadyAddresses({api: gridAddress})}
      />
    </>
  );
}
