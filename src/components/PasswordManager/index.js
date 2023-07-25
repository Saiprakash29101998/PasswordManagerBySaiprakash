import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    passwordsList: [],
    showPasswords: false,
  }

  colorsPalatte = [
    'color1',
    'color2',
    'color3',
    'color4',
    'color5',
    'color6',
    'color7',
    'color8',
    'color9',
  ]

  onChangeWebsite = event => {
    this.setState({
      websiteInput: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      usernameInput: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onClickAddButton = event => {
    event.preventDefault()
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordsList,
    } = this.state

    const randomNumber = Math.floor(Math.random() * 6)

    if (websiteInput !== '' && usernameInput !== '' && passwordInput !== '') {
      this.setState({
        websiteInput: '',
        usernameInput: '',
        passwordInput: '',
        passwordsList: [
          ...passwordsList,
          {
            website: websiteInput,
            username: usernameInput,
            password: passwordInput,
            id: uuidv4(),
            bgColor: this.colorsPalatte[randomNumber],
          },
        ],
      })
    }
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({
      showPasswords: !prevState.showPasswords,
    }))
  }

  onChangeSearch = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    this.setState({
      passwordsList: passwordsList.filter(eachItem => eachItem.id !== id),
    })
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
      passwordsList,
      showPasswords,
    } = this.state

    const filteredList = passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-image"
        />
        <div className="top-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="sm-image"
          />
          <form className="form-container" onSubmit={this.onClickAddButton}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-icon"
                />
              </div>
              <input
                placeholder="Enter Website"
                className="input"
                onChange={this.onChangeWebsite}
                value={websiteInput}
              />
            </div>
            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-icon"
                />
              </div>
              <input
                placeholder="Enter Username"
                className="input"
                onChange={this.onChangeUsername}
                value={usernameInput}
              />
            </div>
            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-icon"
                />
              </div>
              <input
                placeholder="Enter Password"
                className="input"
                type="password"
                onChange={this.onChangePassword}
                value={passwordInput}
              />
            </div>
            <button className="add-button" type="submit">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="med-image"
          />
        </div>

        <div className="bottom-container">
          <div className="heading-container">
            <div className="heading-sub-container">
              <h1 className="your-password">Your Passwords</h1>
              <div className="count-container">
                <p className="count">{passwordsList.length}</p>
              </div>
            </div>
            <div className="search-container">
              <div className="search-icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
              </div>
              <input
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearch}
                type="search"
              />
            </div>
          </div>
          <div className="label-container">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox"
              onChange={this.onChangeCheckbox}
            />
            <label htmlFor="checkbox" className="show-passwords">
              Show Passwords
            </label>
          </div>
          {filteredList.length === 0 ? (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-image"
              />
              <p className="your-password">No Passwords</p>
            </div>
          ) : (
            <ul className="saved-passwords-container">
              {filteredList.map(eachItem => (
                <PasswordItem
                  passwordObj={eachItem}
                  key={eachItem.id}
                  showPasswords={showPasswords}
                  onDeletePassword={this.onDeletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
