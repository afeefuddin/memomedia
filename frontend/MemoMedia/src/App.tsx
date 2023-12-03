import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import LoginComponent from "./Components/LoginComponent"
import { useSelector } from 'react-redux';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { Router, Routes, Route } from 'react-router';
import ProfilePage from './Pages/ProfilePage';
import AddPost from './Pages/AddPost';




function App() {

  
    const curTheme =useSelector((state : any) => state.theme.currentTheme);
     console.log(curTheme)
  return (
    <>
       
      <div className={curTheme}>
        <Theme appearance={curTheme}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/:username' element={<ProfilePage />} />
            </Routes>
        </Theme>
      </div>
         
    </>
  )
}

export default App
