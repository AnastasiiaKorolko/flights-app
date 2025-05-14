// import { Ticket } from '../../types/ticket';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import s from './Ticket.module.css';

// const Tick = () => {
//   const { ticketId } = useParams();
//   console.log('ID', ticketId);
//   const [ticket, setTicket] = useState<Ticket | null>(null);

//   useEffect(() => {
//     if (ticketId) {
//       const fet = async () => {
//         try {
//           const response = await fetch(
//             `https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights/${ticketId}`
//           );
//           const data = await response.json();
//           setTicket(data);
//         } catch (err) {
//           console.error('Error fetch', err);
//         }
//       };

//       fet();
//     }
//   }, [ticketId]);

//   return (
//     <div className={s.card}>
//       {ticket && (
//         <div>
//           <h1>{ticket.airline} Flight</h1>
//           <div className={s.details}>
//             {ticket.from} ➡️ {ticket.to}
//           </div>
//           <div className={s.info}>
//             <span>Departure:</span> {ticket.departureTime}
//           </div>
//           <div className={s.info}>
//             <span>Arrival:</span> {ticket.arrivalTime}
//           </div>
//           <div className={s.info}>
//             <span>Gate:</span> {ticket.gate} | <span>Terminal:</span> {ticket.terminal}
//           </div>
//           <div className={s.info}>
//             <span>Price:</span> ${ticket.price}
//           </div>
//           <div className={s.info}>
//             <span>Tickets:</span> {ticket.tickets.total} (Remaining: {ticket.tickets.remaining})
//           </div>
//           <div className={s.ticketInfo}>
//             <p>Flight ID: {ticket.id}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tick;


// import { Ticket } from '../../types/ticket';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Container,
//   CircularProgress,
//   Box,
// } from '@mui/material';
// import dayjs from 'dayjs';

// const Tick = () => {
//   const { ticketId } = useParams();
//   console.log('ID', ticketId);
//   const [ticket, setTicket] = useState<Ticket | null>(null);

//   useEffect(() => {
//     if (ticketId) {
//       const fet = async () => {
//         try {
//           const response = await fetch(
//             `https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights/${ticketId}`
//           );
//           const data = await response.json();
//           setTicket(data);
//         } catch (err) {
//           console.error('Error fetch', err);
//         }
//       };

//       fet();
//     }
//   }, [ticketId]);

//   const formatTime = (timeString: string) => {
//     return dayjs(timeString, 'HH:mm:ss').format('HH:mm'); // 24-годинний формат
//   };

//   if (!ticket) {
//     return (
//       <Box display="flex" justifyContent="center" mt={5}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4 }}>
//       <Card 
//         elevation={6} 
//         sx={{
//           borderRadius: 3,
//           padding: 3,
//           bgcolor: 'primary.main',
//           color: 'white',
//         }}
//       >
//         <CardContent>
//           <Typography variant="h4" align="center" gutterBottom>
//             {ticket.airline} Flight
//           </Typography>
//           <Typography variant="h6" align="center" mb={2}>
//             {ticket.from} ➡️ {ticket.to}
//           </Typography>

//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <Typography variant="body1"><strong>Departure:</strong></Typography>
//               <Typography variant="body2">{formatTime(ticket.departureTime)}</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body1"><strong>Arrival:</strong></Typography>
//               <Typography variant="body2">{formatTime(ticket.arrivalTime)}</Typography>
//             </Grid>

//             <Grid item xs={6}>
//               <Typography variant="body1"><strong>Gate:</strong></Typography>
//               <Typography variant="body2">{ticket.gate}</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body1"><strong>Terminal:</strong></Typography>
//               <Typography variant="body2">{ticket.terminal}</Typography>
//             </Grid>

//             <Grid item xs={12}>
//               <Typography variant="body1"><strong>Price:</strong></Typography>
//               <Typography variant="body2">${ticket.price}</Typography>
//             </Grid>

//             <Grid item xs={12}>
//               <Typography variant="body1"><strong>Tickets:</strong></Typography>
//               <Typography variant="body2">
//                 {ticket.tickets.total} (Remaining: {ticket.tickets.remaining})
//               </Typography>
//             </Grid>

//             <Grid item xs={12}>
//               <Typography variant="body2" align="center" color="secondary">
//                 Flight ID: {ticket.id}
//               </Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default Tick;



import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Box,
  Button,
  Paper,
  Divider,
  Chip,
  alpha,
  Backdrop
} from '@mui/material';
import dayjs from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BusinessIcon from '@mui/icons-material/Business';
import EventIcon from '@mui/icons-material/Event';
import LuggageIcon from '@mui/icons-material/Luggage';
import WifiIcon from '@mui/icons-material/Wifi';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import WeekendIcon from '@mui/icons-material/Weekend';
import BoltIcon from '@mui/icons-material/Bolt';

// Додаткові кольори для авіакомпаній (можна змінити на власний смак)
const airlineColors = {
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

// Функція для отримання кольору авіакомпанії
const getAirlineColor = (airline) => {
  return airlineColors[airline] || airlineColors['Default'];
};

// Функція для форматування дати та часу
const formatDateTime = (dateTimeStr) => {
  const date = new Date(dateTimeStr);
  return {
    date: date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    time: date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
  };
};

// Функція для розрахунку тривалості польоту
const calculateDuration = (departureTime, arrivalTime) => {
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);
  const diffMinutes = Math.floor((arrival.getTime() - departure.getTime()) / 60000);
  
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  
  return `${hours}г ${minutes}хв`;
};

const Tick = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (ticketId) {
      const fetchTicket = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights/${ticketId}`
          );
          
          if (!response.ok) {
            throw new Error('Не вдалося отримати дані про квиток');
          }
          
          const data = await response.json();
          setTicket(data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching ticket:', err);
          setError(true);
          setLoading(false);
        }
      };

      fetchTicket();
    }
  }, [ticketId]);

  if (loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress color="inherit" />
          <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>
            Завантаження інформації про рейс...
          </Typography>
        </Box>
      </Backdrop>
    );
  }

  if (error || !ticket) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" color="error" gutterBottom>
            Помилка завантаження даних
          </Typography>
          <Typography variant="body1" paragraph>
            На жаль, не вдалося отримати інформацію про квиток. Спробуйте пізніше.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
          >
            Повернутися до списку квитків
          </Button>
        </Paper>
      </Container>
    );
  }

  // Форматування часу та дати
  const departureDateTime = formatDateTime(ticket.departureTime);
  const arrivalDateTime = formatDateTime(ticket.arrivalTime);
  
  // Розрахунок тривалості польоту
  const duration = calculateDuration(ticket.departureTime, ticket.arrivalTime);
  
  // Визначення кольору авіакомпанії
  const airlineColor = getAirlineColor(ticket.airline);

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ 
          mb: 3, 
          fontWeight: 500,
          color: '#1A237E',
          '&:hover': {
            backgroundColor: 'transparent',
            transform: 'translateX(-4px)'
          },
          transition: 'transform 0.3s'
        }}
      >
        Повернутися до списку рейсів
      </Button>

      <Paper 
        elevation={4} 
        sx={{ 
          borderRadius: 4,
          overflow: 'hidden',
          mb: 4
        }}
      >
        {/* Заголовок квитка */}
        <Box 
          sx={{ 
            p: 3, 
            backgroundImage: `linear-gradient(135deg, ${airlineColor} 0%, ${alpha(airlineColor, 0.7)} 100%)`,
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute',
              top: -20,
              right: -20,
              width: 120,
              height: 120,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.1)'
            }} 
          />
          
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {ticket.airline}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <AirplaneTicketIcon sx={{ mr: 1 }} />
            <Typography variant="subtitle1">
              Рейс #{ticket.flightNumber || 'SQ' + ticket.id}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {/* Головна інформація про рейс */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
              my: 3
            }}>
              {/* Пункт відправлення */}
              <Box sx={{ textAlign: 'center', width: '40%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <FlightTakeoffIcon sx={{ color: airlineColor, fontSize: 28, mr: 1 }} />
                </Box>
                <Typography variant="h5" fontWeight="bold">
                  {ticket.from}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1, color: 'text.secondary' }}>
                  <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2">
                    {departureDateTime.time}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {departureDateTime.date}
                </Typography>
              </Box>

              {/* Інформація про тривалість */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                position: 'relative',
                width: '20%'
              }}>
                <Typography variant="caption" sx={{ mb: 1, color: 'text.secondary' }}>
                  {duration}
                </Typography>
                <Box sx={{ 
                  width: '100%', 
                  height: 2, 
                  backgroundColor: alpha(airlineColor, 0.3),
                  position: 'relative'
                }}>
                  <Box 
                    component="span" 
                    sx={{ 
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      bgcolor: 'white',
                      border: `2px solid ${airlineColor}`,
                      borderRadius: '50%',
                      width: 12,
                      height: 12
                    }}
                  />
                </Box>
                <ArrowRightAltIcon sx={{ color: airlineColor, fontSize: 24, mt: 1 }} />
              </Box>

              {/* Пункт призначення */}
              <Box sx={{ textAlign: 'center', width: '40%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <FlightLandIcon sx={{ color: airlineColor, fontSize: 28, mr: 1 }} />
                </Box>
                <Typography variant="h5" fontWeight="bold">
                  {ticket.to}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1, color: 'text.secondary' }}>
                  <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2">
                    {arrivalDateTime.time}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {arrivalDateTime.date}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Деталі рейсу */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1A237E' }}>
            Деталі рейсу
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 2,
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MeetingRoomIcon sx={{ color: airlineColor, mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Термінал
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {ticket.terminal || 'T1'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BusinessIcon sx={{ color: airlineColor, mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Вихід
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {ticket.gate || 'G34'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalOfferIcon sx={{ color: airlineColor, mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Ціна
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {ticket.price} UAH
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 2,
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AirplaneTicketIcon sx={{ color: airlineColor, mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Доступні квитки
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {ticket.tickets?.remaining || '12'} з {ticket.tickets?.total || '120'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EventIcon sx={{ color: airlineColor, mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Дата рейсу
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {departureDateTime.date}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon sx={{ color: airlineColor, mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Тривалість польоту
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {duration}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1A237E' }}>
              Послуги на борту
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              <Chip icon={<LuggageIcon />} label="Багаж включено" variant="outlined" />
              <Chip icon={<WifiIcon />} label="Wi-Fi на борту" variant="outlined" />
              <Chip icon={<FastfoodIcon />} label="Харчування" variant="outlined" />
              <Chip icon={<WeekendIcon />} label="Комфортні сидіння" variant="outlined" />
              <Chip icon={<BoltIcon />} label="USB-зарядка" variant="outlined" />
            </Box>
          </Box>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5,
                borderRadius: 6,
                backgroundColor: airlineColor,
                '&:hover': {
                  backgroundColor: alpha(airlineColor, 0.8)
                },
                fontWeight: 'bold'
              }}
            >
              Забронювати квиток
            </Button>
          </Box>
        </CardContent>
      </Paper>

      <Typography variant="caption" align="center" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
        ID квитка: {ticket.id} • Останнє оновлення: {departureDateTime.date}
      </Typography>
    </Container>
  );
};

export default Tick;
