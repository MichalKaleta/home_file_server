# home_file_server
Backup your files on home network server using web app client.
It will keep uploaded directory strucure 

<b>Tech stack: </b> <br />
Client: React, Sass <br />
Server: Node , Express, Express-Fileupload <br />

<b>INSATLL</b><br />
There are 2 separate package.json files for server and client
<code>npm install</code> in both <code> ./ and ./client </code>

<b>development server</b> on localhost:3000 <br />
<code> npm run dev </code>

<b>production</b> <br />
server will serve static files from <code>./client/build</code> <br/>
<code> npm run script build</code> from <code>./client</code> directory