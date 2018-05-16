import { handleActions } from 'redux-actions'
import { UPDATE_USER_INFO, UPDATE_AUTHOR_INFO } from '../types/user'

export default handleActions({
  [UPDATE_USER_INFO] (state, action) {
    return {
      ...state,
      userInfo: {...state.userInfo, ...action.userInfo},
      userId: action.userInfo.userId || ''
    }
  },
  [UPDATE_AUTHOR_INFO] (state, action) {
    return {
      ...state,
      authorData: action.author,
      hasAuthor: action.hasAuthor,
      token: action.token
    }
  }
}, {
  userInfo: {},
  hasUserId: false,
  authorData: {},
  hasAuthor: false,
  token: ''
})
