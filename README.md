# CoordTrack

## Project Description

CoordTrack is a real-time tracking and visualization project where a white dot spawning with mouse click in the 3D coordinate plane and moves towards a randomly generated green dot. The movement of the dot is visualized in real-time using Chart.js and transmitted via Socket.io. As the dot moves, the status of the transaction (success or failure) is displayed and numbers are tracked for each. This project is especially useful for real-time data monitoring and visualization applications.

## Features

- 3D Coordinate Tracking: Track the movement of a white dot in a 3D coordinate system.

- Real-Time Visualization: Movements are visualized using Chart.js.

- Socket.io Integration: Real-time data transmission and updates for smooth operation.

- Success/Failure Status: The movement's success or failure is displayed after completion.

- Real-Time Data Updates: The dot's movement and status are updated in real-time as they occur.

## Installation

To run this project, you need to have Node.js (version 20.16.0 or above) installed. If you don't have Node.js installed, download it.

Clone the repository to your local machine:

- git clone https://github.com/alperkaplan30/CoordTrack.git

- cd CoordTrack

Install the necessary dependencies:

- npm install

- Start the project:

- npm start

- This will start the project, and you can access it at http://localhost:3000 in your browser.

## Usage

- After starting the project, a white dot will spawn on the 3D coordinate plane when clicked.

- The dot will move towards a randomly generated green point.

- The movement is visually represented in real-time using Chart.js.

- Socket.io is used for transmitting movement data in real-time.

- Upon completion of the movement, the success or failure status is displayed.

## Technologies Used

- Node.js: For server-side application development.

- Express.js: Web framework for routing and HTTP handling.

- Chart.js: For visualizing the movement of the dot in 3D space.

- Socket.io: For real-time communication and data updates.

- Pug: Template engine for rendering HTML on the server side.

- Date-fns: For handling date and time operations.

- eslint: For maintaining code quality through static analysis.

## Dependencies

- chart.js: For data visualization.

- socket.io: For real-time data transmission.

- express: Web server framework.

- pug: HTML templating engine.

- cors: For enabling Cross-Origin Resource Sharing (CORS).

- cookie-parser: For cookie management.

## Contributing

If you would like to contribute to this project, please follow these steps:

- Fork the repository.

- Create a new branch for your changes.

- Make your changes.

- Submit a pull request describing your changes.

- Please ensure that your changes adhere to the existing code style and include necessary tests if applicable.

![Screenshot_1](https://github.com/user-attachments/assets/e3cbcc3b-fdea-43c7-9074-e69fa85cabf3)
![Screenshot_2](https://github.com/user-attachments/assets/78dc82f7-6848-4f76-a257-40bed2e5869d)
![Screenshot_3](https://github.com/user-attachments/assets/e245ea76-7fb5-4bc4-b46b-33c9f9f966f0)


