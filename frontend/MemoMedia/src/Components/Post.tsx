

function Post(props:any) {
  return (
    <div>
        <div className='flex flex-col'>
            <div className='flex flex-row'>
                <div><img src={props.dp} alt="" /></div>
                <div>{props.username}</div>
                <div>. </div>
                <div>{props.time}</div>
            </div>
            <div><img src={props.src} alt="" /></div>
            <div className='grid grid-cols-3'>
                <div onClick={props.like}>{props.likeCount}</div>
                <div onClick={props.openComment}></div>
                <div onClick={props.copyLink}></div>
            </div>
            <div>{props.caption}</div>
            <div onClick={props.openComment}>Add a comment...</div>
        </div>
    </div>
  )
}

export default Post