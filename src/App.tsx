import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Tick from './components/Ticket/Ticket';
import { Ticket } from './types/ticket';
import { Routes, Route, useNavigate } from 'react-router-dom';
import About from './components/Abouts';
import Contacts from './components/Contacts';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Box,
  Container,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  Paper,
  alpha,
  Divider,
  Chip,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import SortIcon from '@mui/icons-material/Sort';

const airlineColors: Record<string, string> = {
  'Default': '#3f51b5',
  'Qatar Airways': '#5C0D34',
  'Emirates': '#D71921',
  'Lufthansa': '#05164D',
  'British Airways': '#075AAA',
  'Air France': '#002157',
  'KLM': '#00A1DE',
  'Turkish Airlines': '#E81932',
  'Delta': '#E01933',
  'United': '#002244',
  'American Airlines': '#0078D2',
};

const generatePastelColor = (): string => {
  const colorPalettes = {
    blue: ['#B3CDE0', '#6497B1', '#005B96', '#03396C', '#011F4B'],
    lightBlue: ['#A7DBE8', '#00BFFF', '#87CEFA', '#4682B4', '#5F9EA0'],
    yellow: ['#FFF9C4', '#FFEB3B', '#FFD700', '#FDD835', '#FBC02D'],
    green: ['#C8E6C9', '#8BC34A', '#4CAF50', '#388E3C', '#2E7D32'],
    orange: ['#FFCC80', '#FFA726', '#FB8C00', '#F57C00', '#EF6C00'],
  };

  const paletteNames = Object.keys(colorPalettes) as Array<keyof typeof colorPalettes>;
  const randomPalette = colorPalettes[paletteNames[Math.floor(Math.random() * paletteNames.length)]];

  return randomPalette[Math.floor(Math.random() * randomPalette.length)];
};

const getAirlineColor = (airline: string) => {
  const formattedAirline = airline.trim();

  if (airlineColors[formattedAirline]) {
    return airlineColors[formattedAirline];
  }

  const newColor = generatePastelColor();
  airlineColors[formattedAirline] = newColor;

  console.warn(`Колір для нової авіакомпанії "${formattedAirline}" створено: ${newColor}`);
  return newColor;
};

const formatDateTime = (dateTimeStr: number) => {
  const date = new Date(dateTimeStr);
  return {
    date: date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    time: date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
  };
};

function App() {
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [activeSortButton, setActiveSortButton] = useState<string | null>(null);
  const navigate = useNavigate();

  const filterTickets = (searchValue: string, ticketsToFilter: Ticket[]): Ticket[] => {
    if (!searchValue || !searchValue.trim()) {
      return ticketsToFilter;
    }
  
    const normalizedSearchValue = searchValue.toLowerCase().trim();
    
    return ticketsToFilter.filter((ticket) =>
      ticket.airline.toLowerCase().includes(normalizedSearchValue) ||
      ticket.from.toLowerCase().includes(normalizedSearchValue) ||
      ticket.to.toLowerCase().includes(normalizedSearchValue)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log('NewValue', newValue)
    setValue(newValue);
    const filtered = filterTickets(newValue, allTickets);
    console.log('FILTER', filtered)
    setTickets(filtered);
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights');
        const data = await response.json();
        console.log("Loaded tickets:", data.length);
        setAllTickets(data);
        setTickets(data);
      } catch (err) {
        console.error('Error fetching tickets', err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSorted = (criteria: string) => {
    setActiveSortButton(criteria);
    const sorted = [...tickets].sort((a, b) => {
      switch (criteria) {
        case 'airline':
          return a.airline.localeCompare(b.airline);
        case 'departureTime':
          return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
        case 'price':
          return (a.price ?? 0) - (b.price ?? 0);
        default:
          return 0;
      }
    });
    setTickets(sorted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const HomePage = () => (
    <>
      <Typography variant="h4" component="h1" sx={{ 
        mb: 4, 
        fontWeight: 700, 
        color: '#1A237E',
        textAlign: 'center',
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 100,
          height: 4,
          backgroundColor: '#3F51B5',
          borderRadius: 2
        }
      }}>
        Знайдіть ідеальний рейс
      </Typography>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          mb: 4, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Пошук за авіакомпанією, містом відправлення або призначення"
            value={value}
            onChange={handleSearchChange}
            autoFocus
            onKeyDown={handleKeyDown}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { 
                borderRadius: 4,
                bgcolor: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                }
              }
            }}
            
          />
          
        </Box>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 4,
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          flexWrap: 'wrap',
          borderRadius: 2,
          bgcolor: 'white'
        }}
      >
        <Typography variant="subtitle1" sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mr: 2, 
          color: '#424242',
          fontWeight: 500
        }}>
          <SortIcon sx={{ mr: 1 }} /> Сортувати за:
        </Typography>
        <Button 
          variant={activeSortButton === 'airline' ? "contained" : "outlined"} 
          startIcon={<DirectionsTransitIcon />}
          onClick={() => handleSorted('airline')}
          color="primary"
          sx={{ borderRadius: 4 }}
        >
          Авіакомпанія
        </Button>
        <Button 
          variant={activeSortButton === 'departureTime' ? "contained" : "outlined"} 
          startIcon={<AccessTimeIcon />}
          onClick={() => handleSorted('departureTime')}
          color="primary"
          sx={{ borderRadius: 4 }}
        >
          Час відправлення
        </Button>
        <Button 
          variant={activeSortButton === 'price' ? "contained" : "outlined"} 
          startIcon={<LocalOfferIcon />}
          onClick={() => handleSorted('price')}
          color="primary"
          sx={{ borderRadius: 4 }}
        >
          Ціна
        </Button>
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 8 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {tickets.length > 0 ? tickets.map((ticket) => {
            const departureDateTime = formatDateTime(ticket.departureTime);
            const arrivalDateTime = formatDateTime(ticket.arrivalTime);
            const airlineColor = getAirlineColor(ticket.airline);
            
            return (
              <Grid item xs={12} sm={6} md={4} key={ticket.id} component='div'>
                <Card 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    borderRadius: 3,
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
                    },
                    position: 'relative'
                  }}
                >
                  <Box 
                    sx={{ 
                      p: 1, 
                      bgcolor: airlineColor,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {ticket.airline}
                    </Typography>
                    <Typography variant="body2">
                      Рейс #{ticket.flightNumber}
                    </Typography>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                        <FlightTakeoffIcon sx={{ color: '#1976D2', mb: 0.5 }} />
                        <Typography variant="h6" fontWeight="bold">{ticket.from}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {departureDateTime.time}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {departureDateTime.date}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 1 }}>
                        <ArrowRightAltIcon sx={{ color: '#757575', fontSize: 32 }} />
                        <Typography variant="caption" color="text.secondary">
                          {ticket.duration || '2г 30хв'}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                        <FlightLandIcon sx={{ color: '#4CAF50', mb: 0.5 }} />
                        <Typography variant="h6" fontWeight="bold">{ticket.to}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {arrivalDateTime.time}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {arrivalDateTime.date}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', gap: '10px' }}>
                      <Chip 
                        label={`${ticket.price} UAH`}
                        color="primary"
                        variant="filled"
                        icon={<LocalOfferIcon />}
                        sx={{ fontWeight: 'bold' }}
                      />
                      <button
                        className="btn-donate"
                        style={{
                          backgroundColor: airlineColor,
                          
                          '--btn-bg-1': airlineColor,
                        } as React.CSSProperties}
                        onClick={() => navigate(`/ticket/${ticket.id}`)}
                      >
                        Деталі рейсу
                      </button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          }) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 4 }}>
              <Typography variant="h6" color="text.secondary">
                Квитків за вашим запитом не знайдено
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ mt: 2 }}
                onClick={() => {
                  setValue('');
                  setTickets(allTickets);
                }}
              >
                Скинути пошук
              </Button>
            </Box>
          )}
        </Grid>
      )}
    </>
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: '#F5F5F5'
    }}>
      <AppBar position="sticky" elevation={4} sx={{ 
        backgroundColor: '#FFFFFF', 
        color: '#1A237E' 
      }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <DirectionsTransitIcon sx={{ fontSize: 28, mr: 1, color: '#3F51B5' }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Sky Travel
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button 
            color="inherit" 
            sx={{ 
              ml: 1, 
              borderRadius: 4,
              fontWeight: 600,
              '&:hover': { backgroundColor: alpha('#1A237E', 0.08) }
            }} 
            onClick={() => navigate('/')}
          >
            Головна
          </Button>
          <Button 
            color="inherit" 
            sx={{ 
              ml: 1, 
              borderRadius: 4,
              fontWeight: 600,
              '&:hover': { backgroundColor: alpha('#1A237E', 0.08) }
            }} 
            onClick={() => navigate('/about')}
          >
            Про нас
          </Button>
          <Button 
            color="inherit" 
            sx={{ 
              ml: 1, 
              borderRadius: 4,
              fontWeight: 600,
              '&:hover': { backgroundColor: alpha('#1A237E', 0.08) }
            }} 
            onClick={() => navigate('/contacts')}
          >
            Контакти
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ flexGrow: 1, marginTop: 4, marginBottom: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ticket/:ticketId" element={<Tick />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Sky Travel. Всі права захищені.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default App;