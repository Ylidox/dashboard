import React, {useState, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import '../../assets/components/AgTable.css'

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  ButtonGroup,
  Button,
  
} from 'reactstrap'

export const AgTable = ({ 
    title,
    columnsDef, 
    onGridReady,
    rowModelType, 
    onRowSelected, 
    showButtonsGroup,
    onClickAdd,
    onClickUpdate,
    onClickDelete,
  }) => {
  return (
    <Row>
      <Col xs="12">
        <Card className="card-chart">
          <CardHeader>
            <CardTitle tag="h2">{title}</CardTitle>
            {showButtonsGroup ? <div>
              <Button 
                color='success'
                onClick={onClickAdd}
              >
                +Добавить
              </Button>
              <Button 
                color='primary' 
                onClick={onClickUpdate}
              >
                Изменить
              </Button>
              <Button 
                color='danger'
                onClick={onClickDelete}
              >
                -Удалить
              </Button>
            </div> : null}
          </CardHeader>
          <CardBody>
            <div className={"ag-theme-alpine-dark " + 'table'}>
              <AgGridReact
                columnDefs={columnsDef}
                defaultColDef={{
                  headerClass: 'table-header',
                }}
                rowClass={'table-row'}
                onGridReady={onGridReady}
                rowSelection='single'
                cacheBlockSize={10}
                rowModelType={rowModelType}
                onRowSelected={onRowSelected || (() => {})}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
