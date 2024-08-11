import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Login from './components/Login';
import PrincipalDashboard from './components/PrincipalDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';

const App = () => {
  const { auth } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute
            path="/"
            component={
              auth.user?.role === 'principal'
                ? PrincipalDashboard
                : auth.user?.role === 'teacher'
                ? TeacherDashboard
                : StudentDashboard
            }
          />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
