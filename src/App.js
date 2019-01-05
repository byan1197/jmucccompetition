import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import RouteList from './components/RouteList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {

  force = () => this.forceUpdate();

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <NavBar {...{ update: () => { this.force() } }} />
          <div className='app-content'>
            <ToastContainer
              position="top-center"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover
            />
            <RouteList />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
