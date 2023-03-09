import React from 'react'

function ErrorAlert({errMsg}) {
  return (
    <div className="alert alert-danger" role="alert">
      {errMsg}
    </div>
  )
}

export default ErrorAlert