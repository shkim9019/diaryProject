import '../css/New.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React, {useState,useContext, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ScheduleContext, ScheduleDataContext } from '../App';
import moment from 'moment';

const New = () =>{
  const {rowData, onClear, onInit,onCreate,onEdit, onDelete} = useContext(ScheduleContext);
  const {monthData} = useContext(ScheduleDataContext);
  const {date}   = useParams();
  const navigate = useNavigate();
  const [newData,setNewData] = useState([]);

  useEffect(()=>{
    const title = document.getElementsByTagName('title')[0];
    const dateFormat = moment(date).format('YYYY.MM.DD');
    title.innerHTML = `오늘의 할일 - ${dateFormat}`;
  })

  // 엔터 누르면 등록
  const handleKeyDown = (code,cont)=>{
    if(code ==='Enter'){
      regSchd(cont);
    }
  }

  // 일정 삭제
  const deleteDiary = (id) => {
    if(window.confirm("일정을 삭제하시겠습니까?")){
      onDelete(id)
      navigate('/cal',{replace:true});
    }
  }

  // 일정 수정
  const editDiary = (id,content,chkYn) => {
    if(window.confirm("일정을 수정하시겠습니까?")){
      onEdit(id,content,chkYn,'Y');
      navigate('/cal',{replace:true});
    }
  }

  // 일정 등록
  const regSchd = (cont)=>{
    if(window.confirm("일정을 등록하시겠습니까?")){
      onCreate(date,cont);
      setNewData([]);
      navigate('/cal',{replace:true});
    }
  }

  // 마운트시에 데이터 불러오기
  useEffect(()=>{
    if(monthData && monthData.length>0){
      for(const data of monthData){
        if(data.diaryDate !== date) continue;
        onInit(data.diaryId,date,data.content,data.chkYn);
      }
    }
  },[])

  return (
    <Container className='New'>
      <Row>
        <Col xxl={9} md={9} sm={9} xs={9} xxs={9}>
          <h1>
            오늘의 할일 
            <span> ◜{date}◞ </span>
          </h1>
        </Col>
        <Col xxl={3} md={3} sm={3} xs={3} xxs={3} className="d-grid">
          <Button className='backBtn'
            onClick={()=>{onClear();navigate('/cal',{replace:true});}}
          >뒤로가기</Button>
        </Col>
      </Row><br/>
      <h2>등록된 일정</h2>
      <Row className='scheduleDiv'>
        {rowData.length>0?rowData.map((it)=>{
          return(
          <Row key={it.id}>
            <Col xxl={1} md={1} sm={1} xs={1} xxs={1} className='chkDiv'>
            <Form.Check 
              type='checkbox'
              id={it.diaryId}
              checked={it.chkYn}
              onChange={(e)=>onEdit(it.id,it.content,e.target.checked,'N')}
            />
            </Col>
            <Col xxl={7} md={7} sm={7} xs={7} xxs={7} className='content'>
              <Form.Control 
                type='text' 
                value={it.content}
                onChange={(e)=>onEdit(it.id,e.target.value,it.chkYn,'N')}
              />
            </Col>
            <Col xxl={2} md={2} sm={2} xs={2} xxs={2} className='d-grid'>
              <Button 
                className='editBtn'
                onClick={()=>editDiary(it.id,it.content,it.chkYn,'Y')}
              >수정하기</Button>
            </Col>
            <Col xxl={2} md={2} sm={2} xs={2} xxs={2} className='d-grid'>
              <Button 
                className='delBtn'
                onClick={()=>deleteDiary(it.id)}
                >삭제하기</Button>
            </Col>
          </Row>
        )
        }):
        <Col className='noContent'> 등록된 일정이 없습니다.</Col>
        }
      </Row><br/>
      <h2>등록하기</h2>
      <InputGroup>
        <Form.Control 
          as='textarea' 
          aria-label='등록하기'
          value={newData}
          onChange={(e)=>setNewData(e.target.value)}
          onKeyDown={(e)=>handleKeyDown(e.code,e.target.value)}
          />
        <InputGroup.Text onClick={(e)=>regSchd(newData)}>등록</InputGroup.Text>
      </InputGroup>
    </Container>
  )
}

export default React.memo(New);