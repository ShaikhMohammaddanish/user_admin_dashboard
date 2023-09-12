import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { UserProvider } from './contex/UsersContext';

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
