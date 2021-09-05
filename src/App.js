import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ScrollTop } from 'primereact/scrolltop';

import { AuthProvider } from './context/auth';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <ScrollTop />
            </AuthProvider>
        </Router>
    );
};

export default App;