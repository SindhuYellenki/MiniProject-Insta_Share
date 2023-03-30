import {Component} from 'react'
import {GiHamburgerMenu, GiCancel} from 'react-icons/gi'
import {FaSearch} from 'react-icons/fa'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {hamburgerClicked: false, searchValue: '', searchBarClicked: false}

  onClickHamburger = () => {
    this.setState(p => ({
      hamburgerClicked: !p.hamburgerClicked,
    }))
  }

  onClickSearchBar = () => {
    this.setState(p => ({searchBarClicked: !p.searchBarClicked}))
  }

  onChangeSearch = event => {
    this.setState({searchValue: event.target.value})
  }

  onClickSearch = () => {
    const {searchValue} = this.state
    const {setSearchValue} = this.props
    setSearchValue(searchValue)
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickHamburgerCancel = () => {
    this.setState(p => ({hamburgerClicked: !p.hamburgerClicked}))
  }

  onClickSearchBarCancel = () => {
    this.setState(p => ({searchBarClicked: !p.searchBarClicked}))
  }

  renderNavbarOptions = () => (
    <>
      <Link to="/" className="linkStyle">
        <li className="smallNavbarItem">Home</li>
      </Link>
      <button
        type="button"
        onClick={this.onClickSearchBar}
        className="invisibleButton"
      >
        <li className="smallNavbarItem">Search</li>
      </button>
      <Link to="/my-profile" className="linkStyle">
        <li className="smallNavbarItem">Profile</li>
      </Link>
      <button type="button" className="Logout" onClick={this.onClickLogout}>
        Logout
      </button>
      <button
        type="button"
        onClick={this.onClickHamburgerCancel}
        className="invisibleButton"
      >
        <GiCancel />
      </button>
    </>
  )

  renderSearchBar = () => {
    const {searchValue} = this.state
    return (
      <>
        <div>
          <input
            type="search"
            className="search"
            placeholder="Search Caption"
            value={searchValue}
            onChange={this.onChangeSearch}
          />
          <button
            type="button"
            className="searchButton"
            onClick={this.onClickSearch}
          >
            <FaSearch className="searchIcon" />
          </button>
        </div>
        <button
          type="button"
          onClick={this.onClickSearchBarCancel}
          className="invisibleButton"
        >
          <GiCancel />
        </button>
      </>
    )
  }

  render() {
    const {hamburgerClicked, searchValue, searchBarClicked} = this.state
    return (
      <>
        <nav className="navbar navbar-expand-lg">
          <div className="navbar-sub-container">
            <ul className="logo-heading-con">
              <Link to="/">
                <li>
                  <img
                    src="https://res.cloudinary.com/dcnvnz3bk/image/upload/v1679639430/Standard_Collection_8_dzimas.png"
                    alt="website logo"
                    className="website-logo"
                  />
                </li>
              </Link>
              <li>
                <h1 className="nav-heading">Insta Share</h1>
              </li>
            </ul>
            <button
              className="ham-button"
              type="button"
              onClick={this.onClickHamburger}
            >
              <GiHamburgerMenu className="icon" />
            </button>
            <div className="desktop-tabs-con">
              <div className="desktop-search-container">
                <input
                  className="input-search"
                  onChange={this.onChangeSearch}
                  value={searchValue}
                  type="search"
                  placeholder="Search Caption"
                />
                <button
                  type="button"
                  className="search-button"
                  onClick={this.onClickSearch}
                >
                  <FaSearch className="search-icon" />
                </button>
              </div>
              <ul className="nav-tabs-con">
                <Link to="/" className="link">
                  <li>
                    <p className="tab">Home</p>
                  </li>
                </Link>
                <Link to="/my-profile" className="link">
                  <li>
                    <p className="tab">Profile</p>
                  </li>
                </Link>
                <li>
                  <button
                    className="logout-button"
                    type="button"
                    onClick={this.onClickLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {hamburgerClicked && (
          <ul className="tabs-con">
            <Link to="/" className="link">
              <li>
                <p className="tab">Home</p>
              </li>
            </Link>
            <li>
              <button
                type="button"
                className="search-tab-button"
                onClick={this.onClickSearchBar}
              >
                <p className="tab">Search</p>
              </button>
            </li>
            <Link to="/my-profile" className="link">
              <li>
                <p className="tab">Profile</p>
              </li>
            </Link>
            <li>
              <button
                className="logout-button"
                type="button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
            <button
              className="ham-button"
              type="button"
              onClick={this.onClickHamburgerCancel}
            >
              <GiCancel className="close-icon" />
            </button>
          </ul>
        )}
        {searchBarClicked && (
          <div className="search-container">
            <input
              className="input-search"
              onChange={this.onChangeSearch}
              value={searchValue}
              type="search"
              placeholder="Search Caption"
            />
            <button
              type="button"
              className="search-button"
              onClick={this.onClickSearch}
            >
              <FaSearch className="search-icon" />
            </button>
          </div>
        )}
      </>
    )
  }
}
export default withRouter(Header)
