import { Info, Shield, TrendingUp, Users, Award } from "lucide-react"
import "../../styles/about.css"

export default function About() {
  return (
    <div className="container">
      <div className="about-header">
        <h1 className="about-title">About Factify</h1>
        <p className="about-description">
          Our mission is to combat misinformation and help people make informed decisions by verifying news from trusted
          sources.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card primary">
          <div className="about-card-header">
            <div className="about-icon-container primary">
              <Info className="about-icon primary" />
            </div>
            <h2 className="about-card-title">Our Mission</h2>
          </div>
          <p className="about-card-text">
            Factify was created with a clear purpose: to empower people to verify the authenticity of news in a world flooded with misinformation. We believe that using AI to promote truth and transparency is key to building a more informed and responsible society.
          </p>
        </div>

        <div className="about-card green">
          <div className="about-card-header">
            <div className="about-icon-container green">
              <Shield className="about-icon green" />
            </div>
            <h2 className="about-card-title">Our Technology</h2>
          </div>
          <p className="about-card-text">
          We use advanced web scraping and natural language processing to analyze news articles. By leveraging transfer learning models and word embedding techniques, we’ve built a powerful system capable of detecting the authenticity of news with high accuracy.
          </p>
        </div>

        <div className="about-card purple">
          <div className="about-card-header">
            <div className="about-icon-container purple">
              <TrendingUp className="about-icon purple" />
            </div>
            <h2 className="about-card-title">Our Impact</h2>
          </div>
          <p className="about-card-text">
            Since our launch, we've helped thousands of users verify news articles before sharing them. Our goal is to
            reduce the spread of misinformation and promote media literacy across all demographics.
          </p>
        </div>

        <div className="about-card orange">
          <div className="about-card-header">
            <div className="about-icon-container orange">
              <Users className="about-icon orange" />
            </div>
            <h2 className="about-card-title">Our Team</h2>
          </div>
          <p className="about-card-text">
          Our team of three software engineers, alongside experts in AI and information security, is dedicated to promoting truth in news. We combine our technical skills and commitment to transparency to build a robust verification system.          </p>
        </div>
      </div>

      <div className="values-section">
        <div className="values-header">
          <div className="values-icon-container">
            <Award className="about-icon primary" />
          </div>
          <h2 className="values-title">Our Values</h2>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <h3 className="value-title">Accuracy</h3>
            <p className="value-text">
              We prioritize factual correctness and precision in all our verification processes.
            </p>
          </div>

          <div className="value-card">
            <h3 className="value-title">Transparency</h3>
            <p className="value-text">We are transparent about our methods and the limitations of our technology to ensure trust and clarity.</p>
          </div>

          <div className="value-card">
            <h3 className="value-title">Accessibility</h3>
            <p className="value-text">
              We believe verification tools should be available to everyone, regardless of technical expertise.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
