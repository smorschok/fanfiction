import React from 'react'

export const GetComments = ({comments})=>{
    return(
        <>
        {comments && comments.map((comment,i) => 
          <li className = 'collection-item' key={i}><strong>{comment.name}: </strong>{comment.text}</li>
        )}
        </>
    )
}