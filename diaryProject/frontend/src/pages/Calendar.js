import 'react-calendar/dist/Calendar.css';
import '../css/Calendar.css'
import React,{ useContext, useEffect, useState } from 'react';
import Cal from 'react-calendar';
import moment from 'moment/moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {  useNavigate } from 'react-router-dom';
import { ScheduleDataContext } from '../App';

const Calendar = () => {
  let {monthData,setThisMonth} = useContext(ScheduleDataContext);
  const navigate = useNavigate();
  const [date,setDate] = useState(moment().format('YYYYMMDD'));
  const [mark,setMark] = useState([]);

  useEffect(()=>{
    const title = document.getElementsByTagName('title')[0];
    title.innerHTML = `오늘의 할일 - 월별조회`;
  })

  useEffect(()=>{
    const markList = [];
    for(const item of monthData){
      if(markList.includes(item.diaryDate)) continue;
      markList.push(item.diaryDate);
    }
    setMark(markList);
  },[monthData]);

  const handleDate =(targetDate)=>{
    setDate(moment(targetDate).format('YYYYMMDD'));
  }

   // 달이 바뀔 때 달별 데이터 불러오기
  const handleMonth = (targetDate)=>{
    if(moment(date).format('YYYYMM') !== moment(targetDate).format('YYYYMM')){
      setThisMonth(moment(targetDate).format('YYYYMM'));
    }
    setDate(moment(targetDate).format('YYYYMMDD'));    
  }

  return (
    <Container className='Calendar'>
      <Cal
        calendarType='gregory' //일요일부터 시작
        formatDay={(locale,date) => moment(date).format('DD')} //숫자만 보이도록 설정
        onChange={(e)=>handleDate(e)}
        onActiveStartDateChange={(e)=>handleMonth(e.activeStartDate)}
        showNeighboringMonth={false}
        tileContent={({date,view})=>{
          if(mark.find((x)=> x === moment(date).format('YYYYMMDD'))){
            return(
                <div className="dot"></div>
            )
          }
      }}
      />
      <Row className='diaryList'> 
        <Col xxl={9} md={9} xs={9} xxs={9}>
          <h1>
            등록된 일정<span>  - 선택한 날짜: {moment(date).format('YYYY-MM-DD')}</span>
          </h1>
        </Col>
        <Col xxl={3} md={3} xs={3} xxs={3} className="d-grid">
          <Button 
            variant="info" 
            onClick={()=>navigate(`/new/${date}`)}
          >
            상세보기
          </Button>
        </Col>
      </Row>
      <Row className='listDiv'>
        <ul>
          {monthData?monthData.map((it)=>{
            const dataByMonth = moment(it.diaryDate).format('YYYYMMDD');
            if(dataByMonth === date){
              return(
                <li key={it.diaryId}>{it.content}</li>
              )
            }
          }):''}
        </ul>
      </Row>
    </Container>
  )
}

export default React.memo(Calendar);