import React, {useEffect, useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Container, Input, Alert} from 'reactstrap';
import '../../assets/components/ModalWindow.css'

export const UpdateAddress = ({
    isOpen, 
    toggle, 
    selectAddress, 
    setSelectAddress, 
    customerId, 
    tableUpdate
  }) => {
  let [validInput, setValidInput] = useState(true);
  
  const onChange = (event) => {
    let {id, value} = event.target;
    setSelectAddress({...selectAddress, [id]:value});
  }

  useEffect(() => {
    setSelectAddress({});
  }, [customerId]);

  useEffect(() => {
    setTimeout(() => {
      if(!validInput) setValidInput(true);
    }, 3000);
  }, [validInput]);

  let updateAddress = async () => {
    try{
      if(selectAddress.country === '') throw new Error('Заполните поле Страна');
      let res = await fetch('/address/change', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(selectAddress),
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
      {!selectAddress.id ? 
        <Alert color='danger' isOpen={isOpen} className='alert-danger-update' toggle={toggle}>
          Выберите строку адреса
        </Alert> 
        :
        <>
          <ModalHeader
            tag={'h3'}
            className={'modal-back modal-header'}
          >
            Изменение адреса
          </ModalHeader>
          <ModalBody
            className={'modal-back'}
          >
            {!validInput ? 
            <Alert color='danger'>
              Поле Страна обязательное 
            </Alert> : null}
            <Row>
              <Col xs='12' md='6'>
                <Input 
                  placeholder='Страна:' 
                  className='input' 
                  required 
                  id='country' 
                  onChange={onChange}
                  value={selectAddress.country} 
                />
              </Col>
              <Col xs='12' md='6'>
                <Input 
                  placeholder='Область:' 
                  className='input' 
                  id='county' 
                  onChange={onChange}
                  value={selectAddress.county}
                />
              </Col>
            </Row>
            <Row>
              <Col xs='6'>
                <Input 
                  placeholder='Почтовый индекс:' 
                  className='input' 
                  id='zipcode'
                  onChange={onChange}
                  value={selectAddress.zipcode} 
                  onKeyUp={(event) => checkInputNumber(event)}
                />
              </Col>
              <Col xs='12' md='6'>
                <Input 
                  placeholder='Город:' 
                  className='input' 
                  id='city' 
                  onChange={onChange}
                  value={selectAddress.city} 
                />
              </Col>
            </Row>
            <Row>
              <Col xs='6'>
                <Input 
                  placeholder='Дом:' 
                  className='input' 
                  id='house' 
                  onChange={onChange}
                  onKeyUp={(event) => checkInputNumber(event)}
                  value={selectAddress.house} 
                />
              </Col>
              <Col xs='6'>
                <Input 
                  placeholder='Квартира:' 
                  className='input' 
                  id='apartment' 
                  onChange={onChange}
                  onKeyUp={(event) => checkInputNumber(event)}
                  value={selectAddress.apartment} 
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