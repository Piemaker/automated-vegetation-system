/*
Notification page
1-On data receival from embedded system; the value is checked aganist a global threshold of the corresponding model
2-If it's within acceptable boundires it is saved only in its model, otherwise, the data is also saved in the notification model.
3-A global notification counter is incremented with each unread notification
4-The notification count is used to dispaly the number of unread notification on the navigation menu
5-Upon openning the notification page the newest notifacaitons are then fetched from the notification model
6-Newer data ara marked by their IDs where the last notification ID is stored in a variable and only the newer IDs are fetched
7-User can click on a new notification to mark it as read
8-When the notifiaction is marked as read the notification count is decremented by one
9-User can also dismiss read notification deleting them from the notificaiton page

------
update (read/unread) field upon user interaction, keep track of unread count, fetch count on each page load
*/ 
