// src/components/custom/Layout.jsx
import { useEffect } from "react";

const Layout = ({ children }) => {
  useEffect(() => {
    const stars = document.querySelectorAll(".float-object");
    stars.forEach((el) => {
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      const delay = Math.random() * 5;

      el.style.left = `${randomX}%`;
      el.style.top = `${randomY}%`;
      el.style.animationDelay = `${delay}s`;
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-200 via-yellow-100 to-lime-50 overflow-hidden animate-backgroundShift">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="float-object absolute text-white text-2xl animate-float transition-all duration-1000"
          >
            ✈️
          </span>
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={`sun-${i}`}
            className="float-object absolute text-yellow-400 text-3xl animate-float-slow"
          >
            🌞
          </span>
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={`wave-${i}`}
            className="float-object absolute text-blue-400 text-xl animate-float-fast"
          >
            🌊
          </span>
        ))}
      </div>

      <div className="relative z-10 backdrop-blur-md bg-white/40 min-h-screen p-4 md:p-8 rounded-xl shadow-md">
        {children}
      </div>
    </div>
  );
};

export default Layout;
