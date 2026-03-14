import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white mb-6">
          Skill
          <span className="text-accent">Launch</span>{' '}
          <span className="text-white">AI</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-10">
          Turn your skill into a micro-business in minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            type="button"
            className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-3"
            onClick={() => navigate('/login')}
          >
            Start for free<span aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 text-lg px-8 py-3 rounded-2xl border border-white/20 text-white hover:border-accent/60 hover:bg-white/5 transition-colors"
            onClick={() => navigate('/dashboard')}
          >
            <span>📊</span> Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}

export default Landing;

