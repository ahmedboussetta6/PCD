'use client';
import Image from 'next/image'
import newspaper from './newspaper.png';

//import logos
import engadget from './images/engadget-removebg-preview.png'
import npr from './images/National_Public_Radio_logo.png'
import nbc from './images/nbcnews-removebg-preview.png'
import newsc from './images/newsc-removebg-preview.png'
import sciam from './images/sciam-removebg-preview.png'
import guardian from './images/the_guardian-removebg-preview.png'
import telegraph from './images/the_telegraph-removebg-preview.png'
import conversation from './images/theconv.png'
import time from './images/time.png'
import independent from './images/The-Independent_White-997x294.png'
import bbc from './images/bbc-logo.jpg-removebg-preview.png'
import skynews from './images/Sky-news-logo.svg.png'
import cnn from './images/CNN.svg.webp';
import aljazira from './images/Al_Jazeera.svg.webp';

import Link from "next/link"
import { ArrowRight, CheckCircle, AlertTriangle, Search } from "lucide-react"
import "../styles/home.css"
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
  return (
    <div className="container">
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">
                  <TypeAnimation
                      sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Verify Before You Share',
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                        'Truth Matters Verify First',
                        1000,
                        'Check The Facts Before You Click',
                        1000,
                        'Protect Your Feed From Fake News',
                        1000
                      ]}
                      wrapper="span"
                      speed={50}
                      style={{ fontSize: '1em', display: 'inline-block' }}
                      repeat={Infinity}
                  />
              </h1>
            <p className="hero-text">
              In an era of information overload, Factify helps you distinguish fact from fiction with our advanced
              news verification technology.
            </p>
            <div className="hero-buttons">
              <Link href="/verify" className="button-primary">
                Verify News Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/about" className="button-secondary">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-image-container">
            <Image src={newspaper} width={600} height={450} alt="newspaper image"/>
          </div>
        </div>
      </section>

   <br />
      <section className='hero-section'>
          <div className='features-header'>
              <h2 className="features-title">Supported News Sources</h2>
              <p className='features-description'>Our system can currently detect fake news from the following English news websites:</p>
              <div className='logos'>
                <div className='logos-slide'>
                  <Image src={aljazira} width={100} height={100} alt="aljazira image"/>
                  <Image src={cnn} width={100} height={70} alt="cnn image"/>
                  <Image src={skynews}width={150} height={60} alt="skynews image"/>
                  <Image src={npr}width={150} height={60} alt="npr image" />
                  <Image src={time}width={100} height={45} alt="time news image"/>
                  <Image src={conversation} width={200} height={60}alt="the conversation image"/>
                  <Image src={independent}width={200} height={90} alt="the independent image"/>
                  <Image src={sciam} width={110} height={110}alt="sciam image"/>
                  <Image src={newsc} width={150} height={150}alt="newsc image"/>
                  <Image src={engadget} width={200} height={150}alt="engadget image"/>
                  <Image src={bbc} width={220} height={140}alt="bbc image"/>
                  <Image src={guardian} width={160} height={100}alt="the guardian image"/>
                  <Image src={nbc} width={150} height={150}alt="nbc image"/>
                  <Image src={telegraph} width={250} height={150}alt="the telegraph image"/>
                </div>
                <div className='logos-slide'>
                  <Image src={aljazira} width={100} height={100} alt="aljazira image"/>
                  <Image src={cnn} width={100} height={70} alt="cnn image"/>
                  <Image src={skynews}width={150} height={60} alt="skynews image"/>
                  <Image src={npr}width={150} height={60} alt="npr image" />
                  <Image src={time}width={100} height={45} alt="time news image"/>
                  <Image src={conversation} width={200} height={60}alt="the conversation image"/>
                  <Image src={independent}width={200} height={90} alt="the independent image"/>
                  <Image src={sciam} width={110} height={110}alt="sciam image"/>
                  <Image src={newsc} width={150} height={150}alt="newsc image"/>
                  <Image src={engadget} width={200} height={150}alt="engadget image"/>
                  <Image src={bbc} width={220} height={140}alt="bbc image"/>
                  <Image src={guardian} width={160} height={100}alt="the guardian image"/>
                  <Image src={nbc} width={150} height={150}alt="nbc image"/>
                  <Image src={telegraph} width={250} height={150}alt="the telegraph image"/>
                </div>
              </div>
          </div>
      </section>
      <section className="features-section">
        <div className="features-header">
          <h2 className="features-title">How It Works</h2>
          <p className="features-description">
          Our platform leverages advanced AI algorithms and real-time web scraping to analyze news articles and check their authenticity.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-container">
              <Search className="feature-icon" />
            </div>
            <h3 className="feature-title">Input URL</h3>
            <p className="feature-text">Enter a supported news URL into our verification tool to check its authenticity</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-container">
              <CheckCircle className="feature-icon" />
            </div>
            <h3 className="feature-title">Analyze Content</h3>
            <p className="feature-text">Our system processes the article and classifies it as either real or fake, based on its analysis</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-container">
              <AlertTriangle className="feature-icon" />
            </div>
            <h3 className="feature-title">Get Results</h3>
            <p className="feature-text">Receive instant verification results and credibility assessment</p>
          </div>
        </div>
      </section>

    </div>
  )
}
