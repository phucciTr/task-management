Please follow these step for a demo:
- Make sure that you already have npm and mySQL-server installed globally, and that your mySQL-server does not have a password as this project will try to access your mySQL-server without a password.

- After cloning the repo, cd into the root directory of the repo.

- Please login to your mysql database from the command line and drop the database name "task-management" as this project will have different structure for the tables compares to the previous one, so the old database needed to be removed for the createtion of the new one. (This is needed to be done once after you clone this repo for the first time)

- Once in the root directory of this repo, run this command without the quotes "npm run install".

- Once the installation is complete, run this command without the quotes "npm run demo".

- Go to your browser, preferably Chrome and type into your address bar without quotes "http://localhost:3000/".

- Click on Sign Up and create a new account, then it will redirect you to login

- Log in with your newly created account

- Try to add new tasks, edit your newly created tasks, delete present tasks and refresh your browser each and every time after you complete one of the mentioned activities and you will see the the data is still present as it was before you refresh the page since the data are being persisted in the mySQL database.

- Choose a filter to filter the data displayed, try to enter some data with the same priority but with different dates, and some data with the same month but different date. (!Note that the more prioritized a task is, the lower value in the priority task and the same concept applies for the date and month).

- Please do note that the filter will reset on page refresh, as it is being implemented on the client side and is not being persisted on the server/database.

- Log out of your account and try to create another account

- Log in with the new account and add some tasks then logout

- Log in with the first account and observe that each account has its own dedicated table persisted