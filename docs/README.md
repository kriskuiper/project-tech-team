# Drinkerz, serious about dating

![Screenshot of the project]()

Drinkerz is a web-app where students from Amsterdam can meet other (single) students by meeting eachother at a café. The user can create an account and log in. (More features described here)

## Features we've worked out:

- Filter gender / favo beer ([Chazz](https://github.com/chazzers))
- Bars nearby ([Aron](https://github.com/aronsmit2))
- Login with Untappd ([Rick](https://github.com/root-ish))
- Geolocation and code support ([Kris](https://github.com/kriskuiper))
- Make it a PWA, doesn't have to be offline available ([Kris](https://github.com/kriskuiper))
- Liking/disliking other users ([Mark](https://github.com/markschuttehva))

## Packages

| Name                                                               | Purpose                                                               |
| ------------------------------------------------------------------ | --------------------------------------------------------------------- |
| [`express`](https://www.npmjs.com/package/express)                 | Used for setting up the server and routes.                            |
| [`express-session`](https://www.npmjs.com/package/express-session) | Used for saving data in sessions                                      |
| [`lodash`](https://www.npmjs.com/package/lodash)                   | Used for filtering the users on `/users` when they are already liked. |

## Installation

### Prequisites

- Install MongoDB
- Have a MongoDB database up and running, preferrably on the cloud by using something like [Atlas](https://www.mongodb.com/cloud/atlas) or [MLab](https://mlab.com/)
- Have a configured `.env` file:

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
