# MLH Show & Tell

Repo for MLH Show & Tell demonstrating how to build a Full Stack Web Application with Django and React.js (Create React App).

## Prerequisites

- Python3
- Node.js
- NPM

## Instructions

Create virtual environment and activate:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip3 install django
```

Setup the database with:

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

Start Django with:

```bash
python3 manage.py runserver
```

Create a production build for React with:

```bash
cd frontend && npm run build
```

Go to http://localhost:8000.

## Notes

- to start the React development server, use `cd frontend && npm start`
- API routes have been made CSRF exempt
- CORS issues with the React development server are avoided with a proxy setting