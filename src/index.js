// Core
// import { hot, AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';

// Components
import HospitalizationForm from './components/HospitalizationForm';

// Styles
import './scss/index.scss';

function renderApp() {
    const App = () => (
        // <AppContainer className="container">
            <Provider store={ store }>
                <HospitalizationForm />
            </Provider>
        // </AppContainer>
    );
    ReactDOM.render(<App />, document.getElementById('HospitalizationReception'))
};

renderApp();

// Hot Reloading
// hot(module)(renderApp);