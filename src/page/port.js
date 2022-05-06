import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import en from '../lang/en/port.json';
import th from '../lang/th/port.json';

import Child from '../component/portChild'
import Slide from '@material-ui/core/Slide';
import "react-sweet-progress/lib/style.css";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    loader: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Skill = ({setP}) => {
  React.useEffect(() => {
    setP(localStorage.getItem('langconfig') !== null && localStorage.getItem('langconfig') == 'th' ? th.title : en.title)
  }, [])
    const [Lang, setLang] = useState(th);

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
    const classes = useStyles();
    return (
        <div>
          <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
            <Typography variant="h5">{Lang.title}</Typography>
          </Slide>
            <hr/>
            <Grid container spacing={3}>
                {Lang.list.map((item, i) => (
                    <Child key={i + 1} item={item} classes={classes} i={i} Lang={Lang} />
                ))}
            </Grid>
        </div>
     );
}
 
export default Skill;