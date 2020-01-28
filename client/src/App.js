import React, { useState } from 'react';
import axios from 'axios'
import './App.scss';
import Download from './Download/Download';
import Upload from './Upload/Upload';

function App() {

   function newFileUploaded(bool) {


   }


   return (
      <div className="App">
         < Upload
            newFileUploaded={newFileUploaded}
         />
         < Download />
      </div>
   );
}

export default App;
