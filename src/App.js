import React, { useEffect } from 'react'
import { Route, Routes , useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios';
import AddBook from './component/AddBook';
import AddUser from './component/AddUser';
import ListBooks from './component/ListBooks'
import MyBooks from './component/MyBooks'
import Login from './component/Login'
import Header from './component/Header'
import MyBorrows from './component/MyBorrows'
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderGreen from './component/HeaderGreen';
import ListBooksResearch from './component/ListBooksResearch';
import Footer from './component/Footer';
export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const UserConnected = ({ setUserInfo, userInfo }) => {
  const history = useNavigate();
  let location = useLocation();

  React.useEffect(() => {
    setUserInfo(null)
    axios.get('/isConnected').then(response => {
      axios.get(`/isConnected/${response.data.toLowerCase()}`).then(res =>{
        setUserInfo(res.data) 
      })
     
    }, () => {
      if (!location.pathname === '/addUser') {
        history("/home")
      }
    })
  }, [history, setUserInfo, location.pathname]);

  return (<>
{userInfo ?  <Header userInfo={userInfo} setUserInfo={setUserInfo}  /> : <HeaderGreen/> }  </>)
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
      <Route path="" element={<Login/>}/>
      <Route path="home" element={<Login/>}/>
       <Route path="listBooks" element={<ListBooks />} />
       <Route path="myBooks" element={<MyBooks />} />
       <Route path="addBook" element={<AddBook />} />
       <Route path="addBook/:bookId" element={<AddBook />} />
       <Route path="myBorrows" element={<MyBorrows />} />
       <Route path="addUser" element={<AddUser  setUserInfo={setUserInfo} />} />
       <Route path="login" element={<Login setUserInfo={setUserInfo} />} />
       <Route path="listBooks/:new_mot" element={<ListBooksResearch />} />
       {/* <Route  element={<Footer />} /> */}
     </Routes> 
     <Footer />
   </div>
  
 </div>
  );
}
export default App;
