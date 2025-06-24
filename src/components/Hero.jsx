import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const Hero = () => {
  const videoRef = useRef(); // Reference to control the video element via GSAP
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Responsive behavior check

  useGSAP(() => {
    // --- SplitText Animations ---

    // Splits h1 title into individual characters and words
    const heroSplit = new SplitText('.title', { type: 'chars, words' });

    // Splits paragraphs into lines for animation
    const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

    // Adds a gradient class to each character for styling
    heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

    // Animate the title characters upward into place
    gsap.from(heroSplit.chars, {
      yPercent: 100, // Start from below
      duration: 1.8,
      ease: 'expo.out', // Smooth, springy easing
      stagger: 0.05, // One by one
    });

    // Animate subtitle lines with a fade and upward movement
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.05,
      delay: 1, // After the title finishes
    });

    // --- Parallax Scrolling Leaves ---
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#hero', // Start watching when the hero section enters
          start: 'top top', // As soon as top of hero hits top of viewport
          end: 'bottom top', // Until the bottom of hero reaches top of viewport
          scrub: true, // Tie animation to scroll
        },
      })
      .to('.right-leaf', { y: 200 }, 0) // Move right leaf down
      .to('.left-leaf', { y: -200 }, 0); // Move left leaf up (opposite direction)

    // --- Scroll-Controlled Video Playback ---
    const startValue = isMobile ? 'top 50%' : 'center 60%';
    const endValue = isMobile ? '120% top' : 'bottom top';

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'video', // Trigger animation when video enters view
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true, // Pin the video during this scroll section
      },
    });

    // Animate video playback from 0 to end as user scrolls
    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };
  }, []);

  return (
    <>
      <section id='hero' className='relative'>
        <h1 className='title'>Gin Tonic</h1>

        {/* Parallax leaves */}
        <img
          src='/images/hero-left-leaf.png'
          alt='left-leaf'
          className='left-leaf'
        />
        <img
          src='/images/hero-right-leaf.png'
          alt='right-leaf'
          className='right-leaf'
        />
        {/* Text content */}
        <div className='body'>
          <div className='content'>
            <div className='hidden space-y-5 md:block'>
              <p>Cool. Crips. Classic</p>
              <p className='subtitle'>
                Sip the Spirit <br /> of Summer
              </p>
            </div>
            <div className='view-cocktails'>
              <p className='subtitle'>
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href='#cocktails'>View Cocktails</a>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll-pinned video with synced playback */}
      <div className='video absolute inset-0'>
        <video
          ref={videoRef}
          src='/videos/output.mp4'
          muted
          playsInline
          preload='auto'
        />
      </div>
    </>
  );
};

export default Hero;
