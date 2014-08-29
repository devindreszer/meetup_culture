# Meetup Culture
The following data visualizations use meetup.com groups to gauge city culture. Data was gathered from the meetup API for the total number of groups that a city has in each of the 33 different meetup group categories. These counts were then used to determine the relative importance of each category in a given city.

## Features
* Users can see top cities in each group category
* Users can see a breakdown of category by city
* Users can see links between similar cities
* Users can compare cities by individual group category

## Description
This project was created to meet requirements for the Final Project in General Assembly's Web Development Immersive Program (June 2014).

Intended to test our ability to use a number of different skills acquired throughout the course.

This project was conceptualized, scoped and developed in one week.

Meetup Culture is built on the following:
> * Rails API
> * PostgreSQL
> * Meetup API
> * Automated Rake Tasks
> * AngularJS
> * D3.js
> * SVG
> * Foundation
> * Compass
> * Sass
> * CSS3 animations

## Requirements
* Meetup API key from [meetup.com](http://www.meetup.com/meetup_api/)
* Ruby 1.9+
* [Node.js](http://nodejs.org)
* [compass](http://compass-style.org/): ```gem install compass```
* [bower](http://bower.io): ```npm install bower -g```

## Installation
To begin:
* Fork and clone
* Create .env file
* Add .env to .gitignore file
* Add API key and secret to .env file as a hash with format
```
MEETUP_KEY=XXXX
```
* Run ```bundle```

Set up Database:
* Run ```rake db:setup```
* Run ```rake meetup:similar_cities```

Compile SCSS
* cd into public directory and run ```compass watch```

## Next Steps
* Test
* Add loading gif
* Improve compatibility on more screen sizes
** Fix resizable directive
** Make SVG elements scalable
* Improve page animation (right and left)
* Add kayboard shortcuts
* Improve UX of category/city selections
** Move selection to dropdown?
** Add a selection screen?

## Contact
Contact the developer on [GitHub](https://github.com/devindreszer/)
