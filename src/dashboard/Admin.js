import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Title from './Title';
import { IconButton } from '@mui/material';

const mdTheme = createTheme();
const localURL = "http://localhost:3000";

const coachName = ['Dylan Whitbread', 'Jon Brown', 'Stuart Maxwell', 'Ben Bahrami']

const fetchSports = (setFetchedSports) => {
    const sportsURL = `/sports`;
    axios.get(localURL + sportsURL).then(data => {
      if (data.data.sport) {
        setFetchedSports(data.data.sport);
      }
    });
  }

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    width: '100vw',
}));

const handleBackDashboard = () => {
    window.location.href = "/";
  };

function Admin(props) {
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
            setYear(null);
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


    useEffect(() => {
        // call an API and in the success or failure fill the data buy using setData function
        // it could be like below
        fetchSports(setFetchedSports);
      }, []);

    return (
            <ThemeProvider theme={mdTheme}>
              <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute">
                  <Toolbar >
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
                        Admin
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
        
                  <Container sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} xl={6}>
                          <FormControl fullWidth>
                            <InputLabel id="select-label">Data Record Type</InputLabel>
                            <Select
                              labelId="select-label"
                              id="simple-select"
                              value={dataType}
                              label="Data Record Type"
                              onChange={handleDataChange}
                              defaultValue="athlete"
                            >
                                <MenuItem value="athlete">Athlete</MenuItem>
                                <MenuItem value="sport">Sport</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3} xl={3}>
                        </Grid>
                        <Grid item xs={12} md={3} xl={3}>
                          <Button variant="contained" onClick={() => handleBackDashboard()}>Return to Dashboard</Button>
                        </Grid>
                    </Grid>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 250,
                            mt: '20px'
                        }}
                    >
                    {dataType == "sport" &&
                        <Grid container spacing={3}>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    fullWidth
                                    required
                                    id="sport"
                                    label="Sport"
                                    value={sportName}
                                    onChange={(e) => setSportName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} md={6} xl={6}>
                                <FormControl fullWidth required>
                                    <InputLabel>Coach</InputLabel>
                                    <Select
                                        value={coach}
                                        label="Coach"
                                        onChange={(e) => setCoach(e.target.value)}
                                    >
                                        {coachName.map((c) => <MenuItem value={c}>{c}</MenuItem>)}
                                        <MenuItem value="Other">Other</MenuItem>
                                        <MenuItem value="NA">N/A</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    id="desc"
                                    label="Description"
                                    value={sportDesc}
                                    onChange={(e) => setSportDesc(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} xl={12}>
                                <Button 
                                    color="primary"
                                    variant="contained"  
                                    disabled={!(sportName && coach)}
                                    onClick={() => postSport()}>
                                        Create {dataType}
                                </Button>
                            </Grid>
                        </Grid>
                    }
                    {dataType == "athlete" &&
                        <Grid container spacing={3}>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    fullWidth
                                    required
                                    id="firstName"
                                    label="First Name"
                                    value={firstN}
                                    onChange={(e) => setFirstN(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    value={lastN}
                                    onChange={(e) => setLastN(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} md={4} xl={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Sport</InputLabel>
                                    <Select
                                        labelId="select-label"
                                        id="simple-select"
                                        value={sport}
                                        label="Sport"
                                        onChange={(s) =>  { setSport(s.target.value)} }
                                    >
                                        { fetchedSports.map((sport) => (
                                            <MenuItem value={sport.sport}>{sport.sport}</MenuItem>
                                        )) }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} xl={4}>
                                <TextField
                                    fullWidth
                                    id="year"
                                    label="Year"
                                    type="number"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} md={4} xl={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Sex</InputLabel>
                                    <Select
                                        value={sex}
                                        label="Sex"
                                        onChange={(e) => setSex(e.target.value)}
                                    >
                                        <MenuItem value="F">F</MenuItem>
                                        <MenuItem value="M">M</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12} xl={12}>
                                <Button 
                                    color="primary"
                                    variant="contained"  
                                    disabled={!(firstN && lastN && sport && sex && year)}
                                    onClick={() => postAthlete()}>
                                        Create {dataType}
                                </Button>
                            </Grid>
                        </Grid>
                    }
                    </Paper>
                </Container>
                </Box>
              </Box>
            </ThemeProvider>
    );
}

export default Admin;