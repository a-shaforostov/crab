const drawerWidth = 240;

export default theme => ({
  app: {
    textAlign: 'center',
    display: 'flex',
    height: '100vh',
  },
  root: {
    position: 'fixed',
  },
  title: {
    marginRight: '30px',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  fabEdit: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    backgroundColor: '#0095f3',
  },

  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },

  content: {
    marginTop: '65px',
    overflowX: 'auto',
    width: '100%',

    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: '-240px',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: 240,
  },
});
