import React, { useState } from 'react';
import '@fontsource/mitr';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel'
import { Grid, Typography, CardContent, Card, CardActionArea, Slide, Grow, Backdrop } from '@material-ui/core';
import Covid from '../component/covidcom';
import en from '../lang/en/home.json';
import th from '../lang/th/home.json';
import BillCom from '../component/billboard';

const useStyles = makeStyles((theme) => ({
    loader: {
      padding: theme.spacing(2),
      textAlign: 'center',
      backgroundColor: '#fff'
    },
  }));

const Home = ({setP}) => {
  React.useEffect(() => {
    setP(localStorage.getItem('langconfig') !== null && localStorage.getItem('langconfig') == 'th' ? 'หน้าหลัก' : 'Homepage')
  }, [])

    const classes = useStyles();
    const [Lang, setLang] = useState(th);
    
    const [Ready, setReady] = useState(false);
    
    const syncpage = () => {
      if (localStorage.getItem('langconfig') !== null) {
        if (localStorage.getItem('langconfig') === 'th') {
          setLang(th);
        } else {
          setLang(en);
        }
      }
    };

    React.useEffect(() => {
      syncpage();
      setReady(true)
    });
    return ( 
      <Grow in={Ready} timeout={localStorage.getItem('graphic') === null ? 1000 : 0}>
      <Carousel
          navButtonsAlwaysInvisible={true}
          showThumbs={true}
          stopAutoPlayOnHover={false}
          interval={7000}
      >
          {
              Lang.slide.map((item, i) => (
                 <BillCom key={i} item={item} i={i} classes={classes} />
              ))
          }
      </Carousel>
    </Grow>
     );
}
 
export default Home;