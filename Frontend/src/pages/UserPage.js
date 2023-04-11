import React, { useEffect } from 'react'
import { Route, Routes , useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios';
import AddBook from './component.js/AddBook';
import AddUser from './component.js/AddUser';
import ListBooks from './component.js/ListBooks'
import MyBooks from './component.js/MyBooks'
import Login from './component.js/Login'
import Header from './component.js/Header'
import MyBorrows from './component.js/MyBorrows'
import 'bootstrap/dist/css/bootstrap.min.css';
export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const UserConnected = ({ setUserInfo, userInfo }) => {
  const history = useNavigate();
  let location = useLocation();

  React.useEffect(() => {
    setUserInfo(null)
    axios.get('/isConnected').then(response => {
      setUserInfo(response.data)
    }, () => {
      if (!location.pathname === '/addUser') {
        history("/login")
      }
    })
  }, [history, setUserInfo, location.pathname]);

  return (<>
    {userInfo && <Header userInfo={userInfo} setUserInfo={setUserInfo} />}
  </>)
}
function App() {

  const [userInfo, setUserInfo] = React.useState('');
  useEffect(() => {
    axios.interceptors.request.use(function (request) {
      const token = sessionStorage.getItem(AUTH_TOKEN_KEY)
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request
    }, (error) => {
      return Promise.reject(error);
    });
  })


  return (
    <div>
   <UserConnected userInfo={userInfo} setUserInfo={setUserInfo} />
   <div className="App">
     <Routes>
       <Route path="listBooks" element={<ListBooks />} />
       <Route path="myBooks" element={<MyBooks />} />
       <Route path="addBook" element={<AddBook />} />
       <Route path="addBook/:bookId" element={<AddBook />} />
       <Route path="myBorrows" element={<MyBorrows />} />
       <Route path="addUser" element={<AddUser  setUserInfo={setUserInfo} />} />
       <Route path="*" element={<Login setUserInfo={setUserInfo} />} />
     </Routes>
   </div>
 </div>
  );
}
export default App;
