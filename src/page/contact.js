import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import en from '../lang/en/contact.json';
import th from '../lang/th/contact.json';
import Slide from '@material-ui/core/Slide';

import Grow from '@material-ui/core/Grow';
import DirectContact from '../component/contactform'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    headingst: {
        fontSize: theme.typography.pxToRem(17),
        fontWeight: theme.typography.fontWeightRegular,
      }
  }));

const Hob = ({col, setCol}) => {
  const Refreshdetect = (e) => {
    if (col.contact === true) {
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

    const [Lang, setLang] = useState(th);
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
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      if (sessionStorage.getItem('directload') === 'ok') {
        sessionStorage.removeItem('directload')
      }
      setOpen(true);
    };
  
    // const handleClose = () => {
    //   if (col.contact === false) {
    //     setOpen(false);
    //   } else {
    //     setBusy(true);
    //   }
    // };

    setInterval(function(){ 
      if (sessionStorage.getItem('directsuccess') === 'ok') {
        setOpen(false);
        sessionStorage.removeItem('directsuccess')
      }
     }, 100);
    React.useEffect(() => {
      syncpage();
    });
    return (
      <div>
        <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
          <Typography gutterBottom variant="h5" component="h2">
            {Lang.title}
          </Typography>
        </Slide>
        <hr />
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1400 : 0}>
            <Typography variant="h6" className={classes.headingst}>{Lang.tel.title}</Typography>
          </Grow>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              <b>{Lang.tel.title}</b>: <a className="remove-ude" target="_blank" href={'tel:' + Lang.tel.hy} rel="noopener noreferrer">{Lang.tel.desc}</a>
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
            <Typography variant="h6" className={classes.headingst}>{Lang.mail.title}</Typography>
          </Grow>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              <b>{Lang.mail.title}</b>: <a className="remove-ude" target="_blank" rel="noopener noreferrer" href={'mailto:' + Lang.mail.hy + '?subject'}>{Lang.mail.desc}</a>
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
            <Typography variant="h6" className={classes.headingst}>{Lang.address.title}</Typography>
          </Grow>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              <b>{Lang.address.title}</b>: {Lang.address.desc}
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion expanded={false} onClick={handleClickOpen}>
          <AccordionSummary
            aria-controls="panel3a-content"
          >
          <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1400 : 0}>
            <Typography variant="h6" className={classes.headingst}>{Lang.otherdesc}</Typography>
          </Grow>
          </AccordionSummary>
        </Accordion>
        <DirectContact ditlt={Lang.other} setOpen={setOpen} open={open} col={col} setCol={(val) => setCol(val)} classes={classes} Transition={Transition} />
      </div>
    );
}
 
export default Hob;