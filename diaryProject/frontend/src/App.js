import './css/App.css';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Header from './components/Header'
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import New from './pages/New';
import axios from 'axios';
import moment from 'moment';

const reducer = (state, action) =>{
  let newState = [];
  switch(action.type){
    case "CLEAR":
      break;
    case "INIT":
      if(state.findIndex((e)=>e.id === action.data.id) != -1) {
        return state;
      }
      newState = [...state,action.data];
      break;
    case "CREATE":
      newState = [...state,action.data];
      axios.post('/diary/insertDiary',null,{
        params:{
          diaryDate:action.data.date,
          content:action.data.content,
          chkYn:'N'
        }
      })
      .then(response => {
        console.log(response)
        if(response.status === 200){
          alert('일정이 정상적으로 등록 되었습니다.')
        }else{
          alert('일정이 등록되지 못했습니다.\n다시 시도해주세요.');
          return state;
        }      
      })
      .catch(error => console.log(error))
      break;
    case "DELETE":
      newState = state.filter((it)=>it.id != action.targetId);
    
      axios.post('/diary/deleteDiary',null,{
        params:{
          diaryId:action.targetId
        }
      })
      .then(response => {
        if(response.data === 1){
          alert('일정이 정상적으로 삭제되었습니다.')
        }else{
          alert('일정이 삭제되지 못했습니다.\n다시 시도해주세요.')
          return state;
        }
      })
      .catch(error => console.log(error));
      break;
    case "EDIT":
      newState = state.map((it)=>it.id===action.data.id?{...action.data}:it);
      if(action.data.editYn ==='Y'){
        if(action.data.chkYn===false) action.data.chkYn='N'
        else action.data.chkYn='Y'

        axios.get('/diary/updateDiary',{
          params:{
            diaryId:action.data.id,
            content:action.data.content,
            chkYn:action.data.chkYn
          }
        })
        .then(response => {
          if(response.data === 1){
            alert('일정이 정상적으로 수정되었습니다.')
          }else{
            alert('일정을 수정하지 못했습니다.\n다시 시도해주세요.')
            return state;
          }
        })
        .catch(error => console.log(error))
      }
      break;
    default:
      break;
  }
  return newState;
}

export const ScheduleContext = React.createContext();
export const ScheduleDataContext = React.createContext();

function App() {
  //월별 등록된 일정 불러와야 함. -> 월이 바뀔때마다 다시 불러와야한다. 
  const [monthData,setMonthData] = useState();
  const [rowData,dispatch] = useReducer(reducer,[]);
  const [thisMonth,setThisMonth] = useState(moment().format('YYYYMM'));

  useEffect(()=>{
    axios.get('/diary/getDiaryList',{
      params:{
        diaryDateByMonth:thisMonth
      }
    })
    .then((response) => {
      for(const dat of response.data){
        if(dat.chkYn === 'Y'){
          dat.chkYn = true;
        }else{
          dat.chkYn = false;
        }
      }
      setMonthData(response.data);
    })
    .catch(error => console.log(error))
  },[rowData,thisMonth]);

  const onCreate = (date,content) =>{
    dispatch({
      type:"CREATE",
      data:{
        date:date,
        content
      }
    });
  }

  const onInit = (diaryId,date,content,chkYn) =>{
    dispatch({
      type:"INIT",
      data:{
        id:diaryId,
        date:date,
        content,
        chkYn:chkYn
      }
    });
  }
  
  const onClear = () => {
    dispatch({
      type:"CLEAR"
    });
  }

  const onDelete = (targetId) =>{
    dispatch({type:"DELETE", targetId});
  }
  
  const onEdit = (targetId, content,chkYn,editYn) =>{
    dispatch({
      type:"EDIT",
      data:{
        id:targetId,
        content,
        chkYn:chkYn,
        editYn:editYn
      }
    })
  }

  return (
    <ScheduleContext.Provider value={{rowData,onClear,onInit,onCreate, onEdit, onDelete}} >
      <ScheduleDataContext.Provider value={{monthData,setThisMonth}} >
        <ThemeProvider
          breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
          minBreakpoint="xxs"
        >
            <div className="App">
              <Header/>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cal' element={<Calendar />} />
              <Route path='/new/:date' element={<New />} />
            </Routes>
            </div>
          </ThemeProvider>
        </ScheduleDataContext.Provider>
      </ScheduleContext.Provider>
  );
}

export default App;
