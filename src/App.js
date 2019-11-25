import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PublicRoute from './routes/PublicRoute'
import Landing from './components/landing/landing'
import ParentLogin from './components/parentlogin'

import './App.css';

function App() {
  return (
    <div className="App">

      <main>
        <Switch>
          <PublicRoute exact path={'/'} component={Landing} />
          <PublicRoute exact path={'/parent'} component={ParentLogin} />
          {/* <PublicRoute exact path={'/register'} component={RegistrationRoute} /> */}
          {/* <Route component={NotFoundPage} /> */}
        </Switch>
      </main>
    </div>
  );
}

export default App;
