import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import Login from './Pages/Login';
import Home from './Pages/Home';
import {  Routes, Route } from 'react-router';
import ProfilePage from './Pages/ProfilePage';
import AddPost from './Pages/AddPost';
import Signup from './Pages/Signup';
import PrivateRoute from './Components/PrivateRoute';
import PostPage from './Pages/PostPage';
import Menu from './Components/Menu';
import Search from './Pages/Search';
import { useEffect } from 'react';
import { StateType } from './Store/store';



function App() {


  const curTheme : any = useSelector((state: StateType) => state.theme.currentTheme);
  localStorage.setItem('theme',curTheme)

  useEffect(() => {
    // Apply dark mode classes when the component mounts or when isDarkMode changes
    if(curTheme==='dark'){
    const body = document.documentElement;
    body.classList.toggle('dark',curTheme);
    }
  }, [curTheme]);
  return (
    <>

      <div className={curTheme}>
        <Theme appearance={curTheme}>
          <AddPost />
          <Menu />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user/:username' element={<ProfilePage />} />
            <Route path='/search' element={<Search />} />
            
            <Route path='post/:postId' element={   
                <PostPage />
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
