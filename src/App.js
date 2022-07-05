import React from 'react';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Grow from '@material-ui/core/Grow';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import {
  AppBar,
  Hidden,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItem,
  Dialog,
  Grid,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  DialogTitle,
  FormControlLabel,
  Tooltip,
  Slide,
  CssBaseline
} from '@material-ui/core';
import {
  useHistory,
  Route,
  Link,
  Switch as BasicSwitch,
} from "react-router-dom";
import { spring, AnimatedSwitch } from 'react-router-transition';
import Fet from './fetch'
import Lat from './lat'

// Page
import Home from './page/home';
import Profile from './page/profile';
import Education from './page/edu';
import Job from './page/job';
import Skill from './page/skill';
import Portfolio from './page/port';
import Hobby from './page/hobby';
import Contact from './page/contact';
import Vac from './page/vaccined';
import ApiDoc from './page/apidoc';
import ErrorPage from './page/404';

import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import '@fontsource/mitr';
// import LanguageIcon from '@material-ui/icons/Language';
import './App.css';
import en from '../src/lang/en/menulist.json';
import th from '../src/lang/th/menulist.json';

import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import ComputerIcon from '@material-ui/icons/Computer';
import BookIcon from '@material-ui/icons/Book';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import InfoIcon from '@material-ui/icons/Info';
import HealingIcon from '@material-ui/icons/Healing';
import PublicIcon from '@material-ui/icons/Public';
import SettingsIcon from '@material-ui/icons/Settings';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';

import Snowfall from 'react-snowfall'

const langlist = [
  {
    value: 'th',
    label: 'ภาษาไทย',
    flag: 'https://disease.sh/assets/img/flags/th.png',
  },
  {
    value: 'en',
    label: 'English',
    flag: 'https://disease.sh/assets/img/flags/us.png',
  },
];

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      flexGrow: 1,
      cursor: 'pointer',
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    zIndex: theme.zIndex.drawer + 10,
  },

  Langmobile: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  Langpc: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  noBorder: {
    border: "none",
  },
}));

function bounce(val) {
  return spring(val, {
    stiffness: 380,
    damping: 40,
  });
}

function mapStylespage(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}
// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 0,
  },
  atLeave: {
    opacity: bounce(1),
    scale: bounce(1),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};
export default function App() {
  const classes = useStyles();
  const [swipe, setSwipe] = React.useState(true);

  const [Page, setP] = React.useState('');
  
  const [formopen, setFormOpen] = React.useState({contact: false, api: false});

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [savedLat, setLat] = React.useState(0);
  const [apiopen, setApiOpen] = React.useState(false);
  const [setting, setSetting] = React.useState(false);

  const [changetoThai, setRecommend] = React.useState(false);
  const history = useHistory()
  
  const [Lang, setLang] = React.useState(th);

  const settingDialog = () => {
    Lat(Fet().ul + '/home/status').then(setLat)
    setSetting(true)
  }

  React.useEffect(() => {
    document.title = Page + " | MyPort [Chinnathorn's online portfolio]"
  }, [Page])

  const toHome = () => {
    if (formopen.contact === false && formopen.api === false) {
      history.push('/');
    }
  }

  const handleDrawerOpen = () => {
    if (formopen.contact === false && formopen.api === false)
      setOpen(true);
  };
  const handleDrawerClose = () => {
    sessionStorage.removeItem('directload');
    sessionStorage.removeItem('onAPI');
    setSwipe(false)
    setOpen(false);
    setSwipe(true)
    window.scrollTo(0, 0);
  };

  const allclose = () => {
    setOpen(false);
    if (anchorEl !== null) {
      setAnchorEl(null);
    }
  }

React.useEffect(() => {
  var wait = setInterval(function(){ 
    if (Fet().ul !== '') {
      clearInterval(wait);
      Lat(Fet().ul).then(setLat)
    }
 }, 1);
 return(() => setSwipe(false))
}, [])

  function FetchCoun() {
    axios.post(Fet().ul + '/Home/getcountry')
                .then(function (response) {
                // handle success
                if (response.data === 'TH' && localStorage.getItem('langconfig') !== 'th') {
                  setRecommend(true);
                }
            })
}

    React.useEffect(() => {
      var de = setInterval(function(){ 
          if (Fet().ul !== '') {
              clearInterval(de)
              FetchCoun()
          }
      }, 2000);
    }, [])

  const start = () => {
    if (localStorage.getItem('langconfig') === null) {
      localStorage.setItem('langconfig', 'en');
      setLang(en);
    } else {
      if (localStorage.getItem('langconfig') === 'th') {
        setLang(th);
      } else {
        setLang(en);
      }
    }
  }
  const graphicFunc = () => {
    if (localStorage.getItem('graphic') !== null) {
      localStorage.removeItem('graphic');
    } else {
      localStorage.setItem('graphic', 't');
    }
  }
  const setupLang = (language) => {
    localStorage.setItem('langconfig', language);
    if (language === 'th') {
      setLang(th);
      setRecommend(false)
    } else {
      setLang(en);
    }
    setAnchorEl(null);
  };

  React.useEffect(() => {
    // Update the document title using the browser API
    start();
  });
  const ua = navigator.userAgent;

  var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
  if (is_ie)
    {
        return <h2>Sorry, But this site not support internet explorer anymore.</h2>;
    }

  return (
    <div>
   <div className={classes.root}>
    <Slide in={true} direction="right" timeout={700}>
   <nav className={classes.drawer} aria-label="mailbox folders">
   <Hidden smUp implementation="css">
          <Drawer
            className={classes.drawer}
            variant="temporary"
            color="primary"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClick={handleDrawerClose}
          >
          <div className={classes.drawerHeader} position="fixed">
            <IconButton onClick={handleDrawerClose} size="large">
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <ListItem component={Link} to='/' button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={Lang.menu.home} />
          </ListItem>
          <ListItem component={Link} to='/profile' button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={Lang.menu.pro} />
          </ListItem>
          <ListItem component={Link} to='/education' button>
          <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.edu} />
            </ListItem>
            <ListItem component={Link} to='/job' button>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.job} />
            </ListItem>
            <ListItem component={Link} to='/skill' button>
              <ListItemIcon>
                <ComputerIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.skill} />
            </ListItem>
            <ListItem component={Link} to='/portfolio' button>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.port} />
            </ListItem>
            <ListItem component={Link} to='/hobby' button>
              <ListItemIcon>
                <NaturePeopleIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.hobby} />
            </ListItem>
            <ListItem component={Link} to='/vaccinated' button>
              <ListItemIcon>
                <HealingIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.vac} />
            </ListItem>
            <ListItem component={Link} to='/contact' button>
              <ListItemIcon>
                <ContactSupportIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.call} />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to='/apidoc'>
              <ListItemIcon>
                <DeveloperModeIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.api} />
            </ListItem>
            <ListItem component="a" target="_blank" href="https://www.dropbox.com/sh/gsapue86tjk17yh/AACpfja9C2uEfbwRIpLaR0VNa?dl=0" button>
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.doclib} />
            </ListItem>
            <ListItem button onClick={() => settingDialog()}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.set} />
            </ListItem>
            <ListItem button onClick={() => setApiOpen(true)}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.abo} />
            </ListItem>
          </Drawer>
    </Hidden>
   <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            color="primary"
            anchor="left"
            classes={{
              paper: classes.drawerPaper,
            }}
            open
          >
          <div className='pt-2' />
          <div className={classes.drawerHeader} position="fixed">
          </div>
          <Divider />
          <ListItem component={Link} to='/' button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={Lang.menu.home} />
          </ListItem>
          <ListItem component={Link} to='/profile' button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={Lang.menu.pro} />
          </ListItem>
          <ListItem component={Link} to='/education' button>
          <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.edu} />
            </ListItem>
            <ListItem component={Link} to='/job' button>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.job} />
            </ListItem>
            <ListItem component={Link} to='/skill' button>
              <ListItemIcon>
                <ComputerIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.skill} />
            </ListItem>
            <ListItem component={Link} to='/portfolio' button>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.port} />
            </ListItem>
            <ListItem component={Link} to='/hobby' button>
              <ListItemIcon>
                <NaturePeopleIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.hobby} />
            </ListItem>
            <ListItem component={Link} to='/vaccinated' button>
              <ListItemIcon>
                <HealingIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.vac} />
            </ListItem>
            <ListItem component={Link} to='/contact' button>
              <ListItemIcon>
                <ContactSupportIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.call} />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to='/apidoc'>
              <ListItemIcon>
                <DeveloperModeIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.api} />
            </ListItem>
            <ListItem component="a" target="_blank" href="https://www.dropbox.com/sh/gsapue86tjk17yh/AACpfja9C2uEfbwRIpLaR0VNa?dl=0" button>
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.doclib} />
            </ListItem>
            <ListItem button onClick={() => settingDialog()}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.set} />
            </ListItem>
            <ListItem button onClick={() => setApiOpen(true)}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={Lang.menu.abo} />
            </ListItem>
          </Drawer>
    </Hidden>
    </nav>
    </Slide>
  
        <main onClick={() => allclose()} style={{zIndex: 0}} className={classes.content}>
            <div className={classes.drawerHeader} />
            <br />
            {localStorage.getItem('graphic') === null ? (
              <AnimatedSwitch
                atEnter={bounceTransition.atEnter}
                atLeave={bounceTransition.atLeave}
                atActive={bounceTransition.atActive}
                mapStyles={mapStylespage}
              >
                <Route exact path="/" render={() => <Home setP={(v) => setP(v)} />} />
                <Route path="/profile" render={() => <Profile setP={(v) => setP(v)} />} />
                <Route path="/education" render={() => <Education setP={(v) => setP(v)} />} />
                <Route path="/job" render={() => <Job setP={(v) => setP(v)} />} />
                <Route path="/skill" render={() => <Skill setP={(v) => setP(v)} />} />
                <Route path="/portfolio" render={() => <Portfolio setP={(v) => setP(v)} />} />
                <Route path="/hobby" render={() => <Hobby setP={(v) => setP(v)} />} />
                <Route path="/contact" render={() => <Contact setP={(v) => setP(v)} col={formopen} setCol={(val) => setFormOpen({...formopen, contact: val})} />} />
                <Route path="/vaccinated" render={() => <Vac setP={(v) => setP(v)} />} />
                <Route path="/apidoc" render={() => <ApiDoc setP={(v) => setP(v)} col={formopen} setCol={(val) => setFormOpen({...formopen, api: val})} />} />
                <Route render={() => <ErrorPage setP={(v) => setP(v)} />} />
              </AnimatedSwitch>
            ) : (
              <BasicSwitch>
                <Route exact path="/" render={() => <Home setP={(v) => setP(v)} />} />
                <Route path="/profile" render={() => <Profile setP={(v) => setP(v)} />} />
                <Route path="/education" render={() => <Education setP={(v) => setP(v)} />} />
                <Route path="/job" render={() => <Job setP={(v) => setP(v)} />} />
                <Route path="/skill" render={() => <Skill setP={(v) => setP(v)} />} />
                <Route path="/portfolio" render={() => <Portfolio setP={(v) => setP(v)} />} />
                <Route path="/hobby" render={() => <Hobby setP={(v) => setP(v)} feturi={Fet().ul !== '' ? Fet().ul : ''} />} />
                <Route path="/contact" render={() => <Contact setP={(v) => setP(v)} col={formopen} setCol={(val) => setFormOpen({...formopen, contact: val})} />} />
                <Route path="/vaccinated" render={() => <Vac setP={(v) => setP(v)} />} />
                <Route path="/apidoc" render={() => <ApiDoc setP={(v) => setP(v)} col={formopen} setCol={(val) => setFormOpen({...formopen, api: val})} />} />
                <Route render={() => <ErrorPage setP={(v) => setP(v)} />} />
              </BasicSwitch>
            )}
            <br />
          </main>


      <footer className='fixedbottom col-md-12 bg-light'>
          <hr />
          <Typography variant="body1" align="center">
            &copy; Copyright {new Date().getFullYear()} - Chinnathorn Promnaruritr, Allright Reserved
          </Typography>
            <br/>
        </footer>

    <Slide in={true} direction='down' timeout={600}>
          <AppBar
            color="primary"
            position="fixed"
            variant="persistent"
            className={classes.appBar + ' app-barcurve'}
          >
            <Toolbar>
            <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
                size="large">
                <MenuIcon />
              </IconButton>
              <div style={{ paddingRight: 20 }}>
                <Avatar alt="myavatar" src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/myport/avatar.webp" />
              </div>
              <a onClick={() => toHome()} className={classes.title}>
                <Typography variant="h6" noWrap>
                  Chinnathorn's MyPort
                </Typography>
              </a>
            </Toolbar>
          </AppBar>
        </Slide>

      </div>

        <Dialog
          TransitionComponent={Grow}
          transitionDuration={localStorage.getItem('graphic') === null ? 500 : 200}
          open={apiopen}
          onClose={() => setApiOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xl"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <Typography variant="h5">
                {Lang.about.head}
              </Typography>
            <Divider />
              <Typography>
                {Lang.about.developName}
              </Typography>
            <br />
              <Typography>
                {Lang.about.desc}
              </Typography>
            <br />
              <Typography>
                {Lang.about.uptLog}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setApiOpen(false)} color="secondary">
              {Lang.btnOK}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          TransitionComponent={Grow}
          transitionDuration={localStorage.getItem('graphic') === null ? 500 : 200}
          open={setting}
          onClose={() => setSetting(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description2"
          maxWidth="lg"
        >
          <DialogTitle id="alert-dialog-title">{Lang.setting.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description2">
              <TextField
            id="outlined-select-currency"
            select
            label={Lang.setting.changeL}
            onChange={(e) => setupLang(e.target.value)}
            value={localStorage.getItem('langconfig')}
          >
            {langlist.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Grid container spacing={3}>
                  <Grid item md={4} className={classes.avatarbar}>
                    <Avatar src={option.flag} className={classes.small} />
                  </Grid>
                  <Grid item md style={{ marginTop: 2 }}>
                    {option.label}
                  </Grid>
                </Grid>
              </MenuItem>
            ))}
          </TextField>
          <br />
          <Tooltip enterDelay={1000} title={Lang.settingGuide.perfor}>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={localStorage.getItem('graphic') === null ? false : true}
                  color="primary"
                  onChange={graphicFunc}
                />
              }
              label={Lang.reduce}
            />
          </Tooltip>
          <Tooltip enterDelay={1000} title={Lang.settingGuide.cLat}>
          <ListItem button onClick={() => window.open('https://s.cpxdev.tk/st', '_target')}>
            <ListItemIcon>
              <NetworkCheckIcon />
            </ListItemIcon>
            <ListItemText primary={"System Status (" + Fet().nme + ')'} secondary={savedLat > 0 && savedLat <= 40 ? 'Great' : savedLat > 40 && savedLat <= 80 ? 'Good' : 'Bad'} />
          </ListItem>
          </Tooltip>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSetting(false)} color="secondary">
              {Lang.btnOK}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          TransitionComponent={Grow}
          transitionDuration={localStorage.getItem('graphic') === null ? 500 : 200}
          open={changetoThai}
          onClose={() => setRecommend(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description2"
          maxWidth="md"
        >
          <DialogTitle id="alert-dialog-recom">คุณต้องการเปลี่ยนเป็นภาษาไทยหรือไม่</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description2">
              <Typography>
                If you're foreigner user. You can close this window anyway.
              </Typography>
              <br />
              <Typography>
                หน้าเว็บนี้รองรับภาษาไทย คุณต้องการเปลี่ยนภาษาหรือไม่
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setupLang('th')} color="secondary">
              เปลี่ยนภาษา
            </Button>
            <Button onClick={() => setRecommend(false)} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}
