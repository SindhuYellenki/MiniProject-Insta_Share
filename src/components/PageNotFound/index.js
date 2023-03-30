import {Link} from 'react-router-dom'
import './index.css'

const PageNotFound = () => (
  <div className="pageNotFound">
    <img
      src="https://res.cloudinary.com/dcnvnz3bk/image/upload/v1679898296/erroring_1_lwweru.png"
      alt="page not found"
      className="page-not-found"
    />
    <h1 className="notFoundHeading">Page Not Found</h1>
    <p className="notFoundPara">
      we are sorry, the page you requested could not be Found.
    </p>
    <p className="notFoundPara">Please go back to the homepage</p>
    <Link to="/">
      <button type="button" className="notFoundButton">
        Home Page
      </button>
    </Link>
  </div>
)
export default PageNotFound
