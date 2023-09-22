import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Container, Input, Alert} from 'reactstrap';
import '../../assets/components/ModalWindow.css'

export const AddCustomer = ({isOpen, toggle, tableUpdate, customerId}) => {
  const defaultCustomer = {
    // id: customerId ? customerId : '',
    name: '',
    lastname: '',
    expenses: '',
    email: '',
    phone: '',
  }

  let [customer, setCustomer] = useState(defaultCustomer);
  let [validInput, setValidInput] = useState(true);

  // useEffect(() => {
  //   setCustomer({...defaultCustomer});
  // }, [customerId]);

  useEffect(() => {
    setTimeout(() => {
      if(!validInput) setValidInput(true);
    }, 3000);
  }, [validInput]);


  const onChange = (event) => {
    let {id, value} = event.target;
    setCustomer({...customer, [id]:value});
  }

  const addCustomer = async () => {
    try{
      if(!customer.name) {
        throw new Error('Не заполнены необходимые поля');
      }
      let res = await fetch('/customer/add', {
        method: 'POST',
        headers:{
          'content-type': 'application/json',
        },
        body: JSON.stringify(customer),
      });
      let ans = await res.json();
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
      <ModalHeader
        tag={'h3'}
        className={'modal-back modal-header'}
      >
        Добавить пользователя
        
      </ModalHeader>
      <ModalBody
        className={'modal-back'}
      >
        <Alert color='danger' fade={true} isOpen={!validInput}>
          Заполните поле Имя
        </Alert>
        <Row>
          <Col xs='6'>
            <Input 
              placeholder='Имя:' 
              className='input' 
              required 
              id='name' 
              onChange={onChange} 
            />
          </Col>
          <Col xs='6'>
            <Input 
              placeholder='Фамилия:' 
              className='input' 
              id='lastname' 
              onChange={onChange}
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
            />
          </Col>
          <Col xs='12' md='6'>
            <Input 
              placeholder='Phone:' 
              className='input' 
              id='county' 
              onChange={onChange}
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
              let res = await addCustomer();
              if(res) {
                console.log(res);
                toggle();
                setCustomer(defaultCustomer);
                setValidInput(true);
              }else{
                setValidInput(false);
              }
            }}
            >
            Добавить
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

