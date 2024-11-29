import './App.css';
import SiteFooter from './components/common/SiteFooter';
import SiteNav from './components/common/SiteNav';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route, Routes} from 'react-router-dom'; 

import HomePage from './components/home/HomePage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import Contents from './components/contents/contents';


function App() {
  return (
    <div>
      <SiteNav/>
        <Routes>
          <Route path='*' element={<HomePage/>}/>
          <Route path='/' exact={true} element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/contents' element={<Contents/>}/>
        </Routes>
      <SiteFooter/>
    </div>
  );
}

export default App;
