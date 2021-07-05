// import logo from './logo.svg';
// import './App.css';
import TodoFeature from './Features/Todo';
import AlbumFeature from './Features/AlbumMusic';
import StateExcercise from './Features/StateExcercise';
import { Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';

function App() {

  const lastName = "Huu Nhat";
  const firstName = "Vo ";
  const age = 26;
  const gender = true;
  const myhobbys = ['coding', 'reading', 'runing', 'eat'];

  return (
    <div className="App">
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
        <p><NavLink to="/Todo">To do list</NavLink></p>
        <p><NavLink to="/AlbumMusic">Album Music</NavLink></p>
        <p><NavLink to="/StateExvercise">State Exvercise</NavLink></p>


        {/* Noted : sử dụng Switch và route matching  */}
        <Switch>

          {/* Noded : sử dụng Redirect */}
          <Redirect from="/from" to="/" />
          <Redirect from="/from-binh-duong" to="/" exact />

          {/* Noded : Route matching */}
          <Route path="/" component={TodoFeature} exact />
          <Route path="/Todo" component={TodoFeature} />
          {/* <TodoFeature></TodoFeature> */}


          <Route path="/AlbumMusic" component={AlbumFeature} />
          {/* <AlbumFeature /> */}


          <Route path="/StateExvercise" component={StateExcercise} />
          {/* <StateExcercise /> */}
        </Switch>

      </header>
    </div>
  );
}

export default App;
