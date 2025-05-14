import { Ticket } from '../types/ticket';

interface TicketsProps {
  tickets: Ticket[] | null;
  handleClic: (ticketId: string) => void;
}

const Tickets = ({tickets, handleClic}: TicketsProps) => {
  return (
    <div>
      <h3>Tickets</h3>

<div className='container'>
{tickets?.map((t) => (
  <div key={t.id} className='card'>
    <h2>{t.airline}</h2>
    <span className='card-place from'>From: {t.from}</span>
    <span className='card-place to'>To: {t.to}</span>
    <p>Time: {t.departureTime}</p>
    <button 
    onClick={() => {
      console.log('Button', t.id);
      handleClic(t.id)
    }}
    className='btn'
    >Details</button>
  </div>
))}
</div>
    </div>
  )
}

export default Tickets;