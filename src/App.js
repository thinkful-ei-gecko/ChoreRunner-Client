import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import Landing from './components/Landing/landing'
import ParentLogin from './components/ParentLogin/ParentLogin'
import RegistrationRoute from './routes/RegistrationRoute/RegistrationRoute'
import ParentDashboard from './components/ParentDashboard/ParentDashboard'
import Header from './components/Header/Header'
import './App.css';
import Task from './components/TaskPage/Task';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Switch>
          <PublicRoute exact path={'/'} component={Landing} />
          <PublicRoute exact path={'/login'} component={ParentLogin} />
          <PublicRoute exact path={'/register'} component={RegistrationRoute} />
          <PrivateRoute exact path={'/parentDash'} component={ParentDashboard}/>
          {/* <Route component={NotFoundPage} /> */}
          <PrivateRoute exact path={'/task'} component={Task}/>

        </Switch>
      </main>
    </div>
  );
}

export default App;
