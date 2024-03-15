import { useEffect, useState } from 'react'
import axios from 'axios'

export default function usePostSearch (pageNumber:number) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(false)

  const apiLink = import.meta.env.VITE_API_LINK

  useEffect(() => {
    async function getData(){ 
      setLoading(true)
      try{

        const params = {
          'pos' : pageNumber,
          'size' : 3,
        }
        const jwt_token_id = localStorage.getItem('jwt_token_id')
        const headers =  {
          'Authorization': 'Bearer '+jwt_token_id
        }

        const response = await axios.get(apiLink, { headers,params });
        const data = await response.data;
        const userId = JSON.parse(localStorage.getItem('user')!)['_id']
        await Promise.all(
          data.posts?.map(async (post: any) => {
            const postId = post._id;
            const headers_hasLiked = {
              userId: userId,
              postId: postId,
            };
            const haslikedResponse = await axios.get(apiLink + 'posts/hasLiked', { headers: headers_hasLiked });
            const hasliked = haslikedResponse.data;
            post.isLiked = hasliked.isLiked;
            return post;
          })
        );

              console.log(data.posts)
            setPosts(prev => {
              return [...prev,...data.posts]
          })
          setHasMore(data.postLeft >0)
          setLoading(false);
      }
      catch(error : any){
          console.log("Error Fetching the Data");
          console.log(error.message)
          setError(true);
      }

  }
  getData();
  }, [pageNumber])

  return { loading, error, posts, hasMore }
}