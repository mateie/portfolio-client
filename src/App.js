import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './assets/less/App.less';

import { AuthProvider } from './context/auth';

import { ScrollTop } from 'primereact/scrolltop';

import Navigation from './components/Navigation';

import Home from './pages/Home';
import Repos from './pages/Repos';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <ScrollTop />
                <Navigation />
                <div className='content'>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/repos' component={Repos} />
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;