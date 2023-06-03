# RunninTrackApp

## Project Overview

NodeJS, React and MongoDB app for managing the schedule and classes at the running track.

### Users
- Student:
    Students can register to available lessons or look up for his registered lessons.
- Instructor:
    Instructors can look up for his lessons and add or edit time slots for lessons.
- Admin: 
    Admin can do everything Instructor can do. in addition, he can add new instructors and schedule lessons from available time slots.

## Prerequisites
- Docker 

## Installation Instructions (for running local)
1. Clone the repository on a unix environment.
2. change project/client/port -> port = 'localhost'
3. add in project/server/.env -> url for mongoDB connection
4. Change into the project directory.
5. Build the Docker image.
6. Run the Docker container.
7. Access the project in your browser: http://localhost:3000

## Running on AWS
Access the project in your browser: http://13.41.188.37:3000  (13.41.188.37 may change because its running on a free AWS)




## Examples
### Login Page:
![image](https://github.com/alonshlomi1/RunningTrackApp/assets/98226796/720bc65e-3574-4ae5-9556-a4ee1317780c)
- login as student with: email: s1@gmail.com, password: 123
- login as instructor with: email: i2@gmail.com, password: 123
- login as admin instructor with: email: i1@gmail.com, password: 123

### register as new student:
![image](https://github.com/alonshlomi1/RunningTrackApp/assets/98226796/9f651256-8ad2-4286-8f6a-aa7b359be9dc)

#### All users pages:
![image](https://github.com/alonshlomi1/RunningTrackApp/assets/98226796/93359fd7-657f-4c2e-9752-e9ef148ec16d)
- shows all the lessons that the user is participating in.

### Student pages:
![image](https://github.com/alonshlomi1/RunningTrackApp/assets/98226796/241be518-8c5e-4ab6-ae6d-f02e9c39281c)
- Lesson registration.

### Instructor pages:
![image](https://github.com/alonshlomi1/RunningTrackApp/assets/98226796/21b755bc-4c6b-4752-967c-2903d35cacaa)
- Add new available time slots for lessons.
![image](https://github.com/alonshlomi1/RunningTrackApp/assets/98226796/e3e80715-0e20-434a-aa1d-854370cd259d)
- Edit existing time slots.

### Admin Instructor pages:
![image](https://github.com/alonshlomi1/RunningTrackApp/assets/98226796/443be31c-de8d-42bd-b0c7-bba11426253d)
- Save lessons from available time slots

![image](https://github.com/alonshlomi1/RunningTrackApp/assets/98226796/08f7f0df-0a0b-452e-bb80-38499e47f785)
- Add new Instructor







