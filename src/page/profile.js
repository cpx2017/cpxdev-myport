import React, {useState} from 'react';
import { Card, CardActionArea, CardContent, Typography, Grid, Slide, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';
import getAge from 'get-age'

import en from '../lang/en/profile.json';
import th from '../lang/th/profile.json';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        display: 'block'
      },
    large: {
      width: theme.spacing(30),
      height: theme.spacing(30),
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
            <Grid item sm md className='pl-5 pt-4'>
                <Avatar alt="" src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/myport/author-1.jpg" className={classes.large} />
            </Grid>
        </Slide>
          ) : (
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1200 : 0}>
              <Grid item sm md className='pl-5 pt-4'>
                  <Avatar alt="" src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/myport/author-1.jpg" className={classes.large} />
              </Grid>
          </Grow>
          )}
           {window.innerWidth > 600 ? (
             <Slide direction="left" in={true} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
             <Grid item sm md={9}>
               <div className='row'>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[0].title} secondary={Lang.desc[0].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[1].title} secondary={Lang.desc[1].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[2].title} secondary={getAge(Lang.desc[2].desc)} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[3].title} secondary={new Date(Lang.desc[3].desc).toDateString() + (localStorage.getItem('langconfig') === 'th' ? ' (' + (new Date(Lang.desc[3].desc).getFullYear() + 543) + ')' : '')} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[4].title} secondary={Lang.desc[4].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[5].title} secondary={Lang.desc[5].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[6].title} secondary={Lang.desc[6].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[7].title} secondary={Lang.desc[7].desc} />
               </ListItem>
               </div>
             </Grid>
         </Slide>
           ) : (
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1500 : 0}>
           <Grid item sm md={9}>
               <div className='row ml-1'>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[0].title} secondary={Lang.desc[0].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[1].title} secondary={Lang.desc[1].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[2].title} secondary={getAge(Lang.desc[2].desc)} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[3].title} secondary={new Date(Lang.desc[3].desc).toDateString() + (localStorage.getItem('langconfig') === 'th' ? ' (' + (new Date(Lang.desc[3].desc).getFullYear() + 543) + ')' : '')} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[4].title} secondary={Lang.desc[4].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[5].title} secondary={Lang.desc[5].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[6].title} secondary={Lang.desc[6].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[7].title} secondary={Lang.desc[7].desc} />
               </ListItem>
               </div>
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