import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/pirateking/image/upload/v1675232962/NotFound_ysdfnp.svg"
      alt="not-found-pic"
      className="not-found-img"
    />
    <h1 className="not-found-head">page not found</h1>
    <p className="not-found-para">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <button type="button" className="not-found-button">
      <Link to="/" className="not-found-link">
        Home
      </Link>
    </button>
  </div>
)

export default NotFound
