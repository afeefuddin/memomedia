import React, { useEffect, useState } from 'react'
import { useOutsideClick } from '../Hooks/useOutSideClick'
import { useDispatch } from 'react-redux'
import { setSearch } from '../Store/searchSlice'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import UserSearchComponent, { UserData } from '../Components/UserSearchComponent'
import axios from 'axios'

// type search = String | null
function Search() {
    const [searchQuery,setSearchQuery] = useState<string|null>(null)
    // const [loading,setLoading] = useState(false)
    // const [data,setData] = useState(null)
    const dispatch = useDispatch()

    const queryClient = useQueryClient()
    const node = useOutsideClick(()=>{
        dispatch(setSearch())
    })
    // const search = useSearch(searchQuery)
    const query =  useQuery({
        queryFn : async()=>searchUsers(),
        queryKey : ['Search'],
        enabled : false,
        refetchOnWindowFocus : false,
        refetchOnReconnect : false,
        
    })
    // console.log("Here" + searchQuery)
    const handleEnter = (e : React.KeyboardEvent) =>{
        if(e.key === 'Enter'){
            console.log("Yes");
            
        }
    }
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        setSearchQuery(e.target.value);

    }

    const searchUsers = async()=>{
        const res = await axios.get(import.meta.env.VITE_API_LINK + `search/${searchQuery}`) 
        const data = await res.data
        return data.data;
    }
   
  useEffect(() => {
    // setData(null); // Clear previous data
    if (searchQuery!==null && searchQuery?.length > 0) {
      queryClient.cancelQueries({ queryKey: ['Search'] });
      query.refetch();
    }
  }, [searchQuery]);

  useEffect(()=>{
      if(query.isSuccess){
      console.log(query.data);
    // setData(query.data.data)
      }
  },[query])
  return (
   
    <div ref={node} className='w-full h-full flex flex-col justify-center items-center pl-2 pr-2'>
        <input placeholder='Search..' className='outline-none border border-black dark:border-white rounded-full pl-4 pr-4 pt-1 pb-1
        w-full sm:w-3/4 text-center' style={{background:'var(--secondary-bg-color)'}} onKeyDown={handleEnter} value={searchQuery ?? ''} onChange={handleChange}/>
        <div className='absolute top-20 w-full sm:w-3/4 pl-4 pr-4 pt-2 pb-2 text-center shadow dark:shadow-white :shadow-black' style={{background:'var(--secondary-bg-color)', }} >
            {(searchQuery===null || searchQuery?.length===0) && <div>try to search users</div>}
            {query.data?.length===0 && (searchQuery?? '').length>0 && <div>
              No Users Found
              </div>}
            {query.isLoading && <div>Loading...</div>}
          {query.data?.length>0 && (searchQuery?? '').length>0 && <div>{query.data.map((e : {data : UserData})=>{
                return <div><UserSearchComponent data={e} /></div>
            })}</div> } 
            </div>
    </div>
        

  )
}

export default Search