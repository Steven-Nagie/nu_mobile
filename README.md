# nu.world Mobile Version

### Overview

nu.world is an environmentally conscious social media app. It's built around an environmental tool called a carbon calculator. Users input information about their lifestyles, such as how much they drive and how much water they use, and the calculator outputs the user's calculated carbon emissions.

Users can customize their profile, go through the calculator and see stats about their emissions, and push themselves to decrease their impact with some suggested challenges. 

### Major Technologies
* React Native
* Node.js
* JSON Web Tokens
* PostgreSQL
* Amazon S3

### Log-In/Sign-Up
![log-or-sign screenshot](./front/images/screen_log.png)

### Main Profile
![main screenshot](./front/images/screen_main.png)

### Edit Profile
![edit profile screenshot](./front/images/screen_edit_profile.png)

### Carbon Calculator
![calculator start](./front/images/nu1.png)
![calculator mid](./front/images/nu4.png)

### Stats Page
![stats screenshot](./front/images/nu3.png)

### Challenges
![challenges screen](./front/images/nu2.png)

### Database

The PostgreSQL database stores: 
  * User information, including login information and a link to the S3 storage location for their profile picture.
  * Calculated emissions data, with a foreign key to the proper user
 
 S3 contains all user uploaded photos.
