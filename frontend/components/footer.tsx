import Link from "next/link"
import "../styles/footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-title">Factify</h3>
            <p className="footer-text">Helping you distinguish fact from fiction in the digital age</p>
          </div>

          <div>
            <h3 className="footer-subtitle">Links</h3>
            <ul className="footer-links">
              <li>
                <Link href="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/verify" className="footer-link">
                  Verify News
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-subtitle">Contact</h3>
            <p className="footer-text">Have questions or feedback?</p>
            <p className="footer-text">contact@factify.com</p>

          </div>
        </div>

        <div className="footer-divider">
          <p>© 2025 Factify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
