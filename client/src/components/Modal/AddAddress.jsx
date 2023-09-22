import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Container, Input, Alert} from 'reactstrap';
import '../../assets/components/ModalWindow.css'

export const AddAddress = ({isOpen, toggle, tableUpdate, customerId}) => {
  const defaultAddress = {
    customer_id: customerId ? customerId : '',
    country: '',
    county: '',
    city: '',
    house: '',
    apartment: '',
    zipcode: '',
  }

  let [address, setAddress] = useState(defaultAddress);
  let [validInput, setValidInput] = useState(true);

  useEffect(() => {
    setAddress({...defaultAddress});
  }, [customerId]);

  useEffect(() => {
    setTimeout(() => {
      if(!validInput) setValidInput(true);
    }, 3000);
  }, [validInput]);


  const onChange = (event) => {
    let {id, value} = event.target;
    setAddress({...address, [id]:value});
  }

  const addAddress = async () => {
    try{
      if(!address.customer_id || !address.country) {
        throw new Error('Не заполнены необходимые поля');
      }
      let res = await fetch('/address/add', {
        method: 'POST',
        headers:{
          'content-type': 'application/json',
        },
        body: JSON.stringify(address),
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
        Добавить адрес
        
      </ModalHeader>
      <ModalBody
        className={'modal-back'}
      >
        <Alert color='danger' fade={true} isOpen={!validInput}>
          Заполните поля Customer id и Страна
        </Alert>
        <Row>
          <Col xs='6'>
            <Input 
              placeholder='Customer id:' 
              className='input' 
              required 
              id='customer_id' 
              onChange={onChange} 
              value={address.customer_id} 
              onKeyUp={(event) => checkInputNumber(event)}
            />
          </Col>
          <Col xs='6'>
            <Input 
              placeholder='Почтовый индекс:' 
              className='input' 
              id='zipcode' 
              onChange={onChange}
              onKeyUp={(event) => checkInputNumber(event)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs='12' md='6'>
            <Input 
              placeholder='Страна:' 
              className='input' 
              required 
              id='country' 
              onChange={onChange}
            />
          </Col>
          <Col xs='12' md='6'>
            <Input 
              placeholder='Область:' 
              className='input' 
              id='county' 
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row>
          <Col xs='12' md='4'>
            <Input 
              placeholder='Город:' 
              className='input' 
              id='city' 
              onChange={onChange}
            />
          </Col>
          <Col xs='12' md='4'>
            <Input 
              placeholder='Дом:' 
              className='input' 
              id='house' 
              onChange={onChange}
              onKeyUp={(event) => checkInputNumber(event)}
            />
          </Col>
          <Col xs='12' md='4'>
            <Input 
              placeholder='Квартира:' 
              className='input' 
              id='apartment' 
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
              let res = await addAddress();
              if(res) {
                console.log(res);
                toggle();
                setAddress(defaultAddress);
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

