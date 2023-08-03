import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const Calendar = () => {
  const weekDay=['일','월','화','수','목','금','토'];
  const [currentMonth, setCurrnetMonth] = useState(new Date());
  const [selectDate, setSelectDate] = useState(new Date());

  const preMonth =()=>{
    setCurrnetMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth()-1, currentMonth.getDate()))
  }

  const nextMonth = () =>{
    setCurrnetMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth()+1, currentMonth.getDate()))
  }

  const showDate = () =>{
    let dayArr =[];
    let eachWekkArr=[];

    const lastDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth()+1,0).getDate();

    //일요일일 경우 row 추가
    for(let i=0; i<lastDate; i++){
      const day = new Date(currentMonth.getFullYear(), currentMonth.getMonth(),i).getDay();
      dayArr.push(
        <Col
        key={i+1}
        className={[].join(' ')}
        >
          {i+1}
        </Col>
      )
      if(day===6){
        eachWekkArr.push(
        <Row
          key={i+1+day}
        >
          {dayArr}
        </Row>)
      dayArr=[];
      }

    }
    
    return eachWekkArr;
  }

  return (
    <Container className='Calendar'>
      <Row>
        <Col>
          <Button onClick={preMonth}>{'<'}</Button>
        </Col>
        <Col>
          {currentMonth.getFullYear()+'년 '+(currentMonth.getMonth()+1)+'월'}
        </Col>
        <Col>
        <Button onClick={nextMonth}>{'>'}</Button>
        </Col>
      </Row>
      <Row className='Cal'>
        <Col>{weekDay[0]}</Col>
        <Col>{weekDay[1]}</Col>
        <Col>{weekDay[2]}</Col>
        <Col>{weekDay[3]}</Col>
        <Col>{weekDay[4]}</Col>
        <Col>{weekDay[5]}</Col>
        <Col>{weekDay[6]}</Col>
      </Row>
      {showDate()}
    </Container>
  )
}

export default Calendar;