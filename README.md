# Automated-Vegetation-System
![Hydroponic System](https://image.freepik.com/free-vector/hydroponic-farm-man-harvesting-organic-vegetable-from-hydrophonic-green-house-concept-cartoon-illustration_201904-462.jpg)
***
## Description
 This is a web application that aims to provide assistive information through visual representations (graphs) and verbal messages (notification) to help in decision making and monitoring of the plant condition.
## Features
### Stats Page
You can now navigate to statistics page and get data from 3 tables (temperature, PH, electric conductivity) 
You can do the following:

1. Get previous/next pages in each graph (you can choose a graph from the 3 icons at the bottom of the graph, temperature graph is chosen by default), when no pages are available the chevron will disappear.

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

***
## Tools
This is a web application using :
   1. HTML to define the content of web pages.
   2. CSS to specify the layout of web pages.
   3. JavaScript to program the behavior of web pages.
   4. Node JS for backend development (server intiallization, routing and serving of web content).
   5. MongoDB for database storage.
   6. Mongoose for object modeling of the database (defintion of schemas for each table in the database).
   7. replit as an IDE and the current server hosting.
   8. github for version control.
***
## Diagrams

### Use Case

![Use Case](https://lucid.app/publicSegments/view/dba41fef-a07c-4026-aaa7-477988e258f7/image.png)

***
### Stats Page Flow Diagram
![Stats Page Flow Diagram](https://lucid.app/publicSegments/view/c32db136-00b7-4e99-9f3d-b96f04df8a76/image.png)

***
### Notification Page Flow Diagram
![Notification Page Flow Diagram](https://lucid.app/publicSegments/view/f66941cc-f6d3-43bd-884d-17ce6a03e953/image.png)
