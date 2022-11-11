import React from 'react'
import { Link } from 'react-router-dom';
import './NavigationTab.css';
const Navigation = props => {
  return (
    <header className='header'>
      <div>Identity</div>
      <nav className='logo'>
        <ul>
          <li>
            <Link to='home-tab'>Home</Link>
          </li>
          <li>
            <Link to='identities'>Identities</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;