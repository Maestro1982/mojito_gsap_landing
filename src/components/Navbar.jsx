import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useState } from 'react';

import { navLinks } from '../../constants';

const Navbar = () => {
  const [isActiveLink, setIsActiveLink] = useState('home');

  // Create a GSAP timeline with a ScrollTrigger
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: 'nav', // Trigger animation when the <nav> enters the viewport
        start: 'bottom top', // Start when bottom of nav hits top of the viewport
      },
    });

    // Animate the navbar background from transparent to semi-transparent black with blur
    navTween.fromTo(
      'nav',
      {
        backgroundColor: 'transparent', // Initial state
      },
      {
        backgroundColor: '#00000050', // Final background color with transparency
        backgroundFilter: 'blur(10px)', // Apply blur for glassy effect
        duration: 1, // Animation duration
        ease: 'power1.inOut', // Smooth easing
      }
    );

    // --- Highlight nav links based on scroll position ---
    navLinks.forEach((link) => {
      ScrollTrigger.create({
        trigger: `#${link.id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setIsActiveLink(link.id),
        onEnterBack: () => setIsActiveLink(link.id),
      });
    });
  }, []);

  return (
    <nav>
      <div>
        <a href='#home' className='flex items-center gap-2 cursor-pointer'>
          <img src='/images/logo.png' alt='logo' />
          <p className='hover:text-yellow-200'>The Alchemist</p>
        </a>

        <ul>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`hover:text-yellow-200 ${
                isActiveLink === link.id ? 'text-yellow-200 font-bold' : ''
              }`}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
