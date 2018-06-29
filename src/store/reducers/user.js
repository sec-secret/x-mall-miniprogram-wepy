import { handleActions } from 'redux-actions'
import { UPDATE_USER_INFO, UPDATE_AUTHOR_INFO, UPDATE_CODE } from '../types/user'

export default handleActions({
  [UPDATE_USER_INFO] (state, action) {
    return {
      ...state,
      userInfo: {...state.userInfo, ...action.userInfo}
    }
  },
  [UPDATE_AUTHOR_INFO] (state, action) {
    return {
      ...state,
      authorData: action.author,
      hasAuthor: action.hasAuthor,
      hasUserId: action.hasUserId,
      token: action.token
    }
  },
  [UPDATE_CODE] (state, action) {
    return {
      ...state,
      code: action.code
    }
  }
}, {
  userInfo: {
    userId: '',
    openId: '',
    nickName: '',
    headImg: '',
    mobile: '',
    unionId: ''
  },
  authorData: {},
  hasAuthor: false,
  hasUserId: false,
  token: '',
  code: ''
})
