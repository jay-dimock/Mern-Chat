import React from 'react';
import './App.css';
import { Router } from '@reach/router'
import {CssBaseline} from '@material-ui/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors'
import Main from './views/Main'

function App() {
  const theme = createMuiTheme({ 
    palette: { 
      type: 'dark', 
      primary: green,
    } 
  });

  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <Main default path = "/"/>
      </Router>
    </ThemeProvider>
    </div>
  );
}

export default App;
