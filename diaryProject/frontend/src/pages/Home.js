import '../css/Home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = ()=>{
  const navigate = useNavigate();

  useEffect(()=>{
    const title = document.getElementsByTagName('title')[0];
    title.innerHTML = `오늘의 할일`;
  })

  return (
    <Container className='Home'>
      <Row>
        <Col className='intro'>
          <div>
            <img src={process.env.PUBLIC_URL+'/images/diaryImg.jpg'} />
          </div>
          <div>
            <p> 날짜 별로 오늘의 할일을 저장 할 수 있는 <br /> 사이트 입니다.<br />아래 버튼을 눌러 진행 해 주세요.</p>
          </div>          
        </Col>
      </Row>
      <Row>
        <Col className="d-grid gap-2 showCal">
          <Button 
            variant="outline-info" 
            size="lg"
            onClick={()=>navigate('/cal')}
          > 캘린더 보기</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Home;