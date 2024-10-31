import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Main from './components/Main/Main';
import LoginForm from './components/Member/LoginForm';
import LogOut from './components/Member/LogOut';
import './css/style05.css';
import './css/table.css';
import Board from './components/Board/Board';
import BoardList from './components/Board/BoardList';
import BoardDetail from './components/Board/BoardDetail';

const App = () => {
  const [loginId, setLoginId] = useState(null);
  const userId = sessionStorage.getItem('userId');

  const Logout = () => {
    setLoginId(null); 
  };

  return (
    <BrowserRouter>
      <>
        <nav className='menunav'>
          <ul>
            <li><Link to='/'>메인화면</Link></li>

                <li><Link to='/logout'>로그아웃</Link></li>
                <li>안녕하세요, {userId}님</li> 
                <li><Link to='/board'>게시판</Link></li>
                <li><Link to='/board/list'>목록</Link></li>
              <li><Link to='/loginForm'>로그인</Link></li>

          </ul>
        </nav>

        {/* 화면 */}
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/loginForm' element={<LoginForm />} />
          <Route path='/logout' element={<LogOut onLogout={Logout} />} />
          <Route path='/board' element={<Board loginId={loginId}/>} />
          <Route path='/board/list' element={<BoardList />} />
          <Route path='/board/detail/:seq' element={<BoardDetail />} />
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;
