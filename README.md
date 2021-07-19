# Automated-Vegetation-System
![Hydroponic System](https://image.freepik.com/free-vector/hydroponic-farm-man-harvesting-organic-vegetable-from-hydrophonic-green-house-concept-cartoon-illustration_201904-462.jpg)
***
## Description
 This is a web application that aims to provide assistive information through visual representations (graphs) and verbal messages (notification) to help in decision making and monitoring of the plant condition, it is connected to an embedded system providing readings like temperature, and uploads images that get processed by a deep learning algorithim on a seperate server to know the state of the plant.
## Features

### Home Page
The home page contains the latest readings from each sensor, providing a quick preview of the status of the plant.
![Home Page1](https://media.milanote.com/p/images/1LGrkk1FNLFpdV/XFv/image.png)
![Home Page2](https://media.milanote.com/p/images/1M4WcQ19bgf5dz/Rnf/image.png)
***
### Stats Page
You can now navigate to statistics page and get data from 3 tables (temperature, PH, electric conductivity) 
You can do the following:

1. Get previous/next pages in each graph (you can choose a graph from the 3 icons at the bottom of the graph, temperature graph is chosen by default), when no pages are available the chevron will disappear.

![Statistics Page](https://media.milanote.com/p/images/1M4Wkf19bgf5dA/Fqp/ezgif.com-gif-maker%20%284%29.gif)

![Statistics Page1](https://media.milanote.com/p/images/1M4WlE19bgf5dB/qN8/image.png)
![Statistics Page2](https://media.milanote.com/p/images/1M4WmG19bgf5dC/3ik/image.png)

2. You can specify a filter on the minimum value and the max value , the beginning date and the last date as well as the limit of points of each graph, on submitting you will get the result displayed on the corresponding graph , if the filtered result is  greater than the limit you specified you can simply use the next/previous buttons to navigate through the result.

3. If no filter is specified, the default value will be used.
4. You can use the reset button to reset the form data to the default.

***
### Notification page
Any reading from the MC are checked if they are within desired levels, otherwise, they will be stored as notification for the user.
You can do the following:

1. Check if new notification are present notifications include useful information like the measured value, its deviation from norm, its date, if it's below or above average and which table it comes from , if none are present, a notification message will be displayed indicating no notifications are present.
2. You can mark notifications as read by clicking any of the notification's edges, the notification color will change accordingly, any read notifications will not be shown again.
3. You can dismiss any notification which will delete the notification and mark it as read; so it won't show again. 
4. When no notificaion is present; a default message will inform that everthing is ok.
![Notification Page](https://media.milanote.com/p/images/1M4WqL19bgf5dD/F7k/ezgif.com-gif-maker%20%285%29.gif)
![Notification Page](https://media.milanote.com/p/images/1M4WrC19bgf5dE/gU5/image.png)

***
## Tools
This is a web application using :
   1. HTML to define the content of web pages (later used a templating engine (EJS).
   2. CSS to specify the layout of web pages.
   3. JavaScript to program the behavior of web pages.
   4. Node JS and Express for backend development (server intiallization, routing and serving of web content).
   5. MongoDB for database storage.
   6. Mongoose for object modeling of the database (defintion of schemas for each table in the database).
   7. Replit as an IDE and the current server hosting.
   8. github for version control.
***
## Diagrams

### Use Case

![Use Case](https://lucid.app/publicSegments/view/6c1ed04e-a8fa-41bc-b79b-c379b806ce8c/image.png)

***
### Stats Page Flow Diagram
![Stats Page Sequence Diagram](https://lucid.app/publicSegments/view/c32db136-00b7-4e99-9f3d-b96f04df8a76/image.png)

***
### Notification Page Sequence Diagram
![Notification Page Sequence Diagram](https://lucid.app/publicSegments/view/f66941cc-f6d3-43bd-884d-17ce6a03e953/image.png)

***
## Project Steps
### Finished Project Steps
1. Boiler Plate for Project
2. Statistics Page
3. Navigation Menu
4. Navigation Routing
5. Graph for each measured unit
6. Make dummy data
7. Store data in database
8. Plot graphs
9. Notification Page
10. Use Case Diagram
11. Sequence Diagram Notification Page
12. Sequence Diagram Statistics Page
13. Make a diagram of the project
14. Add notification counter
15. Current status for each table in home page

### To do
1. Receive data from embedded app
2. Receive data from deep learning app