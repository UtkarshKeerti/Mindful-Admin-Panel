import React from 'react'

const Colorpallete = () => {
  return (
    <div className={'color-palletes-container'}>
      <p style={{ margin: '4rem 0 0' }}>PRIMARY</p>
      <div style={{ display: 'flex', border: '1px solid black', width: 'max-content' }}>
        <span className={'primary-color'}></span>
        <span className={'primary-color-dark'}></span>
        <span className={'primary-color-light'}></span>
        <span className={'primary-color-lightest'}></span>
      </div>

      <p style={{ margin: '4rem 0 0' }}>GREY</p>
      <div style={{ display: 'flex', border: '1px solid black', width: 'max-content' }}>
        <span className={'color-grey'}></span>
        <span className={'color-grey-light'}></span>
        <span className={'color-grey-dark'}></span>
        <span className={'color-grey-darker'}></span>
      </div>
    </div>
  )
}

export default Colorpallete
