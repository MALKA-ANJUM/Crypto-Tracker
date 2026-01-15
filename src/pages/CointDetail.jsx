import React from 'react'
import { useParams } from 'react-router'

const CointDetail = () => {
  const { id } = useParams();
  console.log(id);
  
  
  return (
    <div>
      thisis coin detail page: {id}
    </div>
  )
}

export default CointDetail
