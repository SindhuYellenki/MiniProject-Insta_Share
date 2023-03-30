import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class InstaPostCard extends Component {
  state = {isLiked: false, likeCount: 0}

  componentDidMount() {
    const {details} = this.props
    const {likesCount} = details
    this.setState({likeCount: likesCount})
  }

  onClickHeart = async () => {
    const {isLiked} = this.state
    const {details} = this.props
    const {postId} = details
    const jwtToken = Cookies.get('jwt_token')
    const likePostUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const data = {like_status: isLiked}
    const options = {
      method: 'POST',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(likePostUrl, options)
    const likeData = await response.json()
    console.log(likeData)
  }

  onClickLikeIncreaseButton = () => {
    this.setState(p => ({likeCount: p.likeCount + 1}))
    this.setState({isLiked: true}, this.onClickHeart)
  }

  onClickLikeDecreaseButton = () => {
    this.setState(p => ({likeCount: p.likeCount - 1}))
    this.setState({isLiked: false}, this.onClickHeart)
  }

  render() {
    const {isLiked, likeCount} = this.state
    const {details} = this.props
    const {
      userId,
      userName,
      profilePic,
      postDetails,
      comments,
      createdAt,
    } = details
    const updatedPostDetails = {
      caption: postDetails.caption,
      imageUrl: postDetails.image_url,
    }
    const {caption, imageUrl} = updatedPostDetails
    return (
      <li className="PostCardContainer">
        <div className="profilePic-name-container">
          <Link to={`/users/${userId}`} className="link">
            <img
              src={profilePic}
              alt="post author profile"
              className="postCard-ProfilePic"
            />
          </Link>
          <h1 className="postCard-userName">{userName}</h1>
        </div>
        <img src={imageUrl} alt="post" className="postCardImage" />
        <div className="desktop-styling-posts">
          <div className="reactionsContainer">
            {isLiked ? (
              <button
                type="button"
                className="likeButton"
                onClick={this.onClickLikeDecreaseButton}
                data-testid="unLikeIcon"
              >
                <FcLike className="likedIcon likeIcon" />
              </button>
            ) : (
              <button
                type="button"
                className="likeButton"
                onClick={this.onClickLikeIncreaseButton}
                data-testid="likeIcon"
              >
                <BsHeart className="likeIcon" />
              </button>
            )}
            <FaRegComment className="commentIcon" />
            <BiShareAlt className="shareIcon" />
          </div>
          <div className="text-container">
            <p className="likes">{likeCount} likes</p>
            <p className="caption">{caption}</p>
            <ul>
              {comments.map(eachItem => (
                <li key={eachItem.user_id} className="comments-container">
                  <p className="comment">
                    <span className="span">{eachItem.user_name}</span>
                    {eachItem.comment}
                  </p>
                </li>
              ))}
            </ul>
            <p className="created">{createdAt}</p>
          </div>
        </div>
      </li>
    )
  }
}

export default InstaPostCard
