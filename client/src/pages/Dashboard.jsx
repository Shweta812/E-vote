import React, { useEffect, useState } from 'react';
import { fetchElections } from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchElections()
      .then(res => setElections(res.data))
      .catch(err => setError('Could not load elections'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{color:'red'}}>{error}</p>;

  return (
    <div className="list-container">
      <h2>Your Elections</h2>
      {elections.map(e => (
        <div key={e.id} className="card">
          <h3>{e.name}</h3>
          <p>Status: {e.status}</p>
          <Link to={`/election/${e.id}`}>View & Vote</Link>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;