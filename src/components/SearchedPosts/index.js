import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import InstaPostCard from '../InstaPostCard'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchedPosts extends Component {
  state = {
    searchedPostsList: [],
    apiStatus: apiStatusConstant.initial,
    searchValue: '',
  }

  componentDidMount() {
    const {searchValue} = this.props
    this.setState({searchValue}, this.getSearchedPostsList)
  }

  onClickTryAgain = () => {
    this.getSearchedPostsList()
  }

  getSearchedPostsList = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchValue} = this.state
    console.log(searchValue)
    const postsUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const postResponse = await fetch(postsUrl, options)
    if (postResponse.ok) {
      const postsData = await postResponse.json()
      const updatedPostsData = postsData.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postDetails: each.post_details,
        likesCount: each.likes_count,
        comments: each.comments,
      }))
      this.setState({
        apiStatus: apiStatusConstant.success,
        searchedPostsList: updatedPostsData,
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
    <div className="PostFailureView">
      <img
        src="https://res.cloudinary.com/dcnvnz3bk/image/upload/v1679840799/Group_7522_t5hyml.png"
        alt="failure view"
        className="PostFailureImage"
      />
      <p className="PostFailureText">Something went wrong. Please try again</p>
      <button
        type="button"
        onClick={this.onClickTryAgain}
        className="PostFailureRetry"
      >
        Try Again
      </button>
    </div>
  )

  renderSuccess = () => {
    const {searchedPostsList, searchValue} = this.state
    console.log(searchValue)

    if (searchedPostsList.length === 0) {
      return (
        <div className="noSearchResult">
          <img
            src="https://res.cloudinary.com/dcnvnz3bk/image/upload/v1679898768/Group_d0bvtl.png"
            alt="search not found"
            className="search-fail-image"
          />
          <h1 className="search-fail-heading">Search Not Found</h1>
          <p className="search-fail-para">
            Try different keyword or search again
          </p>
        </div>
      )
    }
    return (
      <>
        <h1 className="search-heading">Search Results</h1>
        <ul className="posts-main-container">
          {searchedPostsList.map(each => (
            <InstaPostCard details={each} key={each.postId} />
          ))}
        </ul>
      </>
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
    const {searchedPostsList} = this.state
    console.log(searchedPostsList)
    console.log('searchTriggered')
    return <div>{this.renderViews()}</div>
  }
}

export default SearchedPosts
