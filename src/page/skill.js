import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import en from '../lang/en/skill.json';
import th from '../lang/th/skill.json';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

import Grow from '@material-ui/core/Grow';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import "react-sweet-progress/lib/style.css";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Skill = () => {
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
                    <Grid item xs={12} sm={6} key={i + 1}>
                        <Paper>
                            <Card className={classes.root}>
                                <CardContent>
                                  <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1300 : 0}>
                                    <Typography variant="h6">
                                      {item.title} - {item.group}
                                    </Typography>
                                  </Grow>
                                    <hr />
                                  <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1500 : 0}>
                                    <Typography variant="body2">
                                        {item.learnrate.map((star, i2) => {
                                            if (star === 2) {
                                                return (<StarIcon color="gold" fontSize="small" key={'key' + i2} />)
                                            } else if (star === 1) {
                                                return (<StarHalfIcon fontSize="small" key={'key' + i2} />)
                                            } else {
                                                return (<StarOutlineIcon fontSize="small" key={'key' + i2} />)
                                            }
                                        })}
                                    </Typography>
                                  </Grow>
                                    <br />
                                  <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1800 : 0}>
                                    <Typography variant="body1" component="p">
                                        {item.desc}
                                    <br />
                                    </Typography>
                                  </Grow>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
     );
}
 
export default Skill;