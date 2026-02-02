import { useState, useRef, useEffect } from "react";
import "./App.css";
import myPhoto from './assets/Us.jpeg';


export default function App() {
  const [yesClicked, setYesClicked] = useState(false);
  const noBtnRef = useRef(null);

  const moveNoButton = () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 200 - 100;
    noBtnRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  return (
    <div className="container">
      {!yesClicked && (
        <>
          <h1>Hey! Megha, will you be my Valentine? 💖</h1>

          <div className="buttons">
            <button className="yes-btn" onClick={() => setYesClicked(true)}>
              ❤️ YES
            </button>

            <button
              ref={noBtnRef}
              className="no-btn"
              onMouseEnter={moveNoButton}
            >
              🖤 NO
            </button>
          </div>
        </>
      )}

      {yesClicked && (
        <>
          <Fireworks />
          <div className="popup">
            <h2>Thank you baby, I knew you will accept my proposal! 💕</h2>

            {/* <img src={myPhoto} alt="Description of the photo" /> */}

            <img
              src={myPhoto}
              alt="Our Memory"
              className="memory-img"
            />
          </div>
        </>
      )}
    </div>
  );
}

/* 🔥 REAL CANVAS FIREWORKS */
function Fireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let fireworks = [];

    class Firework {
      constructor(x, y) {
        this.particles = [];
        for (let i = 0; i < 60; i++) {
          this.particles.push({
            x,
            y,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 5 + 2,
            alpha: 1
          });
        }
      }

      update() {
        this.particles.forEach(p => {
          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed;
          p.alpha -= 0.02;
        });
      }

      draw(ctx) {
        this.particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 0, 100, ${p.alpha})`;
          ctx.fill();
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fireworks.forEach((fw, i) => {
        fw.update();
        fw.draw(ctx);
        if (fw.particles[0].alpha <= 0) fireworks.splice(i, 1);
      });
      requestAnimationFrame(animate);
    }

    const interval = setInterval(() => {
      fireworks.push(
        new Firework(
          Math.random() * canvas.width,
          Math.random() * canvas.height * 0.6
        )
      );
    }, 700);

    animate();

    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fireworks-canvas" />;
}
