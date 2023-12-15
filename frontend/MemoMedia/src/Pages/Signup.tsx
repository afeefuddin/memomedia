import { useEffect, useState } from 'react'
import { Flex, Button } from '@radix-ui/themes'
import { useSelector } from 'react-redux';
import image from '../assets/1-removebg-preview.png'
import imageDark from '../assets/2-removebg-preview.png'
import styles from '../Components/css/LoginComponent.module.css'
import { useMutation } from '@tanstack/react-query';
import { createUser, sendOTP } from '../api/api';
import LoadingButton from '../Components/LoadingButton';
import { useNavigate } from 'react-router';

const { inputbox } = styles;
function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [otp, setOTP] = useState('');
    const [showOTPBox, setShowOTPBox] = useState(false);
    const [loading,setLoading] = useState(false);
    const [usernameWarning,setUsernameWarning] = useState(false)
    const [emailWarning,setEmailWarning] = useState(false);
    const [passwordWarning,setPasswordWarning] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMessage , setErrorMessage] = useState('')

    const Navigate = useNavigate()

    const curTheme = useSelector((state: any) => state.theme.currentTheme);
    const sendOTPtoUser = useMutation({
        mutationFn: () => sendOTP(username, email)
    })
    useEffect(() => {
        if (sendOTPtoUser.isSuccess) {
            setLoading(false)
            setShowOTPBox(true)
        }
    }, [sendOTPtoUser])

    const createAccount = useMutation({
        mutationFn: () => createUser(username, email, password, otp )
    })
    useEffect(()=>{
        if(createAccount.isError){
            console.log(createAccount.error.response.data.error)
            const val = createAccount.error.response.data.error
            setErrorMessage(val || createAccount.error.message)
            setShowError(true)
        }
    },[createAccount])

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
    
        if (/^[0-9]*$/.test(inputValue)) {
            setOTP(inputValue);
          }
      };
      
      const verifyPassword:()=>boolean =  () => {
        if(password.length<8){
            return false;
        }
        return true;
      }
      const verifyEmail : ()=>boolean = ()=>{
        if(email.search('@')===-1 || email.search('.')==-1){
            return false
        }
        return true
      }

    return (
        <div style={{ background: 'var(--secondary-bg-color)' }} className='h-screen flex justify-center items-center'>
            <div>
                <div>{showError && <div className='text-center font-bold'>{errorMessage}</div>}</div>
                <Flex justify={'center'} align={'center'} className='pt-12 pb-12 border-gray-400 border rounded'>
                    <div className='pl-6 pr-6'>
                        <div className='flex items-center justify-center mb-8'>{curTheme === 'light' ? <img src={image} alt="" className='w-48' /> : <img src={imageDark} alt="" className='w-40' />} </div>
                        <div className=''>
                            <div><input value={username} onChange={(e) => {
                                setUsernameWarning(false)
                                if (!showOTPBox) setUsername(e.target.value)
                            }} placeholder='Username' className={`border w-60 border-gray-400 mt-2 mb-2 p-1 focus:outline-none ${inputbox}`} type="text" /></div>
                            {usernameWarning &&  <span className='text-xs text-center'>Username can't be empty</span>}
                            <div><input value={email} onChange={(e) => {
                                setEmailWarning(false)
                                if (!showOTPBox) setEmail(e.target.value)
                            }} placeholder='Email' className={`border w-60 border-gray-400 mt-2 mb-2 p-1 focus:outline-none ${inputbox}`} type="text" /></div>
                            {emailWarning && <span className='text-xs'>Enter a valid Email</span>}
                            <div><input value={password} onChange={(e) =>{ 
                                setPasswordWarning(false)
                                setPassword(e.target.value)}}
                                 placeholder='Password' className={`border w-60 border-gray-400 mt-2 mb-2 p-1 focus:outline-none ${inputbox}`} type="password" /></div>
                            {passwordWarning &&  <span className='text-xs text-center'>Password must contains atleast 8 letters</span>}
                            {showOTPBox && <div><input value={otp} onChange={handleInputChange} placeholder='Enter OTP' className={`border w-60 border-gray-400 mt-2 mb-2 p-1 focus:outline-none ${inputbox}`} type="otp" maxLength={6} /></div>
                            }
                            <div className='flex justify-center mt-2 mb-2'>
                                {!showOTPBox && !loading &&
                                    <Button variant="solid" className='w-24' onClick={() =>{
                                        if(username.length>0){ 
                                        if(verifyPassword() && verifyEmail()){
                                        setLoading(true)
                                        sendOTPtoUser.mutate()
                                        }
                                        else if(verifyPassword()){
                                            setEmailWarning(true)
                                        }
                                        else if(verifyEmail()){
                                            setPasswordWarning(true)
                                        }
                                        else{
                                            setEmailWarning(true)
                                            setPasswordWarning(true)
                                        }
                                        }
                                        else{
                                            setUsernameWarning(true);
                                        }
                                    } 
                                    }>
                                        SignUp
                                    </Button>}
                                    {loading && <Button className='bg-blue-400'>Loading...</Button> }
                                {showOTPBox &&
                                    <Button variant="solid" className='w-24' onClick={() => createAccount.mutate()} >
                                        Verify OTP
                                    </Button>}
                            </div>
                        </div>
                        <div className='flex mt-6 justify-between items-center'>
                            <div className='h-px bg-gray-700 w-20'></div>
                            <div className='text-sm'>OR</div>
                            <div className='h-px bg-gray-700 w-20'></div>
                        </div>
                        <div className='text-sm text-center mt-2'>Already have an account? <span className='text-base text-blue-500 cursor-pointer' onClick={()=>Navigate('/login')}>LogIn</span></div>
                    </div>
                </Flex>

            </div>
        </div>

    )
}

export default Signup