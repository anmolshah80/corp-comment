# Corp Comment

[![Build and Deploy](https://github.com/anmolshah80/corp-comment/actions/workflows/deploy_production.yml/badge.svg)](https://github.com/anmolshah80/corp-comment/actions/workflows/deploy_production.yml)

- Submit the feedback using feedback form to be rendered in feedback list
- Install and configure `vite-tsconfig-paths` to use absolute paths for imports
- Create a component to render the hashtags submitted with the feedback
- Create the `Spinner`, `ErrorMessage` and `FeedbackList` components to show the loading icon when data is being fetched, render any api errors, and render feedbacks submitted by users respectively
- Create `handleErrors.ts` file under _lib_ folder to move the switch case statements used to throw errors based on response status codes
- Filter feedback list by company names i.e., `hashtags`
- Implement `useMemo` hook to optimize the filter methods used in _App_ component
- Filter feedback list by selecting multiple companies' hashtags
- Create a `utils.ts` file under _lib_ folder to include the commonly used function to capitalize the company name
- Upvote or downvote feedbacks upon clicking the button
- Focus _textarea_ field on `/` (forward slash) keydown
- Use `Context API` to avoid unnecessary _props drilling_
- Install and configure `Zustand` to replace the `Context API` currently used in the app
