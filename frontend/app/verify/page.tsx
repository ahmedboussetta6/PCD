"use client";

import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import "../../styles/verify.css";

export default function Verify() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<{ prediction: string; confidence?: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    // Check if URL is from supported news sources
    const supportedDomains = [
      "bbc.co.uk", "bbc.com",
      "cnn.com",
      "aljazeera.com",
      "news.sky.com",
      "theguardian.com",
      "nbcnews.com",
      "time.com",
      "independent.co.uk",
      "telegraph.co.uk",
      "npr.org",
      "theconversation.com",
      "newscientist.com",
      "scientificamerican.com",
      "engadget.com"
    ];

    const isSupported = supportedDomains.some(domain => url.includes(domain));

    if (!isSupported) {
      setError("This news source is not supported by our system yet. Please enter a valid news URL");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Step 1: Fetch the title from the scraping backend
      const scrapeResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      if (!scrapeResponse.ok) {
        throw new Error(`Failed to fetch article title: ${scrapeResponse.statusText}`);
      }

      const scrapeData = await scrapeResponse.json();

      if (!scrapeData.title) {
        throw new Error("No title found in the scraped data");
      }

      // Step 2: Pass the title to the AI model for prediction
      const aiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}/predict`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: scrapeData.title }),
        }
      );

      if (!aiResponse.ok) {
        throw new Error(`Failed to get AI prediction: ${aiResponse.statusText}`);
      }

      const aiData = await aiResponse.json();

      if (!aiData.prediction) {
        throw new Error("No prediction returned from AI model");
      }

      // Step 3: Update the result
      setResult({ 
        prediction: aiData.prediction, 
        confidence: aiData.confidence 
      });

    } catch (err: any) {
      setError(err.message || "An error occurred while processing the URL. Please try again.");
      console.error("Error details:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="verify-header">
        <h1 className="verify-title">Verify News Article</h1>
        <p className="verify-description">
          Enter a news URL from a supported source below to verify its authenticity.
        </p>
      </div>

      <div className="verify-form-container">
        <form onSubmit={handleSubmit} className="verify-form">
          <label htmlFor="url" className="sr-only">
            News URL
          </label>
          <input
            type="url"
            id="url"
            className="verify-input"
            placeholder="Enter news URL (e.g., https://www.bbc.com/news/...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit" disabled={loading} className="verify-button">
            {loading ? (
              <>
                <Loader2 className="verify-button-icon animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Search className="verify-button-icon" />
                Verify
              </>
            )}
          </button>
        </form>
        {error && <p className="verify-error">{error}</p>}
      </div>

      {result && (
        <div
          className={`verify-result ${
            result.prediction === "True" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <h2>Prediction</h2>
          <div className="verify-result-content">
            <p className="verify-result-text text-white">
              {result.prediction === "True"
                ? "Our system detected this article as Real with a confidence of: "
                : "Our system detected this article as Fake with a confidence of: "}
              {(result.confidence * 100).toFixed(3)}%
            </p>
          </div>
        </div>
      )}

      <div className="verify-help">
        <h2 className="verify-help-title">How to Use This Tool</h2>
        <ol className="verify-help-list">
          <li>Find a news article from a supported source you want to verify</li>
          <li>Copy the complete URL from your browser's address bar</li>
          <li>Paste the URL in the input field above</li>
          <li>Click the "Verify" button to analyze the article</li>
          <li>Review the prediction result (Real or Fake)</li>
        </ol>
      </div>
      <br /> <br />
    </div>
  );
}