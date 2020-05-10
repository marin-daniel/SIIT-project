import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css'

import Header from './common/Header';
import Register from './auth/Register';
import Login from './auth/Login';
import AuthContext from './auth/AuthContext';
import Footer from './common/Footer';
import SearchForm from './electronicAPI/SearchForm';
import ProductDetails from './electronicAPI/ProductDetails';
import Products from './electronicAPI/Products'
import BomList from './electronicAPI/BomList'
import HomePage from './projects/HomePage';
import Projects from './projects/Projects'
import EditPart from './electronicAPI/EditPart';
import AddNewPartData from './electronicAPI/AddNewPartData'
import Weather from './weather/Weather'

function App() {

  const [parts, setParts] = useState([]);
  const [partID, setPartID] = useState({});
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if(username) {
        setUsername(username);
    }
  }, []);

  function setPartsData(response) {
    setParts(response);
  }

  function setId(id, qty){
    const newPartID = {...partID};
    newPartID[id] = qty;
    setPartID(newPartID);
  }

  function deletePart(id) {
    const newList = {...partID};
    delete newList[id];
    setPartID(newList);
  }

  function clearList(){
    setPartID({});
  }

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      <BrowserRouter>
        < Header />
        < Footer />
        < SearchForm />
        < BomList partsList={parts} partID={partID}  deletePart={deletePart} clearList={clearList}/>
        < Weather />

        <section className='mainSection'>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/projects'>
            <Projects />
          </Route>
          <Route exact path='/products'>
            <Products setPartsData={setPartsData} setID={setId} />
          </Route>
          <Route exact path='/products/:partId'>
            <ProductDetails partsList={parts} />
          </Route >
          <Route path='/products/edit/:partId'>
            <EditPart partsList={parts} />
          </Route>
          <Route exact path='/add'>
            <AddNewPartData/>
          </Route >
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
        </section>

      </BrowserRouter>
    </AuthContext.Provider>
  )

}

export default App;
