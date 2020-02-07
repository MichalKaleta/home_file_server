import React, { Children } from 'react';
import './Counter.scss'

export default function Counter({ sizeUploaded, totalSize, filesAmount }) {

   return (
      <div>
         <div className='progress-bar__wraper'>
            <div style={{ width: `${sizeUploaded / totalSize * 100}%` }} className='progress-bar__bar' />
         </div>
         <div>
            {`${filesAmount} files loaded`}
         </div>
         <div>
            {`${parseInt(sizeUploaded / 10000) / 100}/${parseInt(totalSize / 10000) / 100} MB total size`}
         </div>
      </div>
   )
}