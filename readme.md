  <h2 align="center">Project Info</h2>

<h4>
What all this Project Contains.
</h4>

<ol>
<h5>
Tech Stack
</h5>
<ul>
	<h6>FrontEnd.</h6>
	<p>For the FrontEnd Part I have used Html, CSS, SCSS and Javascript</p>
	<h6>BackEnd.</h6>
	<p>In the Backend I have used Javascript, Node.js and For DataBase I have used MongoDb.</p>
</ul>

<h5>
Lists of Libraries and Frameworks.
</h5>
<ol type="I">
<li>I have <strong><a href="https://expressjs.com/">Express</a></strong> as a Node.js Application Web FrameWork.</li>
  <li>I have used <strong><a href="http://www.passportjs.org/">Passport.js</a></strong> for Authentication.</li>
  <ol>
  <li>In this I have used Passport-local-strategy</li>
  </ol>
  <p>
  <em><strong>NOTE:</strong>I've created Two branches one for Manual Authentication which uses cookie-parser and the other is master/main branch which uses passport.js for authentication.</em>
  </p>

<li>I have used <strong><a href="https://www.npmjs.com/package/connect-mongo">Mongo store </a></strong>to store the session cookie.</li>
<li>I have used <strong> <a href="https://sass-lang.com/">SCSS</a> </strong>in place of CSS for a better way of Writing Style.</li>
<ol>
  <li>For this I have used node-sass-middleware package.</li>
  <li><em>Info:</em>  SCSS gets converted to css at the time of loading page in "Development Mode" and in "Production Mode" at the time of starting the server.(Optimized)</li>
  </ol>

<li>I have created  <strong> <a href="https://www.techopedia.com/definition/25122/one-to-many-relationship">three (one : many) Relationships</a></strong> to code posts and comments</li>
	<ol>
	<h6>
	Types
	</h6>
	<li>User has many Posts.</li>
	<li>User has many Comments.</li>
	<li>Posts has many comments.</li>
  </ol>

<li>I have used <strong><a href="https://www.npmjs.com/package/flash-messages">Flash Messages</a></strong> to display some messages (like Signin/Signout, post submitted etc)</li>

<li> I have used <strong><a href="https://www.npmjs.com/package/noty" >Noty.js</a></strong> for propper Animated Notfications with<strong> <a href="https://www.npmjs.com/package/flash-messages">Flash Messages</a></strong>(which were setup in session cookies).</li>

<ol>
<li>For Session Cookies I have used <strong><a href="https://www.npmjs.com/package/connect-flash">connect-flash</a></strong> package.</li>
<li><em>NOTE: </em>Also Improved callback hell to async await.</li>
</ol>

<li>I have used <strong><a href="https://www.w3schools.com/xml/ajax_intro.asp">Ajax</a></strong> to create dynamic posts and comments.(means everytime I upload a post or make an comment the change should happen dynamially instead loading the whole page again.)</li>

<li>I have used <strong><a href="https://www.npmjs.com/package/multer">Multer</a></strong> for handling <strong><a href="https://www.w3schools.com/tags/att_form_enctype.asp">multipart/form-data</a></strong>which is used for uploadig files.(in my case it's the user avatar)</li>

<li>I have used <strong><a href="https://www.npmjs.com/package/morgan">Morgan</a></strong> for <strong>Production Logs</strong></li>
<ol>
<li>With Morgan I have also used <strong><a href="https://www.npmjs.com/package/rotating-file-stream">Rotating-files-stream(rfs)</a></strong> package to rotate the writing in files ones they reach some specific threshold.</li>
</ol>

<li>I have created my own <strong>API on Server side.</strong> using <strong><a href="https://jwt.io/">jwt </a></strong>for Authentication.</li>
<ol>
<li>Used <strong><a href="http://www.passportjs.org/packages/passport-jwt/">Passport-jwt</a></strong> and <strong><a href="https://www.npmjs.com/package/jsonwebtoken">Json Web Token</a></strong></li>
</ol>

mailers

<li>I have used <strong><a href="https://devdojo.com/tnylea/understanding-polymorphic-relationships">Polymorphic Relationships(many : many)
</a></strong>for Friends and Likes</li>
<ol>
<li>The Relationship is implemented via <strong>Through</strong>(Self Referential m : m)</li>
</ol>

<li>I have created <strong>Chat Engine</strong> using <strong><a href="https://socket.io/">Sockets.io</a></strong></li>

<ol>
<li>not 1 to 1 interaction in chat box but created a chat room where multiple users are able to join and chat with each other.</li>

</ol>

<h3>Deployment and Production Part (changes/configurations)</h3>

<li>For this I have setted up the <strong>Enviroment</strong> for <strong>Development</strong> and <strong>Production</strong></li>
<ol>
<li>In Development Environments all the keys and secrets are visible but in Production Environments everything is put into <strong>bash_profile.</strong> and in <em>Windows they are environment Variables.</em></li>
</ol>

<li>Used <strong><a href="https://gulpjs.com/">Gulp</a></strong> to minify Js, css and Images</li>

<li><strong>Deployment </strong> is done on <strong><a href="https://aws.amazon.com/">Amazon AWS</a></strong> where I have created an ec2 machine(vps) ran the instance and configured putty to get a terminal in which I have logged in using .ppk file</li>

<p>
:: Also configured the <strong><a href="https://www.nginx.com/">Nginx</a></strong> (reverse Proxy), got it working but chat sockets is not working. some cors issue is there. <strong>Need to Fix this Bug.</strong>
</p>

</ol>
