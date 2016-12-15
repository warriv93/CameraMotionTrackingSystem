# Axis Camera Motion Detection Tracking System
A javascript application illustrating with google charts the amount of movement there is detected on the connected axis camera at a specific date and time.

## Prerequisites
* Mongodb will need to be installed and running with default settings.
* Nodejs will need to be installed.
* Chrome should optimally be installed and used for viewing the webpage. (Firefox will be fine but the date pickers works better in Chrome).

## System 

### Axis camera
The axis camera works as a client to the server in this setup with a single goal to send HTTP notifications to the server when some kind of motion is detected. We managed this by adding an event and a event trigger though the cameras GUI interface (Axis Video Motion Detection), which is strongly recommended by the assignment instructions.

### Server
The server code is written in JavaScript. It runs on Nodejs, with standard setup libraries like express for routing and mongoose for Mongodb management, etc. ​Mongodb was chosen because of the ease of use with the mongoose driver and for a full-stack JavaScript solution. The server acts as a middleware for the camera and the user client. It stores the motion data acquired from the camera and then allows the client to retrieve it by a simple HTTP GET request for it. The server is similar to a REST web service, but a very simple one with GET and POST operations. We did not see any reason to add something more advanced for this assignment. However, it can easily be extended if needed.

### Client
The second client in our solution is a website developed using HTML, CSS and JavaScript. We did also include the jquery library to increase productivity. We chose to create a website since it allows easy access from anywhere and on any device. The client's purpose is to illustrate the detected motion by the camera over a specified time period to the user. This time period can be set in the client and the data, in JSON, for that period is received from the server and passed to a Google Chart Timeline to make the data more comprehensive. We think the timeline chart illustrates the data to the user in a simple and easy to understand manner.

### Protocol
When some kind of motion in front of the camera presents it self, a HTTP notification is send from the camera to our Nodejs server.​​The server then processes the notification by saving a timestamp on when the notification was received to a Mongodb. This then allows the website client to retrieve the data from the database using Ajax HTTP requests. When the data, in JSON, is retrieved we show the data to the user with the help of Google Charts Timeline. Regarding that every detected motion only is illustrated for one second in the timeline is related to that the camera only sends a response when the motions started. We would need to conduct more investigation on the Axis Video Motion Detection to see if this is supported. Maybe the interface provides a way to also send a response when the motion stops or maybe we could retrieve the information some other way, for example though a request to a log file on the camera or something similar.
