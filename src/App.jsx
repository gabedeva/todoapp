import React, { Suspense, suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainLoader from './components/helpers/MainLoader';
import DashboardLayout from './components/layouts/DashboardLayout';
import CountryState from './context/countries/countryState'
import UserState from './context/user/userState';
import TodoState from './context/todo/todoState';

const Home = React.lazy(() => import('./components/pages/Home'));  // lazy delay pages for few seconds because of API calls
const NotFound = React.lazy(() => import('./components/pages/404'));
const Login = React.lazy(() => import('./components/pages/auth/Login'));
const Register = React.lazy(() => import('./components/pages/auth/Register'));
const Weather = React.lazy(() => import('./components/pages/Weather'));
const DashboardHome = React.lazy(() => import ('./components/pages/dashboard/Home'))
const TodoList = React.lazy(() => import ('./components/pages/dashboard/todo/Todo'))
const AddTodo = React.lazy(() => import ('./components/pages/dashboard/todo/AddTodo'))
const EditTodo = React.lazy(() => import ('./components/pages/dashboard/todo/EditTodo'))
const EditItem = React.lazy(() => import ('./components/pages/dashboard/todo/EditItem'))
const AddItem = React.lazy(() => import ('./components/pages/dashboard/todo/AddItem'))
const TodoDetails = React.lazy(() => import ('./components/pages/dashboard/todo/TodoDetails'))
// const DropSelect = React.lazy(() => import('./components/layouts/partials/DropSelect'));

const App = () => {

  return(

    <Router>
       
      <UserState>

        <CountryState>

          <TodoState>

           <Suspense fallback={MainLoader()}>

              <Switch>

                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/dashboard" component={DashboardLayout(DashboardHome)} />
                  <Route exact path="/dashboard/todo-list" component={DashboardLayout(TodoList)} />
                  <Route exact path="/dashboard/todo-list/add-todo" component={DashboardLayout(AddTodo)} />
                  <Route exact path="/dashboard/todo-list/edit/:id" component={DashboardLayout(EditTodo)} />
                  <Route exact path="/dashboard/todo-list/edit-item/:id" component={DashboardLayout(EditItem)} />
                  <Route exact path="/dashboard/todo-list/add-item/:id" component={DashboardLayout(AddItem)} />
                  <Route exact path="/dashboard/todo-list/:id" component={DashboardLayout(TodoDetails)} />
                  <Route exact path="/weather" component={Weather} />

                  {/* <Route exact path="/select" component={DropSelect} /> */}

                  <Route exact path="*" component={NotFound} />   

              </Switch>

          </Suspense>

          </TodoState>
        </CountryState>
        
      </UserState>

    </Router>

  )

}

export default App;