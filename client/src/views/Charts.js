import React, {useState, useEffect} from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import { Bar } from "react-chartjs-2";

import {
  bar,
} from "variables/charts";

export const Charts = () => {
  let [customers, setCustomers] = useState([]);
  let [dataCustomers, setDataCustomers] = useState([]);
  let [labelCustomers, setLabelCustomers] = useState([]);
  let [sumExpenses, setSumExpenses] = useState(0);

  let [addresses, setAddresses] = useState([]);
  let [dataAddresses, setDataAddresses] = useState([]);
  let [labelAddresses, setLabelAddresses] = useState([]);

  let getCustomers = async () => {
    try{
      let res = await fetch('/customer/get/expenses');
      let ans = await res.json();
      console.log(ans);
      setCustomers(ans);
    }catch(e){
      console.log(e.message)
    }
  }

  let getAddresses = async () => {
    try{
      let res = await fetch('/customer/get/address');
      let ans = await res.json();
      console.log('address', ans)
      setAddresses(ans);
    }catch(e){
      console.log(e.message)
    }
  }

  useEffect(() => {
    if(!customers.length){
      getCustomers();
    }else{
      let data = [];
      let label = [];
      customers.forEach((item) => {
        data.push(item.expenses);
        label.push(item.lastname + ' ' + item.name)
      });
      setDataCustomers([...data]);
      setLabelCustomers([...label]);
    }
  }, [customers]);

  useEffect(() => {
    let sum = dataCustomers.reduce((acc, item) => acc + +item, 0);
    sum.toFixed(2);
    setSumExpenses(sum);
  }, [dataCustomers]);

  useEffect(() => {
    if(!addresses.length){
      getAddresses();
    }else{
      let data = [];
      let label = [];
      addresses.forEach((item) => {
        data.push(item.count);
        label.push(item.lastname + ' ' + item.name)
      });
      setDataAddresses([...data]);
      setLabelAddresses([...label]);
    }
  }, [addresses]);

  return (
    <div className="content">
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <h5 className="card-category">Total Expenses of top 10 customers</h5>
              <CardTitle tag="h3">
                {sumExpenses}
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Bar
                  data={bar(dataCustomers, labelCustomers, 'Expenses').data}
                  options={bar(dataCustomers, labelCustomers, 'Expenses').options}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <h5 className="card-category">Max Count Addresses of customers</h5>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Bar
                  data={bar(dataAddresses, labelAddresses, 'Count addresses').data}
                  options={bar(dataAddresses, labelAddresses, 'Count addresses').options}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
