// import logo from './logo.svg';
// import './App.css';
import Header from 'components/Header';
import { useEffect } from 'react';
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import productApi from './api/productApi';
import NotFound from './components/NotFound';
import AlbumFeature from './Features/AlbumMusic';
import CounterFeature from './Features/Counter';
import StateExcercise from './Features/StateExcercise';
import TodoFeature from './Features/Todo';

function App() {

  const lastName = "Huu Nhat";
  const firstName = "Vo ";
  const age = 26;
  const gender = true;
  const myhobbys = ['coding', 'reading', 'runing', 'eat'];


  //Bài 58 : Demo gọi API lấy dữ liệu
  // cách gọi Api thì sử dụng Effect -> ở ví dụ này chỉ muốn load 1 lần duy nhất thì truyền dependence rỗng
  useEffect(() => {
    const fetchProducts = async () =>{
      const params = {_limit : 10,};  // yêu cầu chỉ lấy ra 10 record
      const productList = await productApi.getAll(params);
      console.log(productList);
    };
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <Header />
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h3> {firstName} {lastName} - {age} - {gender ? 'Nam' : 'Nữ'}</h3>
        <ul>
          {myhobbys.map((hobby, index) => (  //cú pháp của JSX thay vì {} thì sử dụng ()
            <li key={index}>
              {hobby}
            </li>
          ))
          }
        </ul>

        {/* sử dụng Link  */}
        <p><Link to="/Todo">To do list</Link></p>
        <p><Link to="/AlbumMusic">Album Music</Link></p>
        <p><Link to="/StateExvercise">State Exvercise</Link></p>

        {/* Sử dung NavLink */}
        


        {/* Noted : sử dụng Switch và route matching  */}
        <Switch>

          {/* Noded : sử dụng Redirect */}
          <Redirect from="/from" to="/" />
          <Redirect from="/from-binh-duong" to="/" exact />

          {/* Noded : Route matching */}
          <Route path="/" component={CounterFeature} exact />
          <Route path="/Todo" component={TodoFeature} />
          {/* <TodoFeature></TodoFeature> */}


          <Route path="/AlbumMusic" component={AlbumFeature} />
          {/* <AlbumFeature /> */}


          <Route path="/StateExvercise" component={StateExcercise} />
          {/* <StateExcercise /> */}

          {/* TẠO RA 1 ROUTE NOT FOUND KHI KHÔNG TÌM THẤY DƯỜNG DẪN */}
          <Route component={NotFound} />
        </Switch>

      </header>
    </div>
  );
}

export default App;
