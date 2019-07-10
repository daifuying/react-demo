import React,{Component,Fragment} from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import Simple from '../pages/simple';
import TestB2 from '../pages/testB2';
class Routes extends Component{
    render(){
        return (
            <Router>
                    <Route exact path="/" component={TestB2} />
                    <Route  path="/simple" component={Simple} />
            </Router>
        );
    }
}
export default Routes;
