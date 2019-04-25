// Core
import { hot, AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import HospitalizationForm from './components/HospitalizationForm';

// Styles
import './scss/index.scss';

function renderApp() {
    const App = () => (
        <AppContainer>
            <HospitalizationForm />
        </AppContainer>
    );
    ReactDOM.render(<App />, document.getElementById('HospitalizationReception'))
};

renderApp();

// Hot Reloading
hot(module)(renderApp);