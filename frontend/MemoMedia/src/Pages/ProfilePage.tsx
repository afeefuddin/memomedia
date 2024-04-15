import { useEffect, useState } from 'react'
import HomeHeader from '../Components/HomeHeader'
import { Button } from '@radix-ui/themes'
import axios from 'axios'
import Post from '../Components/Post'
import { useParams } from 'react-router'
import UpdateProfile from '../Components/UpdateProfile'
import NavigationIcons from '../Components/NavigationIcons'

interface data {
    _id: string,
    username: string;
    password: string;
    email: string;
    post: string[];
    follower: string[];
    following: string[];
    accountCreated: number;
    profilePic?: string;
    PostsData: any
}

interface ResponseAPI {
    dataToSend: data
}

function ProfilePage() {
    const isLoggedIn = true;
    const [isUser, setIsUser] = useState(false)
    const { username } = useParams()
    const [isFollowing, setIsFollowing] = useState(false);
    const [userData, setUserData] = useState<data | null>();
    const [isOpen, setIsOpen] = useState<boolean>(false)
    // const {isError,data} = getUserDetails('afeefuddin')
    const fetchApi: (username: string) => any = async (username: string) => {

        try {
            let response = await axios.get(import.meta.env.VITE_API_LINK + `users/profile/${username}`);
            let res = await response.data as ResponseAPI;
            if (res) {
                setUserData(res.dataToSend)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const followUser: () => void = async () => {
        const token = localStorage.getItem('jwt_token_id')
        const data = localStorage.getItem('user')
        const accountId = userData!._id
        let userId;
        if (data) {
            userId = JSON.parse(data)._id
        }
        const headers = {
            'Authorization': 'Bearer ' + token,
            userId,
        }
        await axios.post(import.meta.env.VITE_API_LINK + 'follow', {
            accountId
        }, {
            headers
        },)
    }
    const unfollowUser: () => void = async () => {
        const token = localStorage.getItem('jwt_token_id')
        const data = localStorage.getItem('user')
        const accountId = userData!._id
        let userId;
        if (data) {
            userId = JSON.parse(data)._id
        }
        const headers = {
            'Authorization': 'Bearer ' + token,
            userId,
        }
        await axios.post(import.meta.env.VITE_API_LINK + 'unfollow', {
            accountId
        }, {
            headers
        },)
    }
    const checkIfuser: () => void = () => {
        const data = localStorage.getItem('user')
        if (data) {
            let usernameLocal = JSON.parse(data).username
            if (usernameLocal === username) {
                setIsUser(true)
            }
            else{
                setIsUser(false)
            }
        }
    }

    const checkIfFollowing: () => void = async () => {
        const data = localStorage.getItem('user')
        const token = localStorage.getItem('jwt_token_id')
        let userId;
        if (data) {
            userId = JSON.parse(data)._id
        }
        try {
            const headers = {
                'Authorization': 'Bearer ' + token,
                userId,
                accountId: userData?._id

            }
            const req = await axios.get(import.meta.env.VITE_API_LINK + 'followed', {
                headers
            })
            const data = await req.data
            const isFollowing = data.isFollowing
            if (isFollowing === "true")
                setIsFollowing(true)

        } catch (error) {

        }
    }
    useEffect(() => {

        fetchApi(username!)
        checkIfuser()
    }, [username])
    useEffect(() => {
        if (!isUser && userData) {
            checkIfFollowing()
        }
    }, [isUser, userData])

    if (userData == null) {
        return (
            <div className='h-screen flex items-center justify-center' style={{ background: 'var(--primary-bg-color)' }}>
                <div className='m-auto text-lg'>Loading...</div>
            </div>
        )
    }

    return (
        <>
            <UpdateProfile isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className='h-full min-h-screen' style={{ background: 'var(--primary-bg-color)' }}>
                <div><HomeHeader profile='true' /></div>
                <div className='flex flex-col sm:flex-row gap-6 items-center sm:items-start '>
                    <div className='mt-4 mb-4 ml-4 p-4 h-fit w-fit flex flex-col items-center ' style={{ background: 'var(--secondary-bg-color)' }}>
                        <div><img className='h-36 rounded-full' src={userData?.profilePic} alt="" /></div>
                        <div className='text-lg text-center mt-4 mb-4'>{userData?.username}</div>
                        {isLoggedIn && isUser && <Button className='ml-auto mr-auto mt-2 mb-4' onClick={() => setIsOpen(true)}>Update Profile Pic</Button>}
                        {isLoggedIn && !isUser && <Button onClick={() => {
                            console.log(isFollowing, isUser)
                            if (!isFollowing && !isUser) {
                                followUser()
                            }
                            else {
                                unfollowUser()
                            }
                        }} >{isFollowing ? <span>UnFollow</span> : <span>Follow</span>}</Button>}
                        <div className='flex flex-row gap-6 mt-4 mb-4'>
                            <div>{userData.PostsData?.length} Posts</div>
                            <div>{userData.follower?.length} Followers</div>
                            <div>{userData.following?.length} Following</div>
                        </div>
                        <div>Account Created On 27/10/2023</div>
                    </div>
                    <div className='mt-4 mb-4 pl-4 flex flex-col  w-full' >
                        <div className='text-3xl font-bold items-start'>Your Posts</div>
                        <div className='flex flex-col item-center'>
                            <div className='mt-4 flex flex-col  items-center '>
                                {userData && 'PostsData' in userData && userData.PostsData.length > 0 ? (
                                    userData.PostsData.map((item: any) => (
                                        <div className='ml-2 mr-2 mt-4 mb-4' key={item._id}>

                                            <Post items={item} />
                                        </div>
                                    ))
                                ) : (
                                    <div>{userData && userData.PostsData.length == 0 ? <div>No Post uploaded Yet</div> : <div>Loading Posts...</div>}</div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
                <div className='block sm:hidden fixed bottom-0 w-full z-50' style={{ background: 'var(--secondary-bg-color)' }}><NavigationIcons /></div>
            </div>
        </>
    )
}

export default ProfilePage