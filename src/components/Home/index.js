import {Component} from 'react'
import Header from '../Header'
import Stories from '../StoriesComponent'
import InstaPost from '../InstaPost'
import SearchedPosts from '../SearchedPosts'
import './index.css'

class Home extends Component {
  state = {
    searchValue: '',
  }

  setSearchValue = value => {
    this.setState({searchValue: value})
  }

  render() {
    const {searchValue} = this.state
    return (
      <>
        <Header setSearchValue={this.setSearchValue} />
        <div className="homeDivContainer">
          {searchValue !== '' ? (
            <SearchedPosts searchValue={searchValue} />
          ) : (
            <div className="home-container">
              <Stories />
              <hr className="home-line" />

              <InstaPost />
            </div>
          )}
        </div>
      </>
    )
  }
}
export default Home
