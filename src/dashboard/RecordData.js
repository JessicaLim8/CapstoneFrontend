import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import DetailedChart from './DetailedChart';

const drawerWidth = 240;

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

export default function RecordData() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [recordData, setRecordData] = useState([]);
  const [exercise, setExercise] = useState('plantarflexion');
  const [side, setSide] = useState('left');
  const [exRecordDataRight, setExRecordRight] = useState([]);
  const [exRecordDataLeft, setExRecordLeft] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);

  const handleModalClose = (event, reason) => 
  {
      if (reason && reason == "backdropClick") {
          return
      }
      setModalOpen(false)
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    setExercise(event.target.value);
  };

  const handleChangeSide = (event) => {
    setSide(event.target.value);
  };

  const setUserURL = (userid) => {
    window.location.href = "/record/"+userid;
  };

  const { userid } = useParams();
  
  useEffect(() => {
    // call an API and in the success or failure fill the data buy using setData function
    // it could be like below
    fetchUser(userid, setUserData);
    fetchRecords(userid, setRecordData);
    fetchExRecords(userid, exercise, setExRecordLeft, setExRecordRight);
  }, []);

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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} sx={{ mt: 4, mb: 4 }}>
                <Grid item xs={8} md={6} xl={6}>
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
                <Grid item xs={4} md={6} xl={6}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Side</InputLabel>
                    <Select
                      value={side}
                      label="Side"
                      onChange={handleChangeSide}
                      defaultValue="left"
                    >
                      <MenuItem value="left">Left</MenuItem>
                      <MenuItem value="right">Right</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} xl={12}>
                  <Button variant="outlined" onClick={() => console.log("Start Recording")}>Record</Button>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                    >
                        <DetailedChart exercise={exercise} right={[]}/>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: 4, mb: 4 }}>
                <Grid item xs={6} md={6} xl={6}>
                    <Button variant="contained" onClick={() => setModalOpen(true)}>Switch Athlete</Button>
                </Grid>
                <Grid item xs={6} md={6} xl={6}>
                    <Button variant="contained" onClick={() => setUserURL(userid)}>Return to Dashboard</Button>
                </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
      </Box>
    </ThemeProvider>
  );
}
