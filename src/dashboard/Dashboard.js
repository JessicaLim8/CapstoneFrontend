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
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { add, format, differenceInCalendarDays, isFuture } from "date-fns";
import { mainListItems, secondaryListItems } from './listItems';
import TimeTrendLineChart from './TimeTrendLineChart';
import Title from './Title';
import DetailedChart from './DetailedChart';
import Summary from './Summary';
import History from './History';
import {dataMax} from "./utilities";
import Users from './Users';
import TeamComparison from './TeamComparison';

var days = 86400000 //number of milliseconds in a day
const dateNow = new Date();
const dateLastWeek = new Date(dateNow - 7*days);
const dateLastMonth = new Date(dateNow - 31*days);

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

const drawerWidth = 0;

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

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    width: '100vw',
}));

const mdTheme = createTheme();
const localURL = "http://localhost:3000";

const fetchUser = (userid, setUserData, fetchFunction) => {
  const userURL = `/users/${userid}`;
  let user;
  axios.get(localURL + userURL).then(data => {
    if (data.data.user) {
        setUserData(data.data.user);
        fetchFunction(data.data.user.sport);
    }
  });
  return user;
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
        setExRecordLeft(data.data.records);
    }
  });
  const rightURL = `/records?userId=${userid}&exercise=${exercise}&side=R`;
  axios.get(localURL + rightURL).then(data => {
    if (data.data.records) {
        setExRecordRight(data.data.records)
    }
  });
}

const groupRecords = (userid, sport, exercise, setUserWeek, setGroupWeek, setUserMonth, setGroupMonth) => {
  const userWeekURL = `/records?userId=${userid}&exercise=${exercise}&dateStart=${dateLastWeek}`;
  axios.get(localURL + userWeekURL + "&side=L").then(data => {
    const userWeek = {};
    if (data.data.records) { userWeek["L"] = data.data.records; }
    axios.get(localURL + userWeekURL + "&side=R").then(data => {
      if (data.data.records) { userWeek["R"] = data.data.records; }
      setUserWeek(userWeek)
    });
  });

  const userMonthURL = `/records?userId=${userid}&exercise=${exercise}&dateStart=${dateLastMonth}`;
  axios.get(localURL + userMonthURL + "&side=L").then(data => {
    const userMonth = {};
    if (data.data.records) { userMonth["L"] = data.data.records; }
    axios.get(localURL + userMonthURL + "&side=R").then(data => {
      if (data.data.records) { userMonth["R"] = data.data.records; }
      setUserMonth(userMonth)
    });
  });

  const groupWeekURL = `/records?sport=${sport}&exercise=${exercise}&dateStart=${dateLastWeek}`;
  axios.get(localURL + groupWeekURL + "&side=L").then(data => {
    const groupWeek = {};
    if (data.data.records) { groupWeek["L"] = data.data.records; }
    axios.get(localURL + groupWeekURL + "&side=R").then(data => {
      if (data.data.records) { groupWeek["R"] = data.data.records; }
      setGroupWeek(groupWeek)
    });
  });
  const groupMonthURL = `/records?sport=${sport}&exercise=${exercise}&dateStart=${dateLastMonth}`;
  axios.get(localURL + groupMonthURL + "&side=L").then(data => {
    const groupMonth = {};
    if (data.data.records) { groupMonth["L"] = data.data.records; }
    axios.get(localURL + groupMonthURL + "&side=R").then(data => {
      if (data.data.records) { groupMonth["R"] = data.data.records; }
      setGroupMonth(groupMonth)
    });
  });
}

const dateFormatter = date => {
  const formatted = format(new Date(date), "MM/dd/yyyy");
  return formatted;
};

function DashboardContent() {
  const { userid } = useParams();

  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [recordData, setRecordData] = useState([]);
  const [exercise, setExercise] = useState('Plantarflexion');
  const [exRecordDataRight, setExRecordRight] = useState([]);
  const [exRecordDataLeft, setExRecordLeft] = useState([]);
  const [modalOpen, setModalOpen] = useState(!(userid == true));
  const [selectedHistory, setSelectedHistory] = useState([]);
  const [userWeek, setUserWeek] = useState({});
  const [userMonth, setUserMonth] = useState({});
  const [groupWeek, setGroupWeek] = useState({});
  const [groupMonth, setGroupMonth] = useState({});

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
    fetchExRecords(userid, event.target.value, setExRecordLeft, setExRecordRight);
    groupRecords(userid, userData.sport, event.target.value, setUserWeek, setGroupWeek, setUserMonth, setGroupMonth)
    setExercise(event.target.value);
  };

  const handleChangeUser = (row) => {
    window.location.href = "/users/"+row.id;
  };

  const handleEditButton = () => {
    window.location.href = "/admin";
  };

  const setRecordURL = (userid) => {
    window.location.href = "/record/"+userid;
  };
  
  useEffect(() => {
    // call an API and in the success or failure fill the data buy using setData function
    // it could be like below
    if (userid) {
      const groupRecordFetch = (sport) => {
        groupRecords(userid, sport, exercise, setUserWeek, setGroupWeek, setUserMonth, setGroupMonth)
      }

      fetchUser(userid, setUserData, groupRecordFetch);
      fetchRecords(userid, setRecordData);
      fetchExRecords(userid, exercise, setExRecordLeft, setExRecordRight);
    }
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {userData.firstName} {userData.lastName}'s Profile
            </Typography>
            <IconButton onClick={() => handleEditButton()}>
              <ModeEditIcon/>
            </IconButton>
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

          <Container sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={6}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Exercise</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      value={exercise}
                      label="Exercise"
                      onChange={handleChange}
                      defaultValue="Plantarflexion"
                    >
                      <MenuItem value="Plantarflexion">Plantarflexion</MenuItem>
                      <MenuItem value="Inversion">Inversion</MenuItem>
                      <MenuItem value="Eversion">Eversion</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3} xl={3}>
                  <Button variant="outlined" color="error" onClick={() => setRecordURL(userid)}>
                    <FiberManualRecordIcon/>
                    Start Recording
                    </Button>
                </Grid>
                <Grid item xs={12} md={3} xl={3}>
                  <Button variant="contained" onClick={() => setModalOpen(true)}>Switch Athlete</Button>
                </Grid>
              {/* Summary */}
              <Grid item xs={12} md={12} lg={12}>
                <Title>
                  Athlete Profile
                </Title>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 180,
                  }}
                >
                  <Summary user={userData} maxWeek={userWeek} maxMonth={userMonth}/>
                </Paper>
              </Grid>
              {/* Trends*/}
              <Grid item xs={12} md={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <TimeTrendLineChart title="Max Force" exercise={exercise} left={exRecordDataLeft} right={exRecordDataRight} dataKey="max"/>
                </Paper>
              </Grid>
              {/* Last Attempt */}
              <Grid item xs={12} md={12} lg={12}>
                <Title>
                  Last Attempt: {exRecordDataLeft.length != 0  && exRecordDataLeft[exRecordDataLeft.length - 1].date ? dateFormatter(exRecordDataLeft[exRecordDataLeft.length - 1].date) : "N/A"}
                </Title>
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
                  <DetailedChart exercise={exercise} left={exRecordDataLeft ? exRecordDataLeft[exRecordDataLeft.length - 1] : []} showSummary = {true}/>
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
                  <DetailedChart exercise={exercise} right={exRecordDataRight ? exRecordDataRight[exRecordDataRight.length - 1] : []} showSummary = {true}/>
                </Paper>
              </Grid>

              {/* Summary */}
              <Grid item xs={12} md={12} lg={12}>
                <Title>
                  Team Summary: {userData.sport}
                </Title>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 180,
                  }}
                >
                  <TeamComparison user={userData} maxWeek={userWeek} maxMonth={userMonth} teamWeek={groupWeek} teamMonth={groupMonth}/>
                </Paper>
              </Grid>

              {/* Details */}
              <Grid item xs={12}>
                <Title>
                 Historical Data 
                </Title>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <History data={recordData} setSelect={setSelectedHistory} />
                </Paper>
              </Grid>
              { selectedHistory.length !== 0 &&
                <Grid item xs={12}>
                  <Title>
                  Detailed Charts
                  </Title>
                  {selectedHistory.map(record => (
                    <Grid item xs={12} md={6} lg={6}>
                     <Paper
                       sx={{
                         p: 2,
                         display: 'flex',
                         flexDirection: 'column',
                         height: 240,
                       }}
                     >
                        <DetailedChart exercise={record.exerciseType} right={record.side == "R" ? record : []} left={record.side == "L" ? record : []} showSummary = {true} showDate = {true} />
                     </Paper>
                   </Grid>
                  ))}
                </Grid>
              }
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
