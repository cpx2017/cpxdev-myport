import React, { useState } from 'react';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import en from '../lang/en/edu.json';
import th from '../lang/th/edu.json';

import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '20.33%',
      flexShrink: 0,
    },
    headingimg: {
        fontSize: theme.typography.pxToRem(25),
        flexBasis: '10.33%',
        flexShrink: 0,
      },
    headingst: {
        fontSize: theme.typography.pxToRem(17),
        fontWeight: theme.typography.fontWeightRegular,
      },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
      },
  }));
const Edu = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [Lang, setLang] = useState(th);
  
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
    
    React.useEffect(() => {
      syncpage();
    });
  
    return (
      <div>
        <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
          <Typography variant="h5">{Lang.title}</Typography>
        </Slide>
        <hr />
        <br/>
          <div className={classes.root}>
           {Lang.list.map((item, i) => (
            <Accordion key={i+1} expanded={expanded === item.panel} onChange={handleChange(item.panel)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={item.panel + 'bh-content'}
                id={item.panel + 'bh-header'}
              >
              <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1400 : 0}>
                <Typography className={classes.headingst} variant="h6">{item.title}</Typography>
              </Grow>
              </AccordionSummary>
              <AccordionDetails>
               <List>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar src={item.edulogo} className={classes.large} />
                    </ListItemAvatar>
                    <ListItemText
                    primary={item.locate}
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            GPA: {item.gpa}
                            <br />
                        </Typography>
                            {item.desc}
                        </React.Fragment>
                    }
                    />
                </ListItem>
               </List>
              </AccordionDetails>
            </Accordion>
          ))}
      </div>
      </div>
    );
}
 
export default Edu;