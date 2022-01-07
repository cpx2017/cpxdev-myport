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

const Home = () => {
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
    });
    return ( 
        <div>
          {window.innerWidth > 600 ? (
            <div>
              <Backdrop className={classes.loader} open={!Ready} transitionDuration={400}>
                <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="70px" alt="load" />
                    <br />
                    <Typography variant="h6">{Lang.load}</Typography>
                  </Backdrop>
              <Grid container spacing={2}>
                <Slide direction="right" in={Ready} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
                <Grid item xs={12} md={7}>
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
                </Grid>
                </Slide>
                <Grow in={Ready} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
                   <Grid item xs={12} md={5}>
                     <Card>
                        <CardActionArea>
                          <br/>
                          <Typography variant="h6">&nbsp;{Lang.covid}</Typography>
                          <hr />
                          <CardContent>
                            <Covid Lang={Lang} setReady={(val) => setReady(val)} /> 
                          </CardContent>
                        </CardActionArea>
                      </Card>
                  </Grid>
                </Grow>
              </Grid>
            </div>
          ) : (
            <Grid container spacing={2}>
              <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
                <Grid item xs={12} md={7}>
                  <Carousel
                      navButtonsAlwaysInvisible={true}
                      showThumbs={true}
                      stopAutoPlayOnHover={false}
                      interval={7000}
                  >
                      {
                          Lang.slide.map((item, i) => (
                            <BillCom slideInc={Lang.slideInc} key={i} item={item} i={i} classes={classes} />
                          ))
                      }
                  </Carousel>
                </Grid>
              </Grow>
              <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
              <Grid item xs={12} md={5}>
                <Card>
                      <CardActionArea>
                        <br/>
                        <Typography variant="h6">&nbsp;{Lang.covid}</Typography>
                        <hr />
                        <CardContent>
                          <Covid Lang={Lang} setReady={(val) => setReady(val)} /> 
                        </CardContent>
                      </CardActionArea>
                    </Card>
                </Grid>
              </Grow>
            </Grid>
          )}
        </div>
     );
}
 
export default Home;