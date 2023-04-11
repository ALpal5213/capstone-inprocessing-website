
## Table of Contents

- [Description]
- [Installation]
- [Usage]
- [Removal]
- [Extraneous]



## Description



#### Technologies Used
##### Front-end 
+ Framework
	+ React <sub>18.2.0</sub>
+ Routing
	+ React Router <sub>6.10.0</sub>
+ Styling
	+ React-Bootstrap <sub>2.7.2</sub>
	+ MUI Material <sub>5.11.16</sub>
+ Cookie Management
	+ js-cookie <sub>3.0.1</sub>


##### Back-end 
+ Framework
	+ Express <sub>4.18.2</sub>
+ Database
	+ PostgreSQL <sub>8.10.0</sub>
+ Database/SQL Queries
	+ Knex <sub>2.4.2</sub>
+ Data Mock
	+ FakerJS <sub>7.6.0</sub>
+ Session Management
	+ express-session <sub>1.17.3</sub>

##### Containerization
+ Docker Desktop  <sub>20.10.24</sub>

<sub> Please review the package.json in ./backend & ./frontend folders for a more detailed list of technology dependencies. </sub>

## Installation

### Quick Start with Docker

<sub> This installation guide assumes the user has the latest version of Docker desktop installed locally. Installation guide can be found [here](https://docs.docker.com/engine/install/). </sub>


1. Clone this repository into your local machine with:       **```git clone ```**

2. Navigate to the cloned repo in your local machine.

3. Open the cloned repo in vscode.

4. Open the terminal in vscode.

5. Perform the following command in said terminal:   **```docker-compose up```**

	<sub> This should install all dependencies, and perform all boot-up processes.</sub>
	
6. Wait for the front-end to finish loading, this should be the last container to load before opening the app. 

7. Open an instance of Google Chrome or a Chromium browser.

8. Type and search ```http://localhost:3000/``` into the address at the top of the page. 

	<sub> This concludes installation guide.</sub>


## Usage



## Removal

Run the following command to remove the docker image and container built for this program: **```docker-compose down --rmi all```**


## Extraneous

### Conceptual Wire Frame
