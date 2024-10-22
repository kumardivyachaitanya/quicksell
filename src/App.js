import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import Filter from './components/Filter';
import Sort from './components/Sort';

function App() {
  const [tickets, setTickets] = useState(null); // Initially null or empty array
  const [grouping, setGrouping] = useState('status');
  const [sortOption, setSortOption] = useState('priority');

  // Fetch tickets from the API
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTickets(data);
        } else if (data && Array.isArray(data.tickets)) {
          setTickets(data.tickets); // Adjust according to actual structure
        } else {
          console.error('Unexpected data format', data);
        }
      })
      .catch((error) => console.error('Error fetching tickets:', error));
  }, []);

  // If tickets haven't been fetched yet, return a loading indicator
  if (!tickets) {
    return <div>Loading...</div>;
  }

  // Apply sorting before grouping
  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortOption === 'priority') {
      return b.priority - a.priority; // Sort by priority (descending)
    } else if (sortOption === 'title') {
      return a.title.localeCompare(b.title); // Sort by title (ascending)
    }
    return 0;
  });

  // Group the tickets based on the selected grouping
  const groupBy = (tickets) => {
    switch (grouping) {
      case 'status':
        return tickets.reduce((acc, ticket) => {
          const key = ticket.status || 'No status';
          if (!acc[key]) acc[key] = [];
          acc[key].push(ticket);
          return acc;
        }, {});
      case 'assigned_to':
        return tickets.reduce((acc, ticket) => {
          const key = ticket.assigned_to || 'Unassigned';
          if (!acc[key]) acc[key] = [];
          acc[key].push(ticket);
          return acc;
        }, {});
      case 'priority':
        return tickets.reduce((acc, ticket) => {
          const key = ticket.priority || 'No priority';
          if (!acc[key]) acc[key] = [];
          acc[key].push(ticket);
          return acc;
        }, {});
      default:
        return {};
    }
  };

  return (
    <div className="App">
      <Filter setGrouping={setGrouping} />
      <Sort setSortOption={setSortOption} />
      <KanbanBoard tickets={sortedTickets} groupBy={groupBy} />
    </div>
  );
}

export default App;
