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

class InstaPost extends Component {
  state = {
    postsList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getPosts()
  }

  onClickTryAgain = () => {
    this.getPosts()
  }

  getPosts = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const postsUrl = 'https://apis.ccbp.in/insta-share/posts'
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
        createdAt: each.created_at,
      }))
      this.setState({
        apiStatus: apiStatusConstant.success,
        postsList: updatedPostsData,
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
      <p className="PostFailureText">Something went wrong.Please try again</p>
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
    const {postsList} = this.state
    return (
      <ul className="posts-main-container">
        {postsList.map(each => (
          <InstaPostCard details={each} key={each.postId} />
        ))}
      </ul>
    )
  }

  render() {
    const {apiStatus} = this.state
    console.log('PostTriggered')
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
}

export default InstaPost
