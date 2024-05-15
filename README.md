
# Journey Planner

## Description
A MEVN-Stack application, created for users to plan their trips, view weather information for selected countries, and note down their essentials list. 

## Timeframe
5 days 

## Goal
A solo project to design a full-stack MEVN application - Vue, Node.js, Express & MongoDB. 

## Technologies Used 
- Vue.js
- Node.js
- Express
- MongoDB/Mongoose
- Nodemon
- Pinia
- Cors
- BodyParser
- VueCookies
- Git/Github

## Deployment link
Deployment link: [JOURNEY PLANNER](https://cheerful-mooncake-daa641.netlify.app/)
Backend: [Link here](https://github.com/henrietadapkute/Unit2_ProjectBackend)

Create an account to view the features of the app.

## Planning
After finalising the idea, I used Excalidraw to visualise the application and organised my thoughts on a Trello board. Wireframes, ERD, and module planning were the initial stages.

![image](https://github.com/henrietadapkute/Unit2_ProjectFrontEnd/assets/112635209/57270a52-70fb-42f4-98b3-72fc508aeaa9)

I was not able to complete all of this due to time restrictions, however, it is a great base to build more to my project later on. 

Original sketch of the project:
![image](https://github.com/henrietadapkute/Unit2_ProjectFrontEnd/assets/112635209/7e2acec4-ce99-4c36-a4f5-dff2c7002b59)

## Process
### Day 1-2 
### Backend
I defined schemas for a one-to-many relationship, enabling users to create multiple journeys. Included a schema for an essentials list with CRUD operations.

Building the backend for the Journey Planner application, I used Express for server setup and Mongoose for MongoDB interaction. Here's a detailed breakdown:

### Server Setup
![image](https://github.com/henrietadapkute/Unit2_ProjectFrontEnd/assets/112635209/a734cb08-cc66-474d-b3af-dc64286021c5)

I set up the server using Express with middleware for CORS and JSON parsing. The application listens on the specified port, and the MongoDB connection is established using Mongoose.

### Database Schemas
![image](https://github.com/henrietadapkute/Unit2_ProjectFrontEnd/assets/112635209/e343a26c-2a6e-4410-8c4e-1be79535e1bc)

I defined Mongoose schemas for journeys, hotels, flights, essentials, and users, each representing different entities in the application. As you can see, the Hotel and Flight are referenced inside of the journeySchema, which allowed me to have better data organisation inside of MongoDB and also it helps maintain data integrity by ensuring that related data remains consistent. For example, if I updated or deleted one of the collections in the database, related documents would also be able to be updated or deleted.

### Models and Routes
I first created Mongoose models based on the defined schemas to interact with MongoDB collections. 

![image](https://github.com/henrietadapkute/Unit2_ProjectFrontEnd/assets/112635209/c7d1dc7c-81f5-4fbb-b1ac-f68e010ab1bd)

I then implemented various routes for handling requests, such as fetching journeys, hotels, flights, and essentials. CRUD operations are supported, with detailed handlers for creation, reading, updating, and deleting data.

### User Authentication
![image](https://github.com/henrietadapkute/Unit2_ProjectFrontEnd/assets/112635209/6e01e480-a21e-4935-831f-7b51bc20a7e7)

I implemented a route for user login authentication, ensuring unique user entries and updating the last login timestamp.

This backend code forms the foundation for the Journey Planner application, providing endpoints for CRUD operations, user authentication, and seamless interaction with the MongoDB database.

### Frontend
Created folders for components and initiated the basic UI design.

Implemented GoogleAuth for login, which allows users to log in using their email, enabling a platform for them to view and create their journeys. 

![image](https://github.com/henrietadapkute/Unit2_ProjectFrontEnd/assets/112635209/b5ea9fb3-8f17-4126-859c-133b023b4dbb)

The above code checks whether a user session is present when the component is mounted. It checks for the presence of a “user\_session” cookie. If found, it updates a variable “isLoggedin” to true, and extracts the user's given name from the cookie data, storing it in the “userName” variable. This ensures that user authentication and session management are handled appropriately within the application.

### Days 3-5
### Frontend
- Completed integration with the backend, focusing on CRUD operations and working on user interface design.
- Integrated a Weather API into the journey page, displaying a 3-day forecast.
- Connected the Weather API to the country name on the journey page, dynamically updating the weather information. Once this was implemented, I focused on fixing any bugs, 

## Challenges
**First-time use of CRUD** operations was a learning curve, which required a lot of adjustments and improvements.
**Styling:** As the first full-stack project, revisiting and reinforcing concepts like flexbox and grid was necessary.

I had challanges during the **integration of the Weather API**, which were addressed by using Axios for effective communication between the frontend and the API. Ensuring a seamless connection between the country name on the journey page and the API required dynamic data fetching based on the journey's country name for real-time updates. 

## Wins
- Successfully built a full-stack application using Vue and gained confidence in the process.
- Implemented full CRUD operations for journeys and essentials list.
- Integrated Weather API, allowing users to dynamically view weather for planned countries.
- Used Google OAuth for user authentication.

## Key Learnings
- **Full-Stack Integration:** Connecting frontend and backend with the MEVN stack provided great experience in handling data flow between client and server.
- **CRUD Operations:** Implementing CRUD operations deepened my understanding of data manipulation and content management within the application.
- **API Integration:** Integrating the Weather API enhanced skills in handling third-party data and dynamically updating content based on real-time information.
- **User Authentication:** Implementing GoogleAuth allowed me to understand the importance of securing user-specific content and controlling access. I have used JWT tokens to keep users' sensitive details secure.

## Future Improvements
- Enhance styling and ensure mobile responsiveness.
- Display weather on the front page based on the user's location.
- Improve the holding page for a better user experience.
