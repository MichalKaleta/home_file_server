import React, { useState } from 'react';
import axios from 'axios'
import './App.scss';
import Download from './Download/Download';
import Upload from './Upload/Upload';

function App() {
   return (
      <div className="App">
         < Upload />
         < Download />
      </div>
   );
}

export default App;
