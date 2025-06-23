import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const Hero = () => {
  const videoRef = useRef();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText('.title', { type: 'chars, words' });
    const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

    heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.05,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.05,
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      .to('.right-leaf', { y: 200 }, 0)
      .to('.left-leaf', { y: -200 }, 0);

    const startValue = isMobile ? 'top 50%' : 'center 60%';
    const endValue = isMobile ? '120% top' : 'bottom top';

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'video',
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    // Safely hook into video loaded metadata
    if (videoRef.current) {
      // Reset video to start at 0 before animating
      videoRef.current.currentTime = 0;
      if (videoRef.current.readyState >= 1) {
        // Metadata already loaded
        tl.to(videoRef.current, {
          currentTime: videoRef.current.duration,
        });
      } else {
        videoRef.current.onloadedmetadata = () => {
          tl.to(videoRef.current, {
            currentTime: videoRef.current.duration,
            ease: 'none',
          });
        };
      }
    }
  }, []);

  return (
    <>
      <section id='hero' className='relative'>
        <h1 className='title'>Gin Tonic</h1>

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
