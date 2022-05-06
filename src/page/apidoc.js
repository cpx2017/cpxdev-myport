import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {
  Backdrop,
} from '@material-ui/core';

import Home from '../apiCom/home';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  
  const ApiDoc = ({col, setCol,setP}) => {
    React.useEffect(() => {
      setP(localStorage.getItem('langconfig') !== null && localStorage.getItem('langconfig') == 'th' ? 'บริการ API' : 'API Service')
    }, [])
    const Refreshdetect = (e) => {
      if (col.api === true) {
        e.preventDefault();
        e.returnValue = "";
      }
    }
  
    useEffect(() => {
      window.addEventListener('beforeunload', Refreshdetect);
      return () => {
        window.removeEventListener("beforeunload", Refreshdetect);
      };
    });

    const classes = useStyles();
    const [ Load, setLoad] = React.useState(false);
  
    return (
      <div>
      <div className={classes.root}>
        <Home col={col} setCol={(val) => setCol(val)} Load={Load} setLoadIco={(e) => setLoad(e)} />
      </div>
        
        <Backdrop
              className={classes.backdrop}
              open={Load}
            >
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="70px" alt="load" />
            </Backdrop>
      </div>
    );
  }
  export default ApiDoc;