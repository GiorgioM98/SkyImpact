## Overview

The platform aims to inform users about the amount of CO2 pollution resulting from their air travel.
It is possible to view it directly online at the following link: 


### Dashboards

The design of the platform was created with a minimalist and modern style. 
The dashboard features colors designed specifically for the type of application.


## Home

The Home is characterized by a brief general description of the platform, followed by concise data on various airlines present on the market


## Footprint

In this section you can calculate your footprint resulting from air travel.
In the left box you must set the place of origin, destination, the class in which you are traveling (chosen from those available) and the number of passengers if you want to directly calculate the total.
Finally just press the ''Calculate now'' button.
The results will appear in the right pane.


## Footer

The footer features the developer's info with the link to his LinkedIn profile.


## Installation Guide

To initialize the project on your device, follow the steps below:

1. Clone the repository to your local system.
2. Run `npm install` to install the dependencies.
3. Configure the local environment, if necessary.
4. Run `ng serve --open` to launch the application in development mode and wait for the browser to open automatically.


## Project Structure

The project is structured as follows:

- `src/`: Contains the application source code.
  - `app/`: Contains the app components, services and modules.
  - `assets/`: Contains assets such as images and static files.
- `node_modules/`: Contains project dependencies.
- `angular.json`: Configuration file for Angular CLI.
- `package.json`: Configuration file for project dependencies.


## Solving Common Problems

### Problem: The application does not launch correctly

- **Solution:** Make sure you have run `npm install` to install the dependencies. Check the console for any errors during startup.


## API Endpoints

The application interfaces with the GoClimate API to provide travel footprint calculation functionality.

L'endpoint è il seguente: 
-GET:  /v1/flight_footprint


This project was generated with version 17.3.0. ('https://v17.angular.io/docs')
