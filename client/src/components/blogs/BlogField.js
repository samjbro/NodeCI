import React from 'react'

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div className={input.name}>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '20px' }} />
      <div className="red-text" style={{ marginBototm: '20px' }}>
        {touched && error}
      </div>
    </div>
  )
}