import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { sliderLists } from '../../constants';

const Menu = () => {
  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  // GSAP animations for title, image, text, and parallax leaves
  useGSAP(() => {
    // Fade in title
    gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });

    // Slide-in animation for image
    gsap.fromTo(
      '.cocktail img',
      { opacity: 0, xPercent: -100 },
      { xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut' }
    );

    // Slide-up text animations
    gsap.fromTo(
      '.details h2',
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 100, ease: 'power1.inOut' }
    );
    gsap.fromTo(
      '.details p',
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 100, ease: 'power1.inOut' }
    );

    // Enhanced parallax animation for leaves
    const distance = 150; // Moderate parallax movement
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#menu',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.4, // Smooth following
        },
      })
      .to(
        '#m-left-leaf',
        {
          y: -distance,
          ease: 'none',
        },
        0
      )
      .to(
        '#m-right-leaf',
        {
          y: distance,
          ease: 'none',
        },
        0
      );
  }, [currentIndex]);

  // Total number of cocktails
  const totalCocktails = sliderLists.length;

  // Circular navigation for slider
  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);
  };

  // Get cocktail by index offset (e.g. -1 for previous, 0 for current, 1 for next)
  const getCocktailAt = (indexOffset) => {
    return sliderLists[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailAt(0);
  const previousCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  return (
    <section id='menu' aria-labelledby='menu-heading'>
      <img
        src='/images/slider-left-leaf.png'
        alt='left-leaf'
        id='m-left-leaf'
        style={{ willChange: 'transform' }}
      />
      <img
        src='/images/slider-right-leaf.png'
        alt='right-leaf'
        id='m-right-leaf'
        style={{ willChange: 'transform' }}
      />

      <h2 id='menu-heading' className='sr-only'>
        Cocktail Menu
      </h2>

      <nav className='cocktail-tabs' aria-label='Cocktail Navigation'>
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`${
                isActive
                  ? 'text-white border-white'
                  : 'text-white/50 border-white/50'
              }`}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className='content'>
        <div className='arrows'>
          <button
            className='text-left cursor-pointer'
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{previousCocktail.name}</span>
            <img
              src='/images/right-arrow.png'
              alt='right-arrow'
              aria-hidden='true'
            />
          </button>
          <button
            className='text-left cursor-pointer'
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextCocktail.name}</span>
            <img
              src='/images/left-arrow.png'
              alt='left-arrow'
              aria-hidden='true'
            />
          </button>
        </div>

        <div className='cocktail'>
          <img
            src={currentCocktail.image}
            alt='cocktail image'
            className='object-contain'
          />
        </div>

        <div className='recipe'>
          <div ref={contentRef} className='info'>
            <p className='text-white font-bold'>Recipe for:</p>
            <p id='title'>{currentCocktail.name}</p>
          </div>
          <div className='details'>
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Menu;
