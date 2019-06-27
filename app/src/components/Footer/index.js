import React from 'react';
import menu from '../../logo.svg';

const Footer = () => {
  return (
    <footer>
      Logo icon <img src={menu} alt="Website Logo" width="30px" /> made by{' '}
      <a
        href="https://www.flaticon.com/authors/nikita-golubev"
        title="Nikita Golubev"
      >
        Nikita Golubev
      </a>{' '}
      from{' '}
      <a href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
      </a>{' '}
      is licensed by{' '}
      <a
        href="http://creativecommons.org/licenses/by/3.0/"
        title="Creative Commons BY 3.0"
      >
        CC 3.0
      </a>
    </footer>
  );
};

export default Footer;