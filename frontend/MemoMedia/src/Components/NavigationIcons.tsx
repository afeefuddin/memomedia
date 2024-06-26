import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setAddPost } from '../Store/addPostSlice';
import { useNavigate } from 'react-router';
import { setSearch } from '../Store/searchSlice';
import { StateType } from '../Store/store';

function NavigationIcons() {
        const currentTheme = useSelector((state: StateType) => state.theme.currentTheme)
        const isAuthenticated = useSelector((state: StateType) => state.auth.isAuthenticated)
        const dispatch = useDispatch();
        const Navigate = useNavigate()
        const handleSearchToggle : () => void = () =>{
                dispatch(setSearch())
              }
        return (
                <div className='flex flex-row gap-2'>
                        <div className='m-auto flex flex-col text-sm items-center cursor-pointer' onClick={() => Navigate('/')}>
                                <svg width="32" height="32" viewBox="0 0 316 316" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M131.655 249.524V183.952H184.113V249.524C184.113 256.737 190.014 262.639 197.227 262.639H236.571C243.784 262.639 249.685 256.737 249.685 249.524V157.723H271.98C278.012 157.723 280.898 150.248 276.308 146.314L166.671 47.5615C161.687 43.1026 154.081 43.1026 149.097 47.5615L39.4601 146.314C35.0012 150.248 37.7552 157.723 43.7879 157.723H66.0825V249.524C66.0825 256.737 71.984 262.639 79.1969 262.639H118.54C125.753 262.639 131.655 256.737 131.655 249.524Z" fill={currentTheme === 'light' ? 'black' : 'white'} />
                                </svg>
                                <div>Home</div>
                        </div>
                        <div className='m-auto flex flex-col text-sm items-center cursor-pointer' onClick={handleSearchToggle}>
                                <svg width="32" height="32" viewBox="0 0 315 315" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M271.601 252.978L227.012 208.52C241.398 190.192 249.204 167.559 249.175 144.259C249.175 123.509 243.022 103.224 231.494 85.9711C219.965 68.7178 203.58 55.2705 184.409 47.3297C165.238 39.3888 144.143 37.3112 123.791 41.3594C103.44 45.4076 84.7454 55.3998 70.0727 70.0726C55.3999 84.7453 45.4077 103.44 41.3595 123.791C37.3113 144.143 39.389 165.238 47.3298 184.409C55.2706 203.58 68.7179 219.965 85.9713 231.494C103.225 243.022 123.509 249.175 144.259 249.175C167.559 249.204 190.192 241.398 208.52 227.012L252.978 271.601C254.198 272.83 255.648 273.806 257.246 274.471C258.844 275.137 260.558 275.48 262.29 275.48C264.021 275.48 265.735 275.137 267.333 274.471C268.931 273.806 270.382 272.83 271.601 271.601C272.83 270.382 273.806 268.931 274.472 267.333C275.137 265.735 275.48 264.021 275.48 262.29C275.48 260.558 275.137 258.844 274.472 257.246C273.806 255.648 272.83 254.197 271.601 252.978ZM65.5725 144.259C65.5725 128.696 70.1874 113.483 78.8336 100.543C87.4799 87.6032 99.7691 77.5177 114.147 71.5621C128.525 65.6064 144.347 64.0482 159.61 67.0843C174.874 70.1205 188.895 77.6147 199.899 88.6192C210.904 99.6238 218.398 113.644 221.434 128.908C224.47 144.172 222.912 159.993 216.957 174.371C211.001 188.75 200.915 201.039 187.975 209.685C175.035 218.331 159.822 222.946 144.259 222.946C123.39 222.946 103.376 214.656 88.6194 199.899C73.8627 185.143 65.5725 165.128 65.5725 144.259Z" fill={currentTheme === 'light' ? 'black' : 'white'} />
                                </svg>
                                <div>Search</div>
                        </div>
                        <div className='m-auto flex flex-col text-sm items-center cursor-pointer' onClick={() => {
                                if (isAuthenticated)
                                        dispatch(setAddPost())
                                else
                                        alert('Login First')
                        }}>
                                <svg width="32" height="32" viewBox="0 0 315 315" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M170.488 91.773H144.259V144.215H91.8014V170.436H144.259V222.877H170.488V170.436H222.946V144.215H170.488V91.773ZM157.374 26.2209C84.9819 26.2209 26.229 84.9556 26.229 157.325C26.229 229.695 84.9819 288.429 157.374 288.429C229.766 288.429 288.519 229.695 288.519 157.325C288.519 84.9556 229.766 26.2209 157.374 26.2209ZM157.374 262.209C99.5389 262.209 52.458 215.142 52.458 157.325C52.458 99.5082 99.5389 52.4417 157.374 52.4417C215.209 52.4417 262.29 99.5082 262.29 157.325C262.29 215.142 215.209 262.209 157.374 262.209Z" fill={currentTheme === 'light' ? 'black' : 'white'} />
                                </svg>
                                <div>Add Post</div>
                        </div>
                </div>
        )
}

export default NavigationIcons