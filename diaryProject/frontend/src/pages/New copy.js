import '../css/New.css'
import 'ag-grid-community/styles/ag-grid.min.css';
import 'ag-grid-community/styles/ag-theme-alpine.min.css';

import moment from 'moment/moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { useRef, useState,useEffect, useMemo } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const New = () =>{
  const date = useParams();
  const navigate = useNavigate();
  const gridRef = useRef();

  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {field: 'chk', filter: true},
    {field: 'content', filter: true},
    {field: 'del'}
  ]);
  const defaultColDef = useMemo( ()=> ({
    sortable: true
  }));

  return (
    <Container className='New'>
      <Row>
        <Col xxl={9} md={9} sm={9} xs={9} xxs={9}>
          <h1>오늘의 할일</h1>
        </Col>
        <Col xxl={3} md={3} sm={3} xs={3} xxs={3} className="d-grid gap-2">
          <Button 
            variant="info"
            onClick={()=>navigate(-1)}
          >뒤로가기</Button>
        </Col>
      </Row>
      <h2>등록된 일정</h2>
      <div className='ag-theme-alpine' style={{width: '100%', height: 300}}>
        <AgGridReact 
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={rowData}
          rowSelection='multiple' 
        />
      </div>
      <h2>등록하기</h2>
      <InputGroup>
        <Form.Control as='textarea' aria-label='등록하기'/>
        <InputGroup.Text>등록</InputGroup.Text>
      </InputGroup>
    </Container>
  )
}

export default New;