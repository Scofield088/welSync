import React from 'react';
import Hero from '../component/home/Hero';
import About from '../component/home/About';
import Features from '../component/home/Features';
import Physical from '../component/home/Physical';
import Contact from '../component/home/Contact';
import Footer from '../component/home/Footer';
import Dictaphone from '../Dictaphone';



function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
    <Hero />
    <Features />
    <Physical />
    <About />
    <Contact />
    <Footer />
    <Dictaphone/>
  </main>
  );
}

export default Home;
