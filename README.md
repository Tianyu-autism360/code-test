# Backend Code Test: Event Ticket Booking API

Welcome, and thanks for taking the time to do this test.

**Time limit:** 1 hour and 30 minutes, including setup.
**Stack:** Node.js, Express, MongoDB (Mongoose is installed, but you may use the native driver instead).

You design the database schema and the API (routes, request and response shapes, status codes). There is no single correct answer. We care that the system behaves correctly and that your choices are sensible.

## 1. Setup (about 10 minutes)

Prerequisites: Node.js 18 or later, Git, MongoDB running locally, and npm or Yarn (either is fine).

```bash
git clone <repository-url>
cd ticketing-code-test
git checkout -b submission/<your-first-name>-<your-last-name>
npm install               # or: yarn install
cp .env.example .env      # edit MONGODB_URI if your MongoDB is not on the default port
npm run dev               # or: yarn dev
```

Check it works: `curl http://localhost:3000/health` should return `{"status":"ok"}`.

The starter code gives you an Express app, a MongoDB connection, JSON body parsing, and an error handler. A small `asyncHandler` helper is in `src/utils/`. `src/models/Example.js` and `src/routes/example.js` are placeholders that show the conventions (an async route, returning a 400 error, a Mongoose model); rename, rewrite or delete them. Organise the rest of the code however you like.

## 2. The scenario

You are building the backend for a small ticketing platform. Organisers create **events**. Each event has several **ticket tiers** (for example `Standard` and `VIP`), and each tier has its own price and number of seats. Users **book** tickets in a tier and can later **cancel** some or all of them.

There is no authentication. Identify a user by a `userId` string sent in the request (for example `"alice"`).

## 3. Features to build

1. **Create an event** with a name, a date and time, and one or more ticket tiers. Each tier has a name, a price, and a capacity (number of seats).
2. **List upcoming events**: only events that have not started yet, sorted by date (soonest first). For each event, show every tier with its **remaining** seats.
3. **Book tickets**: a user books a quantity of tickets in one tier of an event.
4. **Cancel tickets**: a user cancels **some or all** of the tickets in one of their bookings. For example, a booking of 3 tickets can be reduced to 1. Cancelled seats become available again in the correct tier. A booking reduced to 0 tickets counts as cancelled.

## 4. Rules the system must enforce

- **No overbooking.** A tier can never have more tickets booked than its capacity.
- **Maximum 4 tickets per user per event**, counted across all tiers and all of that user's active bookings for the event. This must also hold when the same user sends several requests at the same time.
- **No booking or cancelling once an event has started** (its date and time are in the past).
- A user can only cancel their **own** bookings, and cannot cancel more tickets than the booking currently holds.
- **Invalid input** (missing fields, unknown tier, zero or negative quantity, malformed IDs, and so on) gets a 4xx response with a helpful message, never a 500.
- A non-existent event or booking gets a 404.

## 5. Document your API in `NOTES.md`

Because you design the API, we need to know how to call it. In `NOTES.md`, list your endpoints, each with an example request (curl is ideal), and briefly explain how you prevent overbooking and enforce the per-user limit. Short bullet points are fine.

## 6. Submitting

Commit your work and push your branch to GitHub:

```bash
git add .
git commit -m "Ticket booking API"
git push -u origin submission/<your-first-name>-<your-last-name>
```

That's it. We will clone your branch and run it on our machine, so do not commit `.env` or `node_modules`. If you add environment variables, add them to `.env.example`.

## 7. What we look for

In rough order of importance: correctness (especially under concurrent requests), a sensible data model, clear and consistent API design and error handling, and readable code.

**Allowed resources:** official documentation and web search. AI coding assistants are not allowed.

Good luck!
