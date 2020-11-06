import React from 'react';

const Notification = ({ message, styleMessage }) => {
  if (message === null || message === "") {
    return null
  }

  return (
    <div className={styleMessage}>
      {message}
    </div>
  )
}

export default Notification