import React from 'react';

const Card = ({ ticket }) => {
  return (
    <div className="card">
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <p>Assigned to: {ticket.assigned_to}</p>
      <p>Priority: {ticket.priority}</p>
    </div>
  );
};

export default Card;
