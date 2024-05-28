import React from 'react'
import Image from "next/image"
import selfTestLogo from "../../../assets/images/men.webp";


const Card = () => {
  return (
    <div className='primary-box-shadow p-5 secondary-border-radius bg-white text-center'>
        <div >
        <Image  width={0} height={0} src={selfTestLogo} alt="image"/>
        </div>
        <div>
            <h3 className='text-base'>Category name</h3>
        </div>
    </div>
  )
}

export default Card