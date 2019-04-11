# Drinkerz, serious about dating
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
|[`body-parser`](https://www.npmjs.com/package/body-parser) | Parse incoming request bodies in a middleware before your handlers
|[`cookie=parser`](https://www.npmjs.com/package/cookie-parser) | Used to read cookies from client side into the server side
|[`dotenv`](https://www.npmjs.com/package/dotenv) | Load data from the .env file, Storing configuration in the environment separate from code
|[`ejs`](https://www.npmjs.com/package/ejs) | Embedded JavaScript templates
|[`express`](https://www.npmjs.com/package/express)         | Used for building the server     
|[`express-session`](https://www.npmjs.com/package/express-session) | Used for saving data in sessions
|[`follow-redirects`](https://www.npmjs.com/package/follow-redirects) | provides request and get methods that behave identically to those found on the native http and https modules, with the exception that they will seamlessly follow redirects
|[`mongoose`](https://www.npmjs.com/package/mongoose) |  MongoDB object modeling tool designed to work in an asynchronous environment 
|[`node-fetch`](https://www.npmjs.com/package/node-fetch) | Used to hhtps request an api directly
|[`slug`](https://www.npmjs.com/package/slug) | slugifies every string, even when it contains unicode

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