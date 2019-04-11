# Drinkerz, serious about dating
![our logo](https://github.com/kriskuiper/project-tech-team/blob/update/readme/app/static/media/images/icons/apple-touch-icon-180x180.png?raw=true)
![Screenshot of the project]()

Drinkerz is a web-app where students from Amsterdam can meet other (single) students by meeting eachother at a café. The user can create an account and log in. (More features described here)

## Features we want to workout (Have to make decisions about what (not) to do)
- Filter gender / favo beer ([Chazz](https://github.com/chazzers))
- Bars nearby ([Aron](https://github.com/aronsmit2))
- Login with Untappd ([Rick](https://github.com/root-ish))
- Last visited (checked in) bar ([Kris](https://github.com/kriskuiper))
- Make it a PWA ([Kris](https://github.com/kriskuiper))
- Liking other users ([Mark](https://github.com/markschuttehva))
- ~~Login, To use the website~~
- ~~Register, To make a account and use the website~~
- Password hash, To make sure their passwork is kept safe in a database ([Somebody]())

## Packages
| Name             | Purpose                          |
|------------------|----------------------------------|
|[`array-find`](https://www.npmjs.com/package/array-find) | Used for finding array elements and executing a callback for each element
|[`body-parser`](https://www.npmjs.com/package/body-parser) | Used to parse all our forms
|[`cookie-parser`](https://www.npmjs.com/package/cookie-parser) | Used for pasing cookies `geolocation`
|[`dotenv`](https://www.npmjs.com/package/dotenv) | Load data from the .env file, Storing configuration in the environment separate from code
|[`ejs`](https://www.npmjs.com/package/ejs) | Our templatting language
|[`express`](https://www.npmjs.com/package/express)         | Used for building the server     
|[`express-session`](https://www.npmjs.com/package/express-session) | Used for saving data in sessions
|[`follow-redirects`](https://www.npmjs.com/package/follow-redirects) | Used to rqeuest data from Google API in `bar locations`
|[`mongoose`](https://www.npmjs.com/package/mongoose) |  Used to model our Mongodb database
|[`node-fetch`](https://www.npmjs.com/package/node-fetch) | Used to hhtps request an api directly in `bar locations` and `untappd login`
|[`slug`](https://www.npmjs.com/package/slug) | used to change an url to all lowercase in `add beers`

## Installation
### Prequisites
* Install MongoDB
* Have a MongoDB database up and running, preferrably on the cloud by using something like [Atlas]() or [MLab]()
* Have a configured `.env` file:
```
MONGODB_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret
```

### Datamodel
![Image of the datamodel]()

### 1. Clone this repository
Clone this repository by running `git clone`:
```
git clone https://github.com/kriskuiper/project-tech-team.git
```

### 2. Install npm packages
Install the necessary npm packages by running `npm install`:
```
npm install
```

### 3. Running the application
You can run the development environment of the app by running `npm run dev`. Nodemon will fire up and let you know at which port the app is running:

```
npm run dev
```


## Team members
1. [Kris Kuiper](https://github.com/kriskuiper)
2. [Rick van der Straeten](https://github.com/root-ish)
3. [Mark Schutte](https://github.com/markschuttehva)
4. [Chazz Mannering](https://github.com/chazzers)
5. [Aron Smit](https://github.com/aronsmit2)