import './index.css'

const PasswordItem = props => {
  const {passwordObj, showPasswords, onDeletePassword} = props
  const {id, website, username, password, bgColor} = passwordObj
  const onClickDelete = () => {
    onDeletePassword(id)
  }

  return (
    <li className="password-container">
      <div className={`website-logo-container ${bgColor}`}>
        <p className="website-logo">{website[0].toUpperCase()}</p>
      </div>
      <div className="password-details">
        <p className="website">{website}</p>
        <p className="username">{username}</p>
        {showPasswords ? (
          <p className="password">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="password-stars"
          />
        )}
      </div>
      <button
        type="button"
        className="delete-button-container"
        onClick={onClickDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
