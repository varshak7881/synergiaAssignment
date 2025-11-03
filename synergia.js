const express = require('express');
const app = express();
app.use(express.json());
let events = [];
let bookings = [];
let nextEventId = 1;
let nextBookingId = 1;
// 1. GET /events 
app.get('/events', (req, res) => {
  res.json(events);
});
// 2. POST /events/add 
app.post('/events/add', (req, res) => {
  const { name, date, location } = req.body;
  const newEvent = { id: nextEventId++, name, date, location };
  events.push(newEvent);
  res.json({ message: 'Event added successfully', event: newEvent });
});
// 3. GET /event/:id 
app.get('/event/:id', (req, res) => {
  const event = events.find(e => e.id == req.params.id);
  if (event) res.json(event);
  else res.status(404).json({ message: 'Event not found' });
});
// 4. PUT /event/:id 
app.put('/event/:id', (req, res) => {
  const event = events.find(e => e.id == req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  const { name, date, location } = req.body;
  if (name) event.name = name;
  if (date) event.date = date;
  if (location) event.location = location;

  res.json({ message: 'Event updated successfully', event });
});

// 5. DELETE /event/:id 
app.delete('/event/:id', (req, res) => {
  const index = events.findIndex(e => e.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Event not found' });

  const deleted = events.splice(index, 1);
  res.json({ message: 'Event deleted successfully', deleted });
});
// 1. GET /api/bookings 
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

// 2. POST /api/bookings 
app.post('/api/bookings', (req, res) => {
  const { participant, eventId } = req.body;
  const event = events.find(e => e.id == eventId);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  const newBooking = { id: nextBookingId++, participant, eventId };
  bookings.push(newBooking);
  res.json({ message: 'Booking created successfully', booking: newBooking });
});

// 3. GET /api/bookings/:id 
app.get('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id);
  if (booking) res.json(booking);
  else res.status(404).json({ message: 'Booking not found' });
});

// 4. PUT /api/bookings/:id 
app.put('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  const { participant } = req.body;
  if (participant) booking.participant = participant;
  res.json({ message: 'Booking updated successfully', booking });
});

// 5. DELETE /api/bookings/:id 
app.delete('/api/bookings/:id', (req, res) => {
  const index = bookings.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Booking not found' });
  const deleted = bookings.splice(index, 1);
  res.json({ message: 'Booking cancelled successfully', deleted });
});
app.listen(3000, () => {
  console.log('Synergia Event Booking API running at http://localhost:3000');
});
