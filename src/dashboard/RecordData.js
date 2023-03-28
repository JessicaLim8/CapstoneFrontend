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
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton } from '@mui/material';
import DetailedChart from './DetailedChart';
import Users from './Users';

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

const instructions = {
  plantarflexion: <div> Sit facing the device with the <b> sole (back) </b> of your foot against the foam pad. </div>,
  eversion: <div> Sit to the side of the device with the <b> outside </b> of your foot against the foam pad. </div>,
  inversion: <div> Sit to the side of the device with the <b> inside </b> of your foot against the foam pad. </div>,
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: '100vw',
}));

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

  const handleBackDashboard = () => {
    window.location.href = "/users/"+userid;
  };

  const handleChangeUser = (row) => {
    window.location.href = "/record/"+row.id;
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
            <IconButton onClick={() => handleBackDashboard()}>
                <ArrowBackIosIcon/>
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
            width: '100vw',
          }}
        >
          <Toolbar />
          <Modal
                open={modalOpen}
                onClose={handleModalClose}
                disableBackdropClick
            > 
              <Box sx={modalStyle}>
                { userid &&
                  <IconButton onClick={() => handleModalClose()}>
                      <CloseIcon/>
                  </IconButton>
                }
                <Users onRowSelect={handleChangeUser} />
              </Box>
          </Modal>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} sx={{ mt: 4, mb: 4 }}>
                <Grid item xs={6} md={6} xl={6}>
                    <Button variant="outlined" onClick={() => handleBackDashboard()}>Return to Dashboard</Button>
                </Grid>
                <Grid item xs={6} md={6} xl={6}>
                    <Button variant="contained" onClick={() => setModalOpen(true)}>Switch Athlete</Button>
                </Grid>
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
                <Typography
                  component="h6"
                  variant="h6"
                  color="text.secondary"
                  noWrap
                  sx={{ flexGrow: 1, fontSize: "0.6em" }}
                >
                  <b>Instructions:</b> {instructions[exercise]} Adjust the height to center the metatarsals (area just below your toes) on the pad.
                </Typography>
                </Grid>
                <Grid item xs={12} md={12} xl={12}>
                  <Button variant="outlined" color="error" onClick={() => console.log()}>
                    <FiberManualRecordIcon/>
                    Start Recording
                  </Button>
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
                        {side == "left" && <DetailedChart exercise={exercise} left={[]}/>}
                        {side == "right" && <DetailedChart exercise={exercise} right={[]}/>}
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
