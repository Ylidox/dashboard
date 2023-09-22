import React, {useEffect, useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Container, Input, Alert} from 'reactstrap';
import '../../assets/components/ModalWindow.css'

export const UpdateCustomer = ({
    isOpen, 
    toggle, 
    selectCustomer, 
    setSelectCustomer, 
    customerId, 
    tableUpdate
  }) => {
  let [validInput, setValidInput] = useState(true);
  
  const onChange = (event) => {
    let {id, value} = event.target;
    setSelectCustomer({...selectCustomer, [id]:value});
  }

  useEffect(() => {
    setTimeout(() => {
      if(!validInput) setValidInput(true);
    }, 3000);
  }, [validInput]);

  let updateAddress = async () => {
    try{
      if(selectCustomer.name === '') throw new Error('Заполните поле Имя');
      let res = await fetch('/customer/change', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(selectCustomer),
      });
      let ans = await res.json();
      console.log(ans);
      tableUpdate();
      return true;
    }catch(e){
      console.log(e.message);
      return false;
    }
  }

  const checkInputNumber = (event) => {
    let ch = event.target.value.replace(/[^\d.]/g, ''); //разрешаем вводить только числа и запятую
    let pos = ch.indexOf('.'); // проверяем, есть ли в строке запятая
    if(pos != -1){ // если запятая есть
      if((ch.length-pos)>4){ // проверяем, сколько знаков после запятой, если больше 1го то
        ch = ch.slice(0, -1); // удаляем лишнее
      }
    }
    event.target.value = ch; // приписываем в инпут новое значение
    onChange(event);
  };
  
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
    >
      {!selectCustomer.id ? 
        <Alert color='danger' isOpen={isOpen} className='alert-danger-update' toggle={toggle}>
          Выберите строку Пользователя
        </Alert> 
        :
        <>
          <ModalHeader
            tag={'h3'}
            className={'modal-back modal-header'}
          >
            Изменение Пользователя
          </ModalHeader>
          <ModalBody
            className={'modal-back'}
          >
            <Alert color='danger' fade={true} isOpen={!validInput}>
              Поле Страна обязательное 
            </Alert> 
            <Row>
              <Col xs='6'>
                <Input 
                  placeholder='Имя:' 
                  className='input' 
                  required 
                  id='name' 
                  onChange={onChange} 
                  value={selectCustomer.name}
                />
              </Col>
              <Col xs='6'>
                <Input 
                  placeholder='Фамилия:' 
                  className='input' 
                  id='lastname' 
                  onChange={onChange}
                  value={selectCustomer.lastname}
                />
              </Col>
            </Row>
            <Row>
              <Col xs='12' md='6'>
                <Input 
                  placeholder='Email:' 
                  className='input' 
                  required 
                  id='email' 
                  onChange={onChange}
                  value={selectCustomer.email}
                />
              </Col>
              <Col xs='12' md='6'>
                <Input 
                  placeholder='Phone:' 
                  className='input' 
                  id='county' 
                  onChange={onChange}
                  value={selectCustomer.phone}
                />
              </Col>
            </Row>
            <Row>
              <Col xs='12' md='6'>
                <Input 
                  placeholder='Расходы:' 
                  className='input' 
                  id='expenses' 
                  onChange={onChange}
                  onKeyUp={(event) => checkInputNumber(event)}
                  value={selectCustomer.expenses}
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter 
            className={'modal-back'}
          >
            <div className='buttons-footer'>
              <Button color="danger" onClick={toggle}>
                Отмена
              </Button>
              <Button 
                className='button-add' 
                color='success' 
                onClick={async () => {
                  let res = await updateAddress();
                  if(res) {
                    // console.log(res);
                    toggle();
                    // setAddress(defaultAddress);
                    setValidInput(true);
                  }else{
                    setValidInput(false);
                  }
                }}
                >
                Изменить
              </Button>
            </div>
          </ModalFooter>
        </>
      }
    </Modal>
  );
}