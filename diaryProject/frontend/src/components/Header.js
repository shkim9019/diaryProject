import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className='Header'>
      <span>
        <div className='logoWrapper' onClick={()=>navigate('/')}>
          <img src={process.env.PUBLIC_URL+"/images/home.png"} alt="홈버튼"/>
          <h1> 오늘의 할일</h1>
        </div>
      </span>
    </header>
  )
};

export default React.memo(Header);