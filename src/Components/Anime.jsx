// App.jsx
import { useEffect, useRef } from 'react';
// import animate from 'animejs';/

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generatePoints = () => {
  const total = randomInt(6, 16); 
  const r1 = randomInt(30, 70);  
  const r2 = 80;                 
  const cx = 150, cy = 150;    
  let points = '';

  for (let i = 0; i < total; i++) {
    const radius = i % 2 === 0 ? r2 : r1;
    const angle = (Math.PI * 2 * i) / total;
    const x = cx + Math.round(radius * Math.cos(angle));
    const y = cy + Math.round(radius * Math.sin(angle));
    points += `${x},${y} `;
  }

  return points.trim();
};

const Anime = () => {
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);

  useEffect(() => {
    const animateRandomPoints = () => {
      const points = generatePoints();
      path2Ref.current.setAttribute('points', points);

    //   anime({
    //     targets: path1Ref.current,
    //     points: [
    //       { value: points }
    //     ],
    //     easing: 'easeInOutCirc',
    //     duration: 800,
    //     complete: animateRandomPoints,
    //   });
    };

    animateRandomPoints(); 
  }, []);

  return (
    <div className="">
      <svg width="500" height="500" viewBox="0 0 300 300">
        <polygon
          ref={path1Ref}
          fill="#00FFAA"
          stroke="#fff"
          strokeWidth="2"
          points="150,60 190,140 110,140"
        />
        <polygon
          ref={path2Ref}
          fill="#ffffff"
          stroke="none"
          points=""
          style={{ display: 'none' }} 
        />
      </svg>
    </div>
  );
};

export default Anime;
