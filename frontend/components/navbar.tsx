
import Link from "next/link"
import "../styles/navbar.css"
import Image from 'next/image'
import logo from './logo_noir.png';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link href="/" className="navbar-logo">
            <Image src={logo} width={150} height={30} alt="factify"/>
        </Link>
        <nav className="navbar-menu">
          <div className="navbar-links">
            <Link href="/" className="navbar-link">
              Home
            </Link>
            <Link href="/about" className="navbar-link">
              About Us
            </Link>
            <Link href="/verify" className="navbar-link">
              Verify News
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
