import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import AppNavbar from './components/AppNavbar';
import Employee from './views/Employee';
import EmployeeEdit from './views/EmployeeEdit';
import Movement from './views/Movement';
import MovementEdit from './views/MovementEdit';

class App extends Component {
  render() {
    return (
      <div>
          <Router>
            <div>
              <AppNavbar/>
              <Switch>
                <Route path='/' exact={true} component={Employee}/>
                <Container fluid>
                  <Route path='/employee' exact={true} component={Employee}/>
                  <Route path='/employee/:id' exact={true} component={EmployeeEdit}/>
                  <Route path='/movement' exact={true} component={Movement}/>
                  <Route path='/movement/:fec/:id' exact={true} component={MovementEdit}/>
                </Container>
              </Switch>
            </div>
          </Router>
        </div>
    )
  }
}

export default App;