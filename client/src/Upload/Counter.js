import React from 'react';
export default function Counter({ sizeLeft, totalSize }) {

   return <div>{`${sizeLeft}/${totalSize}`}</div>
}