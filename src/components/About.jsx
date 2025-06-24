import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';

const About = () => {
  useGSAP(() => {
    // --- Split and animate the title text ---

    // Split the <h2> inside #about into individual words
    const titleSplit = SplitText.create('#about h2', {
      type: 'words',
    });

    // --- Scroll-triggered timeline animation setup ---

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#about', // Start animation when #about enters view
        start: 'top center', // Trigger point: top of #about hits center of viewport
      },
    });

    scrollTimeline
      // Animate each word in the title
      .from(titleSplit.words, {
        opacity: 0, // Start invisible
        yPercent: 100, // Slide up into place
        duration: 1,
        ease: 'expo.out',
        stagger: 0.02, // Small delay between each word
      })
      // Animate all image containers in both top and bottom grids
      .from(
        '.top-grid div, .bottom-grid div',
        {
          opacity: 0, // Fade in
          duration: 1,
          ease: 'power1.inOut',
          stagger: 0.04, // Each grid item appears one after another
        },
        '-=0.5' // Overlap with the previous animation slightly
      );
  });
  return (
    <div id='about'>
      <div className='mb-16 md:px-0 px-5'>
        <div className='content'>
          <div className='col-span-8'>
            <p className='badge'>Best Cocktails</p>
            <h2>
              Where every details matters <span className='text-white'>-</span>{' '}
              from muddles to garnish
            </h2>
          </div>
          <div className='sub-content'>
            <p>
              Every cocktail we serve is a reflection of our obsession with
              detail — from the first muddle to the final garnish. That care is
              what turns a simple drink into something truly memorable.
            </p>

            <div>
              <p className='text-xl md:text-2xl font-bold'>
                <span>4.5</span>/5
              </p>
              <p className='text-sm text-white-100'>
                More than +10000 customers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='top-grid'>
        <div className='md:col-span-3'>
          <img src='/images/abt1.png' alt='grid-img-1' />
        </div>
        <div className='md:col-span-6'>
          <img src='/images/abt2.png' alt='grid-img-2' />
        </div>
        <div className='md:col-span-3'>
          <img src='/images/abt5.png' alt='grid-img-5' />
        </div>
      </div>

      <div className='bottom-grid'>
        <div className='md:col-span-8'>
          <img src='/images/abt3.png' alt='grid-img-3' />
        </div>
        <div className='md:col-span-4'>
          <img src='/images/abt4.png' alt='grid-img-4' />
        </div>
      </div>
    </div>
  );
};
export default About;
