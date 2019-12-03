import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import Landing from './components/Landing/Landing'
import ParentLogin from './components/parentlogin/ParentLogin'
import RegistrationRoute from './routes/RegistrationRoute/RegistrationRoute'
import ParentDashboard from './components/ParentDashboard/ParentDashboard'
import Header from './components/Header/Header'
import HouseholdPage from './routes/HouseholdPage/HouseholdPage'
import MemberDashboard from './components/MemberDashboard/MemberDashboard'
import MemberLogin from './components/MemberLogin/MemberLogin'
import EditMember from  './components/EditMember/EditMember'
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Switch>
          <Route exact path={'/'} component={Landing} />
          <PublicRoute exact path={'/login'} component={ParentLogin} />
          <PublicRoute exact path={'/kidLogin'} component={MemberLogin} />
          <PublicRoute exact path={'/register'} component={RegistrationRoute} />
          <PrivateRoute exact path={'/parent-dashboard'} component={ParentDashboard}/>
          <Route exact path={'/member-dashboard'} component={MemberDashboard}/>
          <PrivateRoute exact path={'/household/:id'} component={HouseholdPage}/>
          {/* <Route component={NotFoundPage} /> */}
        </Switch>
      </main>
    </div>
  );
}

export default App;
