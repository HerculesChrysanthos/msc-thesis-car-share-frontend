import React from 'react';
import { SlSocialFacebook } from 'react-icons/sl';
import { PiGitlabLogoSimple } from 'react-icons/pi';
import { FiGithub } from 'react-icons/fi';
import { PiTelegramLogoLight } from 'react-icons/pi';
import { PiInstagramLogoLight } from 'react-icons/pi';
import { FaFigma } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo/dark-logo.png';

function Footer() {
  const navigate = useNavigate();
  return (
    <footer>
      <div className='container'>
        <div className='icons'>
          <ul>
            <li>
              <Link to='https://facebook.com' target='_blank' className='icon'>
                <SlSocialFacebook />
              </Link>
            </li>
            <li>
              <Link to='https://gitlab.com' target='_blank' className='icon'>
                <PiGitlabLogoSimple />
              </Link>
            </li>
            <li>
              <Link to='https://github.com' target='_blank' className='icon'>
                <FiGithub />
              </Link>
            </li>
            <li>
              <Link to='https://telegram.com' target='_blank' className='icon'>
                <PiTelegramLogoLight />
              </Link>
            </li>
            <li>
              <Link to='https://instagram.com' target='_blank' className='icon'>
                <PiInstagramLogoLight />
              </Link>
            </li>
            <li>
              <Link to='https://figma.com' target='_blank' className='icon'>
                <FaFigma />
              </Link>
            </li>
          </ul>
        </div>
        <nav>
          <ul>
            <li onClick={() => navigate('/')}>Σχετικά με εμάς</li>
            <li onClick={() => navigate('/')}>Όροι και προϋποθέσεις</li>
            <li onClick={() => navigate('/')}>Επικοινωνησε μαζι μας</li>
            <li onClick={() => navigate('/')}>Νοίκιασε το αμάξι σου</li>
          </ul>
        </nav>
        <div className='divider'></div>
        <div className='logo'>
          <img src={Logo} alt='White Logo' />
        </div>
        <div className='copy-rights'>
          © {new Date().getFullYear()} Car Share All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
