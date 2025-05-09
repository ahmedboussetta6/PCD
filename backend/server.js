import express from "express";
import cors from "cors";
import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration
const SUPPORTED_NEWS_SOURCES = [
  { 
    domains: ["bbc.co.uk", "bbc.com"], 
    selector: "h1", 
    name: "BBC News" 
  },
  { 
    domains: ["cnn.com"], 
    selector: ".headline__text", 
    name: "CNN" 
  },
  { 
    domains: ["aljazeera.com"], 
    selector: ".article-header h1", 
    name: "Al Jazeera" 
  },
  { 
    domains: ["news.sky.com"], 
    selector: ".sdc-article-header__long-title", 
    name: "Sky News" 
  },
  { 
    domains: ["theguardian.com"], 
    selector: ".dcr-cohhs3 h1", 
    name: "The Guardian" 
  },
  { 
    domains: ["nbcnews.com"], 
    selector: ".article-hero-headline__htag", 
    name: "NBC News" 
  },
  { 
    domains: ["time.com"], 
    selector: ".font-editorial", 
    name: "Time" 
  },
  { 
    domains: ["independent.co.uk"], 
    selector: ".sc-1xt8011-0", 
    name: "The Independent" 
  },
  { 
    domains: ["telegraph.co.uk"], 
    selector: ".e-headline", 
    name: "The Telegraph" 
  },
  { 
    domains: ["npr.org"], 
    selector: ".storytitle", 
    name: "NPR" 
  },
  { 
    domains: ["theconversation.com"], 
    selector: ".legacy strong", 
    name: "The Conversation" 
  },
  { 
    domains: ["newscientist.com"], 
    selector: ".ArticleHeader__Heading", 
    name: "New Scientist" 
  },
  { 
    domains: ["scientificamerican.com"], 
    selector: ".article_hed-9vUZD p", 
    name: "Scientific American" 
  },
  { 
    domains: ["engadget.com"], 
    selector: "#caas-lead-header-undefined", 
    name: "Engadget" 
  }
];

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Fake News Detection API is running");
});

// Verify News URL
app.post("/api/verify", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Check if URL is from a supported news source
    const newsSource = SUPPORTED_NEWS_SOURCES.find(source =>
      source.domains.some(domain => url.includes(domain))
    );

    if (!newsSource) {
      const supportedSources = SUPPORTED_NEWS_SOURCES.map(s => s.name).join(", ");
      return res.status(400).json({ 
        error: `Unsupported news source. Currently supported: ${supportedSources}` 
      });
    }

    // Fetch the webpage content
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000 // 10 seconds timeout
    });
    
    const html = response.data;

    // Use cheerio to parse the HTML
    const $ = cheerio.load(html);
    let title = $(newsSource.selector).first().text().trim();

    if (!title) {
      // Fallback to more generic selectors if primary fails
      title = $("h1").first().text().trim() || 
              $("title").first().text().trim();
    }

    if (!title) {
      return res.status(404).json({ 
        error: "Could not extract title from the provided URL",
        suggestion: "The website structure might have changed. Please report this issue."
      });
    }

    // Return the extracted title and source
    return res.json({ 
      title, 
      source: newsSource.name,
      url
    });

  } catch (error) {
    console.error("Error verifying URL:", error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        return res.status(error.response.status).json({ 
          error: `Failed to fetch URL: ${error.response.statusText}` 
        });
      } else if (error.request) {
        // The request was made but no response was received
        return res.status(504).json({ 
          error: "No response received from the news website" 
        });
      }
    }

    return res.status(500).json({ 
      error: "An error occurred while verifying the URL",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});