import { useEffect, useState } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import styles from './css/LoginComponent.module.css'
import image from '../assets/1-removebg-preview.png'
import imageDark from '../assets/2-removebg-preview.png'
import { useSelector } from 'react-redux'
import { useLogin,handleLogin } from '../api/api'
import { login, logout } from '../auth/authSlice'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

const { container, inputbox } = styles

function updateState(LoginMutate : any,dispatch:any){
  
    dispatch(login(LoginMutate?.data))
}

function LoginComponent(props: any) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const curTheme = useSelector((state: any) => state.theme.currentTheme);
    const dispatch = useDispatch()
    
    const LoginMutate = useMutation({
        mutationFn: () => handleLogin(username, password)
      })

      useEffect(()=>{
         if(LoginMutate.isSuccess){
            updateState(LoginMutate,dispatch)
            localStorage.setItem("jwt_token_id",LoginMutate.data.auth)
            localStorage.setItem("user", JSON.stringify(LoginMutate.data?.userData))
          }
           
      },[LoginMutate])

    return (
        <div className={container}>
            <Flex justify={'center'} align={'center'} className='pt-12 pb-12 border-gray-400 border rounded'>
                <div className='pl-6 pr-6'>
                    <div className='flex items-center justify-center mb-8'>{curTheme === 'light' ? <img src={image} alt="" className='w-48' /> : <img src={imageDark} alt="" className='w-40' />} </div>
                    <div className=''>
                        <div><input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className={`border w-60 border-gray-400 mt-2 mb-2 p-1 focus:outline-none ${inputbox}`} type="text" /></div>
                        <div><input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className={`border w-60 border-gray-400 mt-2 mb-2 p-1 focus:outline-none ${inputbox}`} type="password" /></div>
                        <div className='flex justify-center mt-2 mb-2'>
                            <Button variant="solid" className='w-24' onClick={()=>LoginMutate.mutate()} >
                                Login
                            </Button></div>
                    </div>
                    <div className='flex mt-6 justify-between items-center'>
                        <div className='h-px bg-gray-700 w-20'></div>
                        <div className='text-sm'>OR</div>
                        <div className='h-px bg-gray-700 w-20'></div>
                    </div>
                    <div className='text-sm text-center mt-2'>Dont have an account? <span className='text-base text-blue-500 cursor-pointer'>SignUp</span></div>
                </div>
            </Flex>
            
        </div>
    )
}

export default LoginComponent