import { useEffect, useState, useCallback } from 'react';
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

//
import React from 'react';

//import './App.css';
import io from 'socket.io-client'
//import { useEffect, useState } from 'react';

import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import { Line } from 'react-chartjs-2';
import { setDate } from 'date-fns';
//import { Line } from 'react-chartjs-2';

//

const drawerWidth = 240;

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Made with ❤, '}
      <Link color="inherit" href="https://www.youtube.com/watch?v=lo1SF7O6nZE">
      by Eric Chen, Jessica Lim, Kevin Lu, 
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

//
//

export default function RecordData() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [recordData, setRecordData] = useState([]);
  const [exercise, setExercise] = useState('plantarflexion');
  const [side, setSide] = useState('left');
  const [exRecordDataRight, setExRecordRight] = useState([]);
  const [exRecordDataLeft, setExRecordLeft] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postModalText, setPostModalText] = useState('');

  const socket = io.connect("http://localhost:3002");

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

  //

  const [dataType, setDataType] = useState('athlete');
    const [firstN, setFirstN] = useState('');
    const [lastN, setLastN] = useState('');
    const [sport, setSport] = useState('');
    const [year, setYear] = useState(null);
    const [sex, setSex] = useState('');
    const [fetchedSports, setFetchedSports] = useState([]);
    const [sportName, setSportName] = useState('');
    const [sportDesc, setSportDesc] = useState('');
    const [coach, setCoach] = useState('');

    const handleDataChange = (event) => {
        setDataType(event.target.value);
    };

    const postAthlete = () => {
        const usersURL = `/users`;
        const json = {
            firstName: firstN,
            lastName: lastN,
            year: parseInt(year),
            sport: sport,
            sex: sex
        }
        axios.post(localURL + usersURL, json).then(_ => {
            setFirstN('');
            setLastN('');
            setSport('');
            setYear(0);
            setSex('');
        });
    }

    const postSport = () => {
        const sportsURL = `/sports`;
        const json = {
            sport: sportName,
            coach: coach,
        }
        axios.post(localURL + sportsURL, json).then(_ => {
            setSportName('');
            setSportDesc('');
            setCoach('');
        });
    }

    const postRecord = async () => {
      const recordsURL = `/records`;
      const json = {
          userId: userid,
          exerciseType: exercise,
          side: side,
          max: Math.max(...measurementArray),
          avg: measurementArray.reduce((a, b) => a + b, 0) / measurementArray.length,
          data: measurementArray,
      }
      try {
        const res = await axios.post(localURL + recordsURL, json);
        setPostModalText("Post to db success!");
        console.log(res);
      } catch (e) {
        console.log("Post to db failed", e);
        setPostModalText("Post to db failed :(. See console log for error message.")
        return;
      }
      setIsPostModalOpen(true);
  }

  //

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [measurementTime, setMeasurementTime] = useState([]);
  const [measurementArray, setMeasurementArray] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());

  const toggleSensor = () => {
    if (!isRecording){
      console.log('Recording now ON');
    }
    else
    {
      console.log('Recording now OFF');
    }
    setIsRecording(!isRecording);
    socket.emit("sendMsg", `${isRecording}`);
  };

  const resetData = () => {
    setMeasurementTime([]);
    setMeasurementArray([]);
    setStartTime(Date.now());
  };

  const uploadData = () => {

  };

  const record = useCallback(() => {
    if (isRecording) {
      
    } else {
      console.log('not recording rn');
    }
  }, [isRecording]);

  // useEffect(() => {
  //   socket.on("getMsg", (data) => {
  //     setMessageReceived(data.message);
  //     if (isRecording)
  //     {
  //       console.log(`SensorToggle is: ${isRecording}, Time: ${(Date.now() - startTime)/1000}, Force: ${Math.trunc((data.message - 6848)/25.036)}`);
  //       setMeasurementTime(measurementTime => [...measurementTime, (Date.now() - startTime)/1000]);
  //       //console.log(`Time: ${MeasurementTime}`);
  //       setMeasurementArray(measurementArray => [...measurementArray, (data.message - 6848)/25.036]);
  //       //console.log(`Data: ${MeasurementArray}`);
  //     }
  //     else
  //     {
  //       console.log('not recording rn');
  //     }
      
  //   });
  // }, [socket, isRecording]);



useEffect(() => {
  const recordValues = (data) => {
    setMessageReceived(data.message);
    console.log("isRecording: ", isRecording);
    if (isRecording && data.message) {
        console.log(`SensorToggle is: ${isRecording}, Time: ${(Date.now() - startTime)/1000}, Force: ${(data.message - 6848)/25.036}`);
        setMeasurementTime(measurementTime => [...measurementTime, (Date.now() - startTime)/1000]);
        //console.log(`Time: ${measurementTime}`);
        setMeasurementArray(measurementArray => [...measurementArray, (data.message - 6848)/25.036]);
        //console.log(`Data: ${measurementArray}`);
    }
  }
  socket.on("getMsg", recordValues);
  // console.log("connected")
  return () => {
    // console.log("disconnected");
    socket.off("getMsg", recordValues);
  }
}, [isRecording]);

  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          min: 0,
          beginAtZero: true,
          stepSize: 1,
        },
      },
      y: {
        beginAtZero: true,
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Load Cell Sensor Data',
      },
      
    },
  };

  const data = {
    //labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
    //labels: [1,2],
    labels: measurementTime,
    datasets: [
      {
        label: 'Force (N)',
        //data: [95, 85, 124, 143, 163, 213, 232, 300, 360, 437, 566, 702, 802, 899, 1007, 1173, 1499, 1949, 2401, 2753, 3029, 3618, 4491, 4825, 6365, 7985, 10154, 11792, 12528, 13272, 14087, 14558, 14637, 14844, 14255, 14500, 14303, 14116, 14108, 13940, 12499, 12841, 11860, 12312, 11616, 10948, 10143, 9780, 7680, 5629, 3892, 2450, 1694, 1086, 802, 663, 644, 624, 615, 605, 584, 576, 566, 547, 537, 526, 508, 497, 487, 476],
        //data: [3,4],
        data: measurementArray,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };


  //

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
          <Modal
            open={isPostModalOpen}>
            <Box sx={modalStyle}>
                <IconButton onClick={() => setIsPostModalOpen(false)}>
                    <CloseIcon/>
                </IconButton>
                <p>{postModalText}</p>
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
                      <MenuItem value="L">Left</MenuItem>
                      <MenuItem value="R">Right</MenuItem>
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
                  <Button variant="outlined" color="error" onClick={toggleSensor}>
                    <FiberManualRecordIcon/>
                    Recording {isRecording ? "On" : "Off"}
                  </Button>
                  <Button variant="outlined" color="primary" onClick={resetData}>
                    <FiberManualRecordIcon/>
                    Reset
                  </Button>
                  <Button variant="outlined" color="success" onClick={postRecord}>
                    <FiberManualRecordIcon/>
                    Upload
                  </Button>
                  <Line
                  options={options}
                  data={data}
                  />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
              
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
      </Box>
      </Box>
    </ThemeProvider>
  );
}
