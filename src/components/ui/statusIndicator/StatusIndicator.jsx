import React from 'react';
import './StatusIndicator.scss'; 

const StatusIndicator = ({ status }) => {
  const normalizedStatus = status?.toLowerCase() || '';

  const getColor = () => {
    switch (normalizedStatus) {
      case 'red'|| "RED":
        return 'red';
      case 'orange'|| 'ORANGE':
        return 'orange';
      case 'green' || 'GREEN':
        return 'green';
      case 'blue' || 'BLUE':
        return 'blue';
        case 'yellow' || 'YELLOW':
          return '#FFCC33';
      default:
        return 'gray'; 
    }
  };
  return (
    <div className="status-indicator">
      <span
        className="indicator-circle"
        style={{ backgroundColor: getColor() }}
      />
      <span style={{ color: getColor() }}>
        {status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : 'Gray'} 
      </span>
    </div>
  );
};

export default StatusIndicator;
