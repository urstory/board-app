import './style.css'
import { addRoute, startRouter } from './utils/router.js'
import { renderLogin } from './pages/login.js'
import { renderSignup } from './pages/signup.js'
import { renderPostList } from './pages/postList.js'
import { renderPostDetail } from './pages/postDetail.js'
import { renderPostWrite } from './pages/postWrite.js'
import { renderPostEdit } from './pages/postEdit.js'

// 라우트 등록
addRoute('/login', renderLogin)
addRoute('/signup', renderSignup)
addRoute('/posts', renderPostList)
addRoute('/posts/write', renderPostWrite)
addRoute('/posts/:id', renderPostDetail)
addRoute('/posts/:id/edit', renderPostEdit)

// 라우터 시작
startRouter()
