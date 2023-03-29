Please follow these step for a demo:
1. Make sure that you already have npm and mySQL-server installed globally, and that your mySQL-server does not have a password as this project will try to access your mySQL-server without a password.

2. After cloning the repo, cd into the root directory of the repo.

3. Once in the root directory of this repo, run this command without the quotes "npm run install".

4. Once the installation is complete, run this command without the quotes "npm run demo".

5. Go to your browser, preferably Chrome and type into your address bar without quotes "http://localhost:3000/".

6. Try to add new tasks, edit your newly created tasks, delete present tasks and refresh your browser each and every time after you complete one of the mentioned activities and you will see the the data is still present as it was before you refresh the page since the data are being persisted in the mySQL database.

7. Choose a filter to filter the data displayed, try to enter some data with the same priority but with different dates, and some data with the same month but different date. (!Note that the more prioritized a task is, the lower value in the priority task and the same concept applies for the date and month).

8. Please do note that the filter will reset on page refresh, as it is being implemented on the client side and is not being persisted on the server/database.