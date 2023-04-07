import React, { Component, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


export const Counter = (props) => {
    const { isAuthenticated } = useAuth0();
    const [currentCount, setCurrentCount] = useState(0);


    function incrementCounter() {
        setCurrentCount(currentCount + 1);
    }


    if (!isAuthenticated) {
        window.location.href = "";
    }

    return isAuthenticated && (
        <div>
          <h1>Counter</h1>
  
          <p>This is a simple example of a React component.</p>
  
          <p aria-live="polite">Current count: <strong>{currentCount}</strong></p>
  
          <button className="btn btn-primary" onClick={() => incrementCounter()}>Increment</button>
        </div>
    );
}

