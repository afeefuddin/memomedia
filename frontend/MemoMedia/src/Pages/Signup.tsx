import { useEffect, useState } from 'react'
import { Flex, Button } from '@radix-ui/themes'
import { useSelector } from 'react-redux';
import image from '../assets/1-removebg-preview.png'
import imageDark from '../assets/2-removebg-preview.png'
import styles from '../Components/css/LoginComponent.module.css'
import { useMutation } from '@tanstack/react-query';
import { createUser } from '../api/api'; // Removed import for sendOTP
import { useNavigate } from 'react-router';
import { StateType } from '../Store/store';

const { inputbox } = styles;

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [usernameWarning, setUsernameWarning] = useState(false)
    const [emailWarning, setEmailWarning] = useState(false);
    const [passwordWarning, setPasswordWarning] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const Navigate = useNavigate()

    const curTheme = useSelector((state: StateType) => state.theme.currentTheme);

    const createAccount = useMutation({
        mutationFn: () => createUser(username, email, password) // Removed otp parameter
    });

    useEffect(() => {
        if (createAccount.isError) {
            const val = createAccount.error.message
            setErrorMessage(val || createAccount.error.message)
            setShowError(true)
        }
        if (createAccount.isSuccess) {
            Navigate('/login')
        }
    }, [createAccount]);

    const verifyPassword = () => {
        return password.length >= 8;
    }

    const verifyEmail = () => {
        return email.includes('@') && email.includes('.');
    }

    return (
        <div style={{ background: 'var(--secondary-bg-color)' }} className='h-screen flex justify-center items-center'>
            <div>
                <div>{showError && <div className='text-center font-bold'>{errorMessage}</div>}</div>
                <Flex justify={'center'} align={'center'} className='pt-12 pb-12 border-gray-400 border rounded'>
                    <div className='pl-6 pr-6'>
                        <div className='flex items-center justify-center mb-8'>
                            {curTheme === 'light' ? <img src={image} alt="" className='w-48' /> : <img src={imageDark} alt="" className='w-40' />}
                        </div>
                        <div className=''>
                            <div>
                                <input
                                    value={username}
                                    onChange={(e) => {
                                        setUsernameWarning(false)
                                        setUsername(e.target.value)
                                    }}
                                    placeholder='Username'
                                    className={`border w-60 border-gray-400 mt-2 mb-2 p-1 focus:outline-none ${inputbox}`}
                                    type="text"
                                />
                            </div>
                            {usernameWarning && <span className='text-xs text-center'>Username can't be empty</span>}
                            <div>
                                <input
                                    value={email}
                                    onChange={(e) => {
                                        setEmailWarning(false)
                                        setEmail(e.target.value)
                                    }}
                                    placeholder='Email'
                                    className={`border w-60 border-gray-400 mt-2 mb-2 p-1 focus:outline-none ${inputbox}`}
                                    type="text"
                                />
                            </div>
                            {emailWarning && <span className='text-xs'>Enter a valid Email</span>}
                            <div>
                                <input
                                    value={password}
                                    onChange={(e) => {
                                        setPasswordWarning(false)
                                        setPassword(e.target.value)
                                    }}
                                    placeholder='Password'
                                    className={`border w-60 border-gray-400 mt-2 mb-2 p-1 focus:outline-none ${inputbox}`}
                                    type="password"
                                />
                            </div>
                            {passwordWarning && <span className='text-xs text-center'>Password must contain at least 8 characters</span>}
                            <div className='flex justify-center mt-2 mb-2'>
                                {!loading &&
                                    <Button variant="solid" className='w-24' onClick={() => {
                                        setShowError(false)
                                        if (username.length > 0) {
                                            if (verifyPassword() && verifyEmail()) {
                                                setLoading(true)
                                                createAccount.mutate()
                                            }
                                            else if (verifyPassword()) {
                                                setEmailWarning(true)
                                            }
                                            else if (verifyEmail()) {
                                                setPasswordWarning(true)
                                            }
                                            else {
                                                setEmailWarning(true)
                                                setPasswordWarning(true)
                                            }
                                        }
                                        else {
                                            setUsernameWarning(true);
                                        }
                                    }}>
                                        SignUp
                                    </Button>
                                }
                                {loading && !showError && <Button className='bg-blue-400'>Loading...</Button>}
                            </div>
                        </div>
                        <div className='flex mt-6 justify-between items-center'>
                            <div className='h-px bg-gray-700 w-20'></div>
                            <div className='text-sm'>OR</div>
                            <div className='h-px bg-gray-700 w-20'></div>
                        </div>
                        <div className='text-sm text-center mt-2'>Already have an account? <span className='text-base text-blue-500 cursor-pointer' onClick={() => Navigate('/login')}>LogIn</span></div>
                    </div>
                </Flex>
            </div>
        </div>
    )
}

export default Signup;
