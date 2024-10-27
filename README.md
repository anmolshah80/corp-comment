# Corp Comment

[![Build and Deploy](https://github.com/anmolshah80/corp-comment/actions/workflows/deploy_production.yml/badge.svg)](https://github.com/anmolshah80/corp-comment/actions/workflows/deploy_production.yml)

- Submit the feedback using feedback form to be rendered in feedback list
- Install and configure `vite-tsconfig-paths` to use absolute paths for imports
- Create a component to render the hashtags submitted with the feedback
- Create the `Spinner`, `ErrorMessage` and `FeedbackList` components to show the loading icon when data is being fetched, render any api errors, and render feedbacks submitted by users respectively
- Create `handleErrors.ts` file under _lib_ folder to move the switch case statements used to throw errors based on response status codes
- Filter feedback list by company names i.e., `hashtags`
- Implement `useMemo` hook to optimize the filter methods used in _App_ component

## To-dos

- Show a toaster when the server responds with `201-Created` status after submitting the feedback form
