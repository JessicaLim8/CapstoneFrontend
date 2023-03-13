import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { mainListItems, secondaryListItems } from './listItems';
import TimeTrendLineChart from './TimeTrendLineChart';
import DetailedChart from './DetailedChart';
import Summary from './Summary';
import History from './History';

const data = [
  {date: '18-10-2022', exercise: "Left Eversion Strength",  max: 400, avg: 256, data: [10, 11, 12, 11, 18, 15, 14, 13, 12, 9, 16, 18, 12]}, 
  {date: '31-10-2022', exercise: "Left Eversion Strength", max: 300, avg: 300, data: [10, 11, 12, 13, 14, 15, 14, 13, 12]}, 
  {date: '01-11-2022', exercise: "Left Eversion Strength", max: 551, avg: 235, data: [10, 11, 12, 13, 14, 15, 14, 13, 12]}, 
];

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
      Jessica Lim
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();
const localURL = "http://localhost:3000";

const fetchUser = (userid, setUserData) => {
  const userURL = `/users/${userid}`;
  axios.get(localURL + userURL).then(data => {
    if (data.data.user) {
        setUserData(data.data.user)
    }
  });
}

const fetchRecords = (userid, setRecordData) => {
  const userURL = `/records?userId=${userid}`;
  axios.get(localURL + userURL).then(data => {
    if (data.data.records) {
        setRecordData(data.data.records)
    }
  });
}

const fetchExRecords = (userid, exercise, setExRecordLeft, setExRecordRight) => {
  const leftURL = `/records?userId=${userid}&exercise=${exercise}&side=L`;
  axios.get(localURL + leftURL).then(data => {
    if (data.data.records) {
        setExRecordLeft(data.data.records)
    }
  });
  const rightURL = `/records?userId=${userid}&exercise=${exercise}&side=R`;
  axios.get(localURL + rightURL).then(data => {
    if (data.data.records) {
        setExRecordRight(data.data.records)
    }
  });
}

function DashboardContent() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [recordData, setRecordData] = useState([]);
  const [exercise, setExercise] = useState('plantarflexion');
  const [exRecordDataRight, setExRecordRight] = useState([]);
  const [exRecordDataLeft, setExRecordLeft] = useState([]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    setExercise(event.target.value);
  };

  const { userid } = useParams();
  
  console.log(userid);

  useEffect(() => {
    // call an API and in the success or failure fill the data buy using setData function
    // it could be like below
    fetchUser(userid, setUserData);
    fetchRecords(userid, setRecordData);
    fetchExRecords(userid, exercise, setExRecordLeft, setExRecordRight);
  }, []);

  console.log(userData)
  console.log(recordData)
  console.log(exRecordDataLeft)
  console.log(exRecordDataRight)

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {userData.firstName} {userData.lastName}'s Profile
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid item xs={12} md={6} xl={3}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Exercise</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      value={exercise}
                      label="Exercise"
                      onChange={handleChange}
                      defaultValue="plantarflexion"
                    >
                      <MenuItem value="plantarflexion">Plantarflexion</MenuItem>
                      <MenuItem value="inversion">Inversion</MenuItem>
                      <MenuItem value="eversion">Eversion</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              {/* Summary */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Summary left={exRecordDataLeft.length != 0 ? exRecordDataLeft[0] : []} right={exRecordDataRight.length != 0 ? exRecordDataRight[0] : []}/>
                </Paper>
              </Grid>
              {/* Max */}
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <TimeTrendLineChart title="Max Force" left={exRecordDataLeft} right={exRecordDataRight} dataKey="max"/>
                </Paper>
              </Grid>
              {/* Avg */}
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <TimeTrendLineChart title="Average Force" left={exRecordDataLeft} right={exRecordDataRight} dataKey="avg"/>
                </Paper>
              </Grid> 
              {/* Last Datapoint */}
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <DetailedChart exercise={exercise} left={exRecordDataLeft ? exRecordDataLeft[0] : []}/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <DetailedChart exercise={exercise} right={exRecordDataLeft ? exRecordDataRight[0] : []}/>
                </Paper>
              </Grid>
             
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <History data={recordData} />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
