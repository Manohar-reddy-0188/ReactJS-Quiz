import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Quiz from './containers/Quiz/Quiz';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import Layout from './hoc/Layout/Layout';


const App: React.FC = (): JSX.Element => {
  return (
    <Layout>
      <Switch>
        <Route exact path='/' component={QuizList} />
        <Route path='/auth' component={Auth} />
        <Route path='/quiz-creator' component={QuizCreator} />
        <Route path='/quiz/:id' component={Quiz} />
      </Switch>
    </Layout>
  );
};

export default App;
