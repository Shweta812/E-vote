import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name required';
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) errs.email = 'Invalid email';
    if (form.password.length < 6) errs.password = '≥6 chars';
    if (form.password !== form.confirm) errs.confirm = 'Must match';
    return errs;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    try {
      await signup({ name: form.name, email: form.email, password: form.password });
      Navigate('/dashboard');
    } catch (err) {
      setErrors({ api: err.response?.data?.message || 'Signup error' });
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      {errors.api && <p style={{color:'red'}}>{errors.api}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <input name="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" />
        {errors.name && <small>{errors.name}</small>}
        <input name="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" />
        {errors.email && <small>{errors.email}</small>}
        <input name="password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" />
        {errors.password && <small>{errors.password}</small>}
        <input name="confirm" type="password" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} placeholder="Confirm Password" />
        {errors.confirm && <small>{errors.confirm}</small>}
        <button type="submit" onClick={handleSubmit(Event)}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;