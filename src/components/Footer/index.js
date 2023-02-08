import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <h1 className="footer-logo">
      COVID19<span className="india">INDIA</span>
    </h1>
    <p className="footer-para">
      We stand with everyone fighting on the front lines
    </p>
    <div className="footer-icons-container">
      <VscGithubAlt className="footer-icons" />
      <FiInstagram className="footer-icons" />
      <FaTwitter className="footer-icons" />
    </div>
  </footer>
)

export default Footer
