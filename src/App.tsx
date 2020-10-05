import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Logout from './components/Logout/Logout';
import Auth from './containers/Auth/Auth';
import Quiz from './containers/Quiz/Quiz';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import Layout from './hoc/Layout/Layout';
import { autoLogin } from './redux/actions/authActions';
import { IRootState } from './redux/reducers/rootReducer';


const App: React.FC = (): JSX.Element => {

  const isAuth = useSelector( ( state: IRootState ) => state.auth.isAuth );
  const dispatch = useDispatch();
  useEffect( () => {
    dispatch( autoLogin() );
  }, [] );

  return (
    <Layout>
      <Switch>
        {isAuth && <Route exact path='/' component={QuizList} />}
        {!isAuth && <Route path='/auth' component={Auth} />}
        {isAuth && <Route path='/logout' component={Logout} />}
        {isAuth && <Route path='/quiz-creator' component={QuizCreator} />}
        {isAuth && <Route path='/quiz/:id' component={Quiz} />}
        <Redirect to={isAuth ? "/" : "/auth"} />
      </Switch>
    </Layout>
  );
};

export default App;
