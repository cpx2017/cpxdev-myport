import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import en from '../lang/en/vac.json';
import th from '../lang/th/vac.json';
import Grid from '@material-ui/core/Grid';
import {
  Button, ButtonGroup,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';

const Hob = () => {
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
    const getvac = {
        set: true,
        url1: "https://bit.ly/3p0zfyC",
        url2: "http://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/myport/Vaccinated.pdf"
    }
    return (
        <div>
          <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
            <Typography gutterBottom variant="h5" component="h2">
              {Lang.title}
            </Typography>
          </Slide>
            <hr/>
          <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1300 : 0}>
            <Typography gutterBottom variant="body2">
              {Lang.desc}
            </Typography>
          </Grow>
            <br />
          <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1500 : 0}>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="body1">
                    {Lang.listhead.allstat}: {Lang.allstat}&nbsp;
                    </Typography>
                    {getvac.set === true && (
                      <ButtonGroup>
                        <Button color="primary" variant="contained" target="_blank" href={getvac.url1}>{Lang.done.btndigital}</Button>
                        <Button color="primary" variant="contained" target="_blank" href={getvac.url2} download>{Lang.done.btnplain}</Button>
                      </ButtonGroup>
                    )}
                </CardContent>
            </Card>
          </Grow>
            <br />
            <Grid container spacing={3}>
            {Lang.list.map((vact, i) => window.innerWidth > 600 ? (
                <Grid item xs={12} sm={6} key={i + 1}>
                <Slide direction={i % 2 ? 'left' : 'right'} in={true} timeout={localStorage.getItem('graphic') === null ? 1000: 0}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h6">
                                {Lang.head}{i+1} - {vact.date}
                            </Typography>
                        <hr />
                        <List>
                            <ListItem>
                                <ListItemText inset={true} primary={Lang.listhead.name} secondary={vact.name} />
                            </ListItem>
                            <ListItem>
                                <ListItemText inset={true} primary={Lang.listhead.date} secondary={vact.date} />
                            </ListItem>
                            <ListItem>
                                <ListItemText inset={true} primary={Lang.listhead.type} secondary={vact.type} />
                            </ListItem>
                            <ListItem>
                                <ListItemText inset={true} primary={Lang.listhead.place} secondary={vact.place} />
                            </ListItem>
                            <ListItem>
                                <ListItemText inset={true} primary={Lang.listhead.stat} secondary={vact.stat} />
                            </ListItem>
                        </List>
                        </CardContent>
                    </Card>
                    </Slide>
                </Grid>
            ) : (
              <Grid item xs={12} sm={6} key={i + 1}>
              <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1400 + i * 2: 0}>
                  <Card>
                      <CardContent>
                          <Typography variant="h6" component="h6">
                              {Lang.head}{i+1} - {vact.date}
                          </Typography>
                      <hr />
                      <List>
                          <ListItem>
                              <ListItemText inset={true} primary={Lang.listhead.name} secondary={vact.name} />
                          </ListItem>
                          <ListItem>
                              <ListItemText inset={true} primary={Lang.listhead.date} secondary={vact.date} />
                          </ListItem>
                          <ListItem>
                              <ListItemText inset={true} primary={Lang.listhead.type} secondary={vact.type} />
                          </ListItem>
                          <ListItem>
                              <ListItemText inset={true} primary={Lang.listhead.place} secondary={vact.place} />
                          </ListItem>
                          <ListItem>
                              <ListItemText inset={true} primary={Lang.listhead.stat} secondary={vact.stat} />
                          </ListItem>
                      </List>
                      </CardContent>
                  </Card>
                  </Grow>
              </Grid>
            ))}
            </Grid>
            <br />
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 2000 : 0}>
            <Typography gutterBottom variant="subtitle2">
              {Lang.credit}
            </Typography>
          </Grow>
        </div>
     );
}
 
export default Hob;