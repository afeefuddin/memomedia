import React from 'react'
import HomeHeader from '../Components/HomeHeader'
import Post from '../Components/Post'
import Comment from '../Components/Comment'

function PostPage() {
  return (
    <div>
        <HomeHeader/>
        <div>
            <Post />
            <div>
                <textarea name="comment-box" id="" cols={30} rows={10} placeholder='Add a Comment' />
            </div>
             {/*Make a map here for multiple comments  */}
            <Comment /> 

        </div>
    </div>
  )
}

export default PostPage