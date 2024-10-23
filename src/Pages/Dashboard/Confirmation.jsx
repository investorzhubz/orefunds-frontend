import React from 'react';

const Confirmation = ({ message, onConfirm, onCancel }) => {
    // Some basic styles
const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9,
    },
    popup: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
         width:'300px'
    
    },
    buttons: {
      marginTop: '15px',
      display: 'flex',
      justifyContent: 'space-around',
    },
    acceptButton: {
      backgroundColor: '#28a745',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    rejectButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
     
    },
    
  };
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h3>New DPS Confirmation</h3>
        <p> Are you sure you want to confirm for {message} Plan</p>
        <div style={styles.buttons}>
          <button style={styles.acceptButton} onClick={onConfirm}>Accept</button>
          <button style={styles.rejectButton} onClick={onCancel}>Reject</button>
        </div>
      </div>
    </div>
  );
};



export default Confirmation;
