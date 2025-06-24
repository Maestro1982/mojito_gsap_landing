import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { cocktailLists, mockTailLists } from '../../constants';

const Cocktails = () => {
  useGSAP(() => {
    // Create a GSAP timeline linked to scroll behavior
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#cocktails', // Element that triggers the animation
        start: 'top 30%', // When the top of #cocktails hits 30% of the viewport height
        end: 'bottom 80%', // When the bottom hits 80%
        scrub: true, // Makes the animation tied to scroll position
      },
    });

    // Animate the left leaf: move in from bottom-left
    parallaxTimeline
      .from('#c-left-leaf', {
        x: -100, // Move 100px from the left
        y: 100, // Move 100px from the bottom
      })
      // Animate the right leaf: move in from bottom-right
      .from('#c-right-leaf', {
        x: 100, // Move 100px from the right
        y: 100, // Move 100px from the bottom
      });
  });
  return (
    <section id='cocktails'>
      <img src='/images/cocktail-left-leaf.png' alt='l-leaf' id='c-left-leaf' />
      <img
        src='/images/cocktail-right-leaf.png'
        alt='r-leaf'
        id='c-right-leaf'
      />

      <div className='list container mx-auto px-5 relative z-10 flex md:flex-row flex-col justify-between items-start gap-20 pt-40'>
        <div className='popular md:ml-18'>
          <h2>Most popular cocktails:</h2>
          <ul>
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className='md:me-28'>
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='popular md:mr-[0.75rem]'>
          <h2>Most loved mocktails:</h2>
          <ul>
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className='md:me-28'>
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default Cocktails;
