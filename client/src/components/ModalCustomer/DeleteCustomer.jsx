import React, { useCallback, useState } from 'react';
import { Modal, ModalHeader, Alert, ModalBody, Input, Label, Row, Col, Button, ModalFooter } from 'reactstrap';
import '../../assets/components/ModalWindow.css'

export const DeleteCustomer = ({
    toggle,
    isOpen,
    customerId,
    tableUpdate,
  }) => {
  
  let [confirm, setConfirm] = useState(false);
  let changeShowWindow = () => {
    toggle();
    setConfirm(false);
  }
  
  return (
    <Modal className='alert-danger-update'
      isOpen={isOpen}
      toggle={changeShowWindow}
    > 
      {!customerId ? 
      <Alert color='warning' toggle={changeShowWindow} isOpen={isOpen} className='alert-danger-update'>
        Выберите строку Пользователя
      </Alert> : 
      <>
        <ModalHeader
          tag={'h4'}
          className={'modal-back modal-header modal-alert-danger-h4'}
        >
          <Alert color='danger'>
            Вы собираетесь удалить Пользователя c id:{' ' + customerId}
          </Alert>
        </ModalHeader>
        <ModalBody
          className={'modal-back modal-body-delete'}
        >
          <Row>
            <Col xs='1' md='3'></Col>
            <Col xs='11' md='6'>
              <Label className='label-delete'>
                <Input type='checkbox' value={confirm} onChange={(event) => setConfirm(!confirm)}/>
                Подтвердите удаление
              </Label>
            </Col>
            <Col xs='0' md='3'></Col>
          </Row>
        </ModalBody>
        <ModalFooter 
          className={'modal-back'}
        >
          <div className='buttons-footer'>
            <Button color="success" onClick={changeShowWindow}>
              Отмена
            </Button>
            <Button 
              className='button-add' 
              color='danger'
              onClick={async () => {
                try{
                  if(!confirm) return;
                  let res = await fetch(`/customer/delete/${customerId}`, {
                    method: 'DELETE',
                  });
                  let ans = await res.json();
                  console.log(ans)
                  changeShowWindow();
                  tableUpdate();
                }catch(e){
                  console.log(e.message);
                }
                
              }}
            >
              Удалить
            </Button>
          </div>
        </ModalFooter>
      </>}
    </Modal>
  );
}
