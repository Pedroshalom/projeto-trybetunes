import React, { Component } from 'react';
import { CircularProgress } from '@mui/material';

import '../styles/Carregando.css';

class Carregando extends Component {
  render() {
    return <div className="carregando"><CircularProgress /></div>;
  }
}

export default Carregando;
