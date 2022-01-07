import React, {useState} from 'react';
import { Card, CardActionArea, CardContent, Typography, Grid, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';

import en from '../lang/en/profile.json';
import th from '../lang/th/profile.json';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        display: 'block'
      },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    }
  }));
const Profile = () => {
    const [Lang, setLang] = useState(th);
    const classes = useStyles();

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
    <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
    <Grid item xs={12}>
        <Typography gutterBottom variant="h5" component="h2">
        {Lang.title}
        </Typography>
    </Grid>
    </Slide>
    <hr />
    <Card>
    <CardActionArea>
      <CardContent>
        <Grid container spacing={3}>
          {window.innerWidth > 600 ? (
            <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 500 : 0}>
            <Grid item sm md={2}  style={{ alignItems: "center", display: 'flex', flexDirection: 'column' }}>
                <Avatar alt="" src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/myport/author-1.jpg" className={classes.large} />
            </Grid>
        </Slide>
          ) : (
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1200 : 0}>
              <Grid item sm md={2}  style={{ alignItems: "center", display: 'flex', flexDirection: 'column' }}>
                  <Avatar alt="" src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/myport/author-1.jpg" className={classes.large} />
              </Grid>
          </Grow>
          )}
           {window.innerWidth > 600 ? (
             <Slide direction="left" in={true} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
             <Grid item sm md={10}>
                 <Typography variant="body1">
                 {Lang.desc}
                 </Typography>
             </Grid>
         </Slide>
           ) : (
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1500 : 0}>
            <Grid item sm md={10}>
                <Typography variant="body1">
                {Lang.desc}
                </Typography>
            </Grid>
        </Grow>
           )}
        </Grid>
        <br />
      </CardContent>
    </CardActionArea>
  </Card>
  </div>
  );
}
 
export default Profile;