import React, { useState } from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext'
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';
import {IntlProvider} from 'react-intl'
import ruMessage from './components/localization/ru'
import enMessage from './components/localization/en'
import { locales } from './components/localization/locales';

import 'materialize-css'

const messages = {
  [locales.EN]:enMessage,
  [locales.RU]:ruMessage
}
function App() {
  const {token,login,logout,userId,ready,email} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  const [currentLocale, setCurrentLocale] =useState(localStorage.getItem('locale')  || locales.EN)
  if(!ready){
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{
      token,login,logout,userId,isAuthenticated,email
    }}>
          <IntlProvider messages = {messages[currentLocale]}  locale={currentLocale} defaultLocale={locales.RU} >

      <Router>
        <Navbar currentLocale ={currentLocale} onLocalChange ={setCurrentLocale}/>
        <div className = 'container'>
          {routes}
        </div>
      </Router>
      </IntlProvider>

    </AuthContext.Provider>
  )
}

export default App;
