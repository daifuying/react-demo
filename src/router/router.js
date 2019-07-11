import React,{Component} from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import Home from '../pages/home/home';
import Login from '../pages/login/login';
class Routes extends Component{
    render(){
        return (
            <Router>
                    <Route exact path="/" component={Login} />
                    <Route  path="/home" component={Home} />
            </Router>
        );
    }
}
export default Routes;
