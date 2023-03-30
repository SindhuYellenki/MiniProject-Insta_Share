import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Header from '../Header'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {apiStatus: apiStatusConstant.initial, profileDetailsList: []}

  componentDidMount() {
    this.getProfileDetails()
  }

  onClickTryAgain = () => {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const profileDetails = {
        id: data.profile.id,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        posts: data.profile.posts,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        stories: data.profile.stories,
        userBio: data.profile.user_bio,
      }
      this.setState({
        apiStatus: apiStatusConstant.success,
        profileDetailsList: profileDetails,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={25} width={25} />
    </div>
  )

  renderFailure = () => (
    <div className="failureView">
      <img
        src="https://res.cloudinary.com/dcnvnz3bk/image/upload/v1679840799/Group_7522_t5hyml.png"
        alt="failure view"
        className="failureImage"
      />
      <p className="failureText">Something went wrong. Please try again</p>
      <button
        type="button"
        onClick={this.onClickTryAgain}
        className="RetryButton"
      >
        Try Again
      </button>
    </div>
  )

  renderSuccess = () => {
    const {profileDetailsList} = this.state
    const {
      userId,
      userName,
      userBio,
      followersCount,
      followingCount,
      posts,
      postsCount,
      profilePic,
      stories,
    } = profileDetailsList
    return (
      <div className="user-profile-posts-container">
        <div className="profile-mobile-details">
          <h1 className="profile-username">{userName}</h1>
          <div className="profile-mobile-header">
            <img src={profilePic} alt="user profile" className="profile-pic" />
            <ul className="profile-mobile-stats">
              <li className="profile-list-item">
                <span className="profile-span">{postsCount}</span>
                <br />
                posts
              </li>
              <li className="profile-list-item">
                <span className="profile-span">{followersCount}</span>
                <br />
                followers
              </li>
              <li className="profile-list-item">
                <span className="profile-span">{followingCount}</span>
                <br />
                following
              </li>
            </ul>
          </div>
          <p className="profile-userid">{userId}</p>
          <p className="profile-userbio">{userBio}</p>
        </div>
        <div className="profile-header">
          <img src={profilePic} alt="my profile" className="profile-pic" />
          <div className="profile-details-container">
            <h1 className="profile-username">{userName}</h1>
            <div className="profile-details-list">
              <p className="profile-list-item">
                <span className="profile-span">{postsCount}</span> posts
              </p>
              <p className="profile-list-item">
                <span className="profile-span">{followersCount}</span> followers
              </p>
              <p className="profile-list-item">
                <span className="profile-span">{followingCount}</span> following
              </p>
            </div>
            <p className="profile-userid">{userId}</p>
            <p className="profile-user-bio">{userBio}</p>
          </div>
        </div>
        <ul className="profile-stories-container">
          {stories.map(each => (
            <li className="profile-story-item" key={each.id}>
              <img
                src={each.image}
                alt="my story"
                className="profile-story-image"
              />
            </li>
          ))}
        </ul>
        <hr />
        <div className="profile-posts-header">
          <BsGrid3X3 className="profile-grid-icon" />
          <h1 className="profile-posts-heading">Posts</h1>
        </div>
        {postsCount > 0 ? (
          <ul className="profile-posts-container">
            {posts.map(eachPost => (
              <li className="profile-post-item" key={eachPost.id}>
                <img
                  src={eachPost.image}
                  alt="my post"
                  className="profile-post-image"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="profile-no-posts-container">
            <BiCamera className="profile-camera-icon" />
            <h1 className="profile-no-posts-text">No Posts</h1>
          </div>
        )}
      </div>
    )
  }

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      case apiStatusConstant.success:
        return this.renderSuccess()
      case apiStatusConstant.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="user-profile-container">{this.renderViews()}</div>
      </>
    )
  }
}

export default MyProfile
