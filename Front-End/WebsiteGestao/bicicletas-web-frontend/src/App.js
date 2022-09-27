import {StyledContainer} from './components/Styles'
import { NavBarContainer } from './components/StylesNavBar'

import Home from './pages/Home'
import Login from './pages/Login'
import Singup from './pages/Singup'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Alugueres from './pages/Alugueres'
import Bicicletas from './pages/Bicicletas'
import NovaBike from './pages/NovaBike'
import Maps from './pages/Maps'
import Stats from './pages/Stats'

import NavBar from './NavBar/Navbar'
import Navbar from './navbarTest/navbar'

import { BrowserRouter as Router, Switch, Route , Redirect} from 'react-router-dom'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// auth & redux
import AuthRoute from './components/AuthRoute';
import BasicRoute from './components/BasicRoute';
import{connect} from 'react-redux';

//forceRefresh={true}

function App({checked}) {
  return (
    <Router forceRefresh={true}>
      <NavBarContainer>
          <Navbar/>
      </NavBarContainer>
      <main>
        {checked &&
      <StyledContainer>
        <Switch>
          <BasicRoute path="/login" exact>
            <Login />
          </BasicRoute>
          <BasicRoute path="/singup" exact>
            <Singup />
          </BasicRoute>
          <AuthRoute path="/logout" exact>
            <Dashboard />
          </AuthRoute>
          <AuthRoute path="/novaBike" exact>
            <NovaBike />
          </AuthRoute>
          <AuthRoute path="/users" exact>
            <Users />
          </AuthRoute>
          <AuthRoute path="/alugueres" exact>
            <Alugueres />
          </AuthRoute>
          <AuthRoute path="/bicicletas" exact>
            <Bicicletas />
          </AuthRoute>
          <AuthRoute path="/maps" exact>
            <Maps />
          </AuthRoute>
          <AuthRoute path="/stats" exact>
            <Stats />
          </AuthRoute>
          <Route path="/" exact>
            <Home />
          </Route>
          <Redirect to="/" />
        </Switch>
      </StyledContainer>
      }
      </main>
    </Router>
    
  );
}

const mapStateToProps = ({session}) => ({
  checked: session.checked
})

export default connect(mapStateToProps)(App);