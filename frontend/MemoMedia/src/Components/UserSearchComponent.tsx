import { useNavigate } from 'react-router';

export interface UserData {
    _id : string,
    username : string,
    email : string,
    profilePic : string,
    post : string[],
    follower : string[],
    following : string[],
    accountCreated : number,
    __v : number

}

function UserSearchComponent({data }:{data : UserData} ) {
    console.log(data);
    const navigate = useNavigate();
  return (
    
    <div className='flex flex-row gap-4 hover:cursor-pointer hover:bg-hover p-4' onClick={()=>navigate(`/user/${data.username}`)}>
        <div className='h-16'><img className='h-full rounded-full' src={data.profilePic} alt="" /></div>
        <div className='flex flex-col'><div className='text-2xl'>@{data.username}</div>
            <div>{data.follower?.length} Followers</div>
        </div>
    </div>
  )
}

export default UserSearchComponent