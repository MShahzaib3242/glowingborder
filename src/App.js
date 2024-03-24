
import React, { useEffect, useState } from 'react';
import * as dat from 'dat.gui';
import './App.css';


function App() {

  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const CONTAINER = document.querySelector('.container');
    const CARDS = document.querySelectorAll('article');

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 20,
      gap: 32,
      vertical: false,
      opacity: 0
    };

    const UPDATE = event => {
      // get the angle based on the center point of the card and pointer position
      for (const CARD of CARDS) {
        // Check the card against the proximity and then start updating
        const CARD_BOUNDS = CARD.getBoundingClientRect();
        // Get distance between pointer and outerbounds of card
        if (
          event?.x > CARD_BOUNDS.left - CONFIG.proximity &&
          event?.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
          event?.y > CARD_BOUNDS.top - CONFIG.proximity &&
          event?.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
        ) {
          // If within proximity set the active opacity
          CARD.style.setProperty('--active', 1);
        } else {
          CARD.style.setProperty('--active', CONFIG.opacity);
        }
        const CARD_CENTER = [
          CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
          CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5
        ];

        let ANGLE = Math.atan2(event?.y - CARD_CENTER[1], event?.x - CARD_CENTER[0]) * 180 / Math.PI;
        ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;
        CARD.style.setProperty('--start', ANGLE + 90);
      }
    };

    document.body.addEventListener('pointermove', UPDATE);

    const RESTYLE = () => {
      CONTAINER.style.setProperty('--gap', CONFIG.gap);
      CONTAINER.style.setProperty('--blur', CONFIG.blur);
      CONTAINER.style.setProperty('--spread', CONFIG.spread);
      CONTAINER.style.setProperty('--direction', CONFIG.vertical ? 'column' : 'row');
    };

    const CTRL = new dat.GUI({
      width: 340
    });

    CTRL.add(CONFIG, 'spread', 10, 180, 1).name('Spread (deg)').onChange(RESTYLE);
    CTRL.add(CONFIG, 'proximity', 10, 180, 1).name('Active Proximity (px)').onChange(RESTYLE);
    CTRL.add(CONFIG, 'gap', 10, 100, 1).name('Gap (px)').onChange(RESTYLE);
    CTRL.add(CONFIG, 'blur', 0, 50, 1).name('Blur (px)').onChange(RESTYLE);
    CTRL.add(CONFIG, 'opacity', 0, 1, 0.01).name('Inactive Opacity').onChange(RESTYLE);
    CTRL.add(CONFIG, 'vertical').name('Vertical Layout').onChange(RESTYLE);

    RESTYLE();
    UPDATE();

    // Cleanup function to remove event listener
    return () => {
      document.body.removeEventListener('pointermove', UPDATE);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light-theme' : 'dark');
    console.log('theme', theme)
  };

  return (
    <div className={`theme ${theme}`}>
      <h1 className='topHeading'>Glowing Effect on Hover</h1>
      <button className='mode' onClick={toggleTheme}>

        {theme === 'dark' ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12C6 15.36 8.64 18 12 18C15.36 18 18 15.36 18 12C18 8.64 15.36 6 12 6C8.64 6 6 8.64 6 12ZM12 8.4C14.04 8.4 15.6 9.96 15.6 12C15.6 14.04 14.04 15.6 12 15.6C9.96 15.6 8.4 14.04 8.4 12C8.4 9.96 9.96 8.4 12 8.4ZM13.2 3.6V1.2C13.2 0.48 12.72 0 12 0C11.28 0 10.8 0.48 10.8 1.2V3.6C10.8 4.32 11.28 4.8 12 4.8C12.72 4.8 13.2 4.32 13.2 3.6ZM20.52 3.48C20.04 3 19.32 3 18.84 3.48L17.16 5.16C16.68 5.64 16.68 6.36 17.16 6.84C17.4 7.08 17.76 7.2 18 7.2C18.24 7.2 18.6 7.08 18.84 6.84L20.52 5.16C21 4.8 21 3.96 20.52 3.48ZM22.8 10.8H20.4C19.68 10.8 19.2 11.28 19.2 12C19.2 12.72 19.68 13.2 20.4 13.2H22.8C23.52 13.2 24 12.72 24 12C24 11.28 23.52 10.8 22.8 10.8ZM18.84 17.04C18.36 16.56 17.64 16.56 17.16 17.04C16.68 17.52 16.68 18.24 17.16 18.72L18.84 20.4C19.08 20.64 19.44 20.76 19.68 20.76C19.92 20.76 20.28 20.64 20.52 20.4C21 19.92 21 19.2 20.52 18.72L18.84 17.04ZM10.8 20.4V22.8C10.8 23.52 11.28 24 12 24C12.72 24 13.2 23.52 13.2 22.8V20.4C13.2 19.68 12.72 19.2 12 19.2C11.28 19.2 10.8 19.68 10.8 20.4ZM3.48 20.52C3.72 20.76 4.08 20.88 4.32 20.88C4.56 20.88 4.92 20.76 5.16 20.52L6.84 18.84C7.32 18.36 7.32 17.64 6.84 17.16C6.36 16.68 5.64 16.68 5.16 17.16L3.48 18.84C3 19.2 3 20.04 3.48 20.52ZM0 12C0 12.72 0.48 13.2 1.2 13.2H3.6C4.32 13.2 4.8 12.72 4.8 12C4.8 11.28 4.32 10.8 3.6 10.8H1.2C0.48 10.8 0 11.28 0 12ZM5.16 3.48C4.68 3 3.96 3 3.48 3.48C3 3.96 3 4.68 3.48 5.16L5.16 6.84C5.4 7.2 5.76 7.32 6.12 7.32C6.48 7.32 6.72 7.2 6.96 6.96C7.44 6.48 7.44 5.76 6.96 5.28L5.16 3.48Z" fill="#EBF5FF" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.4 2.53333C12.9333 2.26667 13.2 1.6 13.0667 1.06667C12.9333 0.533333 12.2667 0 11.6 0C5.06667 0.133333 0 5.46667 0 12C0 18.6667 5.33333 24 12 24C17.0667 24 21.4667 20.8 23.2 16.1333C23.4667 15.6 23.2 14.9333 22.6667 14.5333C22.1333 14.1333 21.4667 14.2667 21.0667 14.6667C19.7333 15.8667 18 16.5333 16.1333 16.5333C12 16.5333 8.53333 13.2 8.53333 8.93333C8.53333 6.4 10 3.86667 12.4 2.53333ZM16.1333 19.2C16.8 19.2 17.4667 19.2 18 19.0667C16.4 20.5333 14.2667 21.3333 12 21.3333C6.8 21.3333 2.66667 17.2 2.66667 12C2.66667 8.66667 4.53333 5.6 7.33333 4C6.4 5.46667 6 7.2 6 9.06667C5.86667 14.6667 10.5333 19.2 16.1333 19.2Z" fill="#0C0A1A" />
          </svg>
        )}

      </button>
      <div className='container'>
        <article>
          <div className='glows'></div>
          <span className='header'>
            <img src="glow1.png" alt="glow" width={'100%'} />
          </span>
          <span className='badge'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
              <path fillRule='evenodd'
                d='M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z'
                clipRule='evenodd' />
            </svg>
            <span>Pointer tracking glows</span>
          </span>
          <h2>Muhammad,<br />Shahzaib</h2>
          <a href='https://github.com/MShahzaib3242/glowingborder.git' target="_blank">Get Code</a>
        </article>
        <article>
          <div className='glows'></div>
          <span className='header'>
            <img src="glow.png" alt="glow" width={'100%'} />
          </span>
          <span className='badge'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
              <path fillRule='evenodd'
                d='M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z'
                clipRule='evenodd' />
            </svg>
            <span>Pointer tracking glows</span>
          </span>
          <h2>Created By,<br />React Js, CSS</h2>
          <a href='https://github.com/MShahzaib3242/glowingborder.git' target="_blank">Get Code</a>
        </article>

      </div>
    </div>
  );
}

export default App;
