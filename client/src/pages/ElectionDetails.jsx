import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchElection, submitVote } from '../services/api';

const ElectionDetails = () => {
  const { id } = useParams();
  const [election, setElection] = useState(null);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    fetchElection(id)
      .then(res => setElection(res.data))
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleVote = async () => {
    try {
      await submitVote(id, selected);
      setVoted(true);
    } catch {
      setError('Vote submission failed');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{color:'red'}}>{error}</p>;

  return (
    <div className="detail-container">
      <h2>{election.name}</h2>
      {voted ? (
        <p>Thank you for voting!</p>
      ) : (
        <>
          {election.candidates.map(c => (
            <div key={c.id}>
              <label>
                <input
                  type="radio"
                  name="candidate"
                  value={c.id}
                  onChange={()=>setSelected(c.id)}
                /> {c.name}
              </label>
            </div>
          ))}
          <button disabled={!selected} onClick={handleVote}>Submit Vote</button>
        </>
      )}
    </div>
  );
};

export default ElectionDetails;