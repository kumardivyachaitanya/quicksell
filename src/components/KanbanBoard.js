import React from 'react';
import './KanbanBoard.css';

const KanbanBoard = ({ tickets }) => {
  const groupByStatus = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      const status = ticket.status;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(ticket);
      return acc;
    }, {});
  };

  const groupedTickets = groupByStatus(tickets);

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((status, index) => (
        <div key={index} className="kanban-column">
          <h2>{status}</h2>
          <div className="kanban-cards">
            {groupedTickets[status]
              .sort((a, b) => a.priority - b.priority)
              .map((ticket) => (
                <div key={ticket.id} className="kanban-card">
                  <h3>{ticket.title}</h3>
                  <p>Assigned to: {ticket.assignedTo || 'Unassigned'}</p>
                  <p>Priority: {ticket.priority}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
