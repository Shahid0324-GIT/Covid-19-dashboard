// React Component and Link
import {Component} from 'react'
import {Link} from 'react-router-dom'

/* React-Icons for mobile-view */
import {MdOutlineMenuOpen} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'

/* CSS for styles */
import './index.css'

class Navbar extends Component {
  state = {
    mobileNav: false,
  }

  onToggleMenu = () => {
    this.setState(prevState => ({
      mobileNav: !prevState.mobileNav,
    }))
  }

  render() {
    const {mobileNav} = this.state
    // console.log(mobileNav)

    return (
      <>
        <ul className="navbar">
          <Link to="/" className="link-item">
            <li className="logo-name">
              COVID19 <span className="india">India</span>
            </li>
          </Link>

          <ul className="menu-large">
            <li>
              <Link to="/" className="link-item">
                <button type="button" className="to-link">
                  Home
                </button>
              </Link>
            </li>
            <li>
              <Link to="/about" className="link-item">
                <button type="button" className="to-link">
                  About
                </button>
              </Link>
            </li>
          </ul>
          <div className="menu-small">
            <button
              onClick={this.onToggleMenu}
              type="button"
              className="menu-button"
            >
              <MdOutlineMenuOpen className="toggle-menu" />
            </button>
          </div>
        </ul>
        {mobileNav && (
          <>
            <div className="mobile-view">
              <div>
                <Link to="/" className="link-item">
                  <button type="button" className="to-link">
                    Home
                  </button>
                </Link>
                <Link to="/about" className="link-item">
                  <button type="button" className="to-link">
                    About
                  </button>
                </Link>
              </div>
              <button
                onClick={this.onToggleMenu}
                type="button"
                className="menu-button"
              >
                <AiFillCloseCircle className="close-icon" />
              </button>
            </div>
          </>
        )}
      </>
    )
  }
}

export default Navbar
