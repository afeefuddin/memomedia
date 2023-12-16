import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import LoginComponent from "./Components/LoginComponent"
import { useSelector } from 'react-redux';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { Router, Routes, Route } from 'react-router';
import ProfilePage from './Pages/ProfilePage';
import AddPost from './Pages/AddPost';
import Signup from './Pages/Signup';
import PrivateRoute from './Components/PrivateRoute';
import PostPage from './Pages/PostPage';
import AuthRoute from './Components/AuthRoute';




function App() {


  const curTheme = useSelector((state: any) => state.theme.currentTheme);
  console.log(curTheme)
  return (
    <>

      <div className={curTheme}>
        <Theme appearance={curTheme}>
          <AddPost />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user/:username' element={<ProfilePage />} />
            <Route path='post/:postid' element={
              <AuthRoute >
                <PostPage />
              </AuthRoute>
            } />
            <Route path='/signup' element={
              <PrivateRoute>
                <Signup />
              </PrivateRoute>
            } />
            <Route path='/login' element={
              <PrivateRoute>
                <Login />
              </PrivateRoute>
            } />
          </Routes>
        </Theme>
      </div>

    </>
  )
}

export default App
