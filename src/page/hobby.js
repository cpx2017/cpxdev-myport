import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DialogTitle from '@material-ui/core/DialogTitle';
import en from '../lang/en/hob.json';
import th from '../lang/th/hob.json';
import Iframe from 'react-iframe'
import { Button, Dialog, DialogContent, LinearProgress } from '@material-ui/core';
import Fav from '../component/fav'
import axios from 'axios';
import Fet from '../fetch'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';


import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';
import Swal from 'sweetalert2'

let pm = new Audio();
let time;
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    cardroot: {
      width: '100%',
      display: 'flex',
    },
    loader: {
      paddingTop: theme.spacing(2),
      textAlign: 'center',
      alignContent: 'center',
      justifyContent: "center"
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      marginTop: 20,
      flex: '1 0',
    },
    cover: {
      width: 151,
    }, 
    imgstar: {
      textAlign: 'center',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    headingst: {
        fontSize: theme.typography.pxToRem(17),
        fontWeight: theme.typography.fontWeightRegular,
      }
  }));
const Hob = ({setP}) => {
  React.useEffect(() => {
    setP(localStorage.getItem('langconfig') !== null && localStorage.getItem('langconfig') == 'th' ? th.title : en.title)
  }, [])
    const [Lang, setLang] = useState(th);
    const [isOpen, setOpen] = React.useState(false);
    const [music, setMusic] = React.useState([]);
    const [arr, setArr] = useState( {
      title: "",
      src: "",
      vdo: "",
      desc: ""
    })
    const [sam, setSample] = React.useState(null);
      const [expanded, setExpanded] = React.useState(false);

      const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    const syncpage = () => {
      if (localStorage.getItem('langconfig') !== null) {
        if (localStorage.getItem('langconfig') === 'th') {
          setLang(th);
        } else {
          setLang(en);
        }
      }
    };
    const classes = useStyles();
    React.useEffect(() => {
      syncpage();
    });


    React.useEffect(() => {
      var de = setInterval(function(){ 
        if (Fet().ul !== '') {
            clearInterval(de)
            if (localStorage.getItem('langconfig') !== null) {
              if (localStorage.getItem('langconfig') === 'th') {
                  axios({
                    method: 'post',
                    url: Fet().ul + '/myportsite/spotsync?pid=' + th.playlist,
                  }).then(function (response) {
                    setMusic(response.data.res.items)
                })
                .catch(function () {
                    // handle error
                });
              } else {
                  axios({
                    method: 'post',
                    url: Fet().ul + '/myportsite/spotsync?pid=' + en.playlist,
                  }).then(function (response) {
                    setMusic(response.data.res.items)
                })
                .catch(function () {
                    // handle error
                });
              }
            }
        }
    }, 1);
    }, [])

   

    React.useEffect(() => {
      if (Fet().ul !== '') {
        setMusic([])
        axios({
          method: 'post',
          url: Fet().ul + '/myportsite/spotsync?pid=' + Lang.playlist,
        }).then(function (response) {
          setMusic(response.data.res.items)
      })
      .catch(function () {
          // handle error
      });
    }
    }, [Lang.playlist])

    const Preview = (id, url) => {
      setSample(music.filter(x => x.track.id == id)[0])
      console.log(music.filter(x => x.track.id == id)[0])
    }

    return (
        <div>
          <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
            <Typography gutterBottom variant="h5" component="h2">
              {Lang.title}
            </Typography>
          </Slide>
            <hr/>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1400 : 0}>
              <Typography variant="h6" className={classes.headingst}>{Lang.title1}</Typography>
            </Grow>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                {Lang.hoblist}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1400 : 0}>
              <Typography variant="h6" className={classes.headingst}>{Lang.title2}</Typography>
            </Grow>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                {Lang.favlist.map((fav, i) => i !== Lang.favlist.length - 1 ? (
                  <g key={i} className="remove-ude" onClick={() => {
                    setArr(fav);
                    setOpen(true);
                  }}>
                    {fav.title},&nbsp;
                  </g>
                ) : (
                  <g className="remove-ude" onClick={() => {
                    setArr(fav);
                    setOpen(true);
                  }}>
                    {fav.title}
                  </g>
                ))}
              </Typography> 
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1400 : 0}>
              <Typography variant="h6" className={classes.headingst}>{Lang.title3}</Typography>
            </Grow>
            </AccordionSummary>
            <AccordionDetails>
            <List className='row'>
              {music.length > 0 ? music.map((item, i) => (
                <ListItem className='col-md-4' key={item.track.id} button onClick={() => Preview(item.track.id, item.track.external_urls.spotify)}>
                  <ListItemAvatar>
                    <Avatar src={item.track.album.images[0].url} variant={'rounded'} style={{width: 90 , height: 90}} /> 
                  </ListItemAvatar>
                  <div className='ml-3'>
                  <ListItemText primary={item.track.name} secondary={(Lang.tag == 'th' ? 'ร้องโดย ' : 'Song by ') + item.track.artists[0].name} />
                  </div>
                </ListItem>
              )) : (
                <LinearProgress color="secondary" />
              )}
              </List>
            </AccordionDetails>
          </Accordion>
          
          <Dialog
            TransitionComponent={Grow}
            transitionDuration={localStorage.getItem('graphic') === null ? 500 : 200}
            open={isOpen}
            onClose={() => setOpen(false)}
            maxWidth="lg"
            scroll={'paper'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <Fav
              arr={arr}
              setOpen={(param) => setOpen(param)}
              Lang={Lang}
              classes={classes}
            />
          </Dialog>
          <Dialog
            TransitionComponent={Grow}
            transitionDuration={localStorage.getItem('graphic') === null ? 500 : 200}
            open={sam != null ? true : false}
            onClose={() => setSample(null)}
            maxWidth="xl"
            scroll={'paper'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            {
              sam != null && (
                <>
               <DialogContent dividers>
                <div className='row'>
                  <div className='col-md-5'>
                    <img src={sam.track.album.images[0].url} width='100%' />
                  </div>
                  <div className='col-md mt-3'>
                  <Typography variant='h5'>
                   {Lang.musicguide.title + sam.track.name}
                 </Typography>
                 <Typography variant='subtitle1'>
                 {Lang.musicguide.art + sam.track.artists[0].name} 
                 </Typography>
                 <hr/>
                 <Typography variant='body1'>
                 {Lang.musicguide.album}"{sam.track.album.name}"
                 </Typography>
                 <Typography variant='caption'>
                 {Lang.musicguide.released + new Date(sam.track.album.release_date).toDateString()} 
                 </Typography>
                 <br />
                 <Button variant='outlined' className='mt-3 text-success' onClick={() => window.open(sam.track.external_urls.spotify,'blank').focus()}>{Lang.musicguide.spot}</Button>
                 <br />
                 <audio className='mt-5' controls>
                    <source src={sam.track.preview_url} />
                    Your browser does not support the audio tag.
                  </audio>
                  </div>
                </div>
                 </DialogContent>
                </>
              )
            }
          </Dialog>
        </div>
     );
}
 
export default Hob;