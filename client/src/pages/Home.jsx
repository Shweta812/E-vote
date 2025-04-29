import { useEffect, useState } from 'react';
import { fetchElections } from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchElections()
      .then(res => setElections(res.data))
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{color:'red'}}>{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>All Elections</h2>
      {elections.map(e => (
        <Link key={e._id} to={`/election/${e._id}`} className='card'>
          <h3>{e.name}</h3><p>Status: {e.status}</p>
        </Link>
      ))}
    </div>
  );
};
export default Home;