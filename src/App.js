import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import Landing from './components/Landing/Landing'
import ParentLogin from './components/ParentLogin/ParentLogin'
import RegistrationRoute from './routes/RegistrationRoute/RegistrationRoute'
import ParentDashboard from './components/ParentDashboard/ParentDashboard'
import Header from './components/Header/Header'
import AddTask from './routes/AddTask/AddTask'
import './App.css';

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
          <PrivateRoute exact path={'/parent-dashboard'} component={ParentDashboard}/>
          {/* <Route component={NotFoundPage} /> */}
          <PublicRoute exact path={'/household/:id'} component={AddTask}/>

        </Switch>
      </main>
    </div>
  );
}

export default App;
