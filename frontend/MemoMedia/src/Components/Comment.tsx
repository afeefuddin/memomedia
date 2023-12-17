import React from 'react'

function Comment(props : any) {
  return (
    <div className='p-2' style={{ background: 'var(--secondary-bg-color)' }}>
              <div className=''>
                {props.comments && props.comments.map((item) => (
                  <div className='flex flex-col mt-2 mb-2'>
                    <div className='flex flex-row'>
                      <div className='h-8 rounded'>
                        <img className='h-full rounded'  alt="" />
                      </div>
                      <div className='ml-2 font-bold'>
                        {item.user}
                      </div>
                    </div>
                    <div className='ml-10'>
                      {item.message}
                    </div>
                  </div>
                ))}
                {props.comments && props.comments.length==0 && <div>No Comments on this Post</div>}
              </div>
            </div>
  )
}

export default Comment