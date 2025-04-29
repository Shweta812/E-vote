import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav style={{ background: 'var(--color-primary-dark)', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to='/'><h1 style={{ color: 'var(--color-light)' }}>E-Vote</h1></Link>
        <div>
          {user ? (
            <> 
              <Link to='/dashboard'>Dashboard</Link>
              <button onClick={logout} style={{ marginLeft: 20 }}>Logout</button>
            </>
          ) : (
            <> <Link to='/login'>Login</Link><Link to='/signup' style={{ marginLeft: 20 }}>Signup</Link> </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;