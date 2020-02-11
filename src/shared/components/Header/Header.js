import React from 'react';
import rscBrandLogo from '../../assets/images/rsc-logo.png';
import './Header.scss';

const Header = () => {
  return (
    <div className="header-container">
      <a href="/" className="header-brand">
        <img src={rscBrandLogo} alt="rsc-movies-header-logo" />
      </a>
    </div>
  );
};

export default Header;
