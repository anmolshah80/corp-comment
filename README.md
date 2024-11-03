# Corp Comment

[![Build and Deploy](https://github.com/anmolshah80/corp-comment/actions/workflows/deploy_production.yml/badge.svg)](https://github.com/anmolshah80/corp-comment/actions/workflows/deploy_production.yml)

- Submit the feedback using feedback form to be rendered in feedback list
- Install and configure `vite-tsconfig-paths` to use absolute paths for imports

  - To use absolute paths while importing the files inside `src` folder, install `vite-tsconfig-paths` as a dev dependency

  ```bash
  npm install -D vite-tsconfig-paths
  ```

  - Add _paths_ key to `tsconfig.app.json`

  ```json
  {
    "compilerOptions": {
      ...all other options

      "paths": {
        "@/*": ["./src/*"]
      }
    }
  }
  ```

  - Call `tsconfigPaths` inside the _plugins_ array in `vite.config.ts`

  ```ts
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  import tsconfigPaths from 'vite-tsconfig-paths';

  export default defineConfig({
    plugins: [tsconfigPaths(), react()],
  });
  ```

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
- Implement a feature that first checks for data in `localStorage`. If the data is not found, the `API` is called to fetch it. If the API call fails or returns no data, the initial/example feedbacks from `data.json` in the `lib` folder are used instead
- Use `Immer.js` to _add_ and _remove_ selected companies and update an object's properties in **feedbackItems** array while _upvoting_ or _downvoting_ a feedback
  - Reference articles
    - [Use Zustand and Immer to Manage the state of your React app](https://dev.to/franciscomendes10866/zustand-and-immer-with-react-5ajh)
    - [Simplifying State Management with Zustand: Updating Nested Objects](https://dev.to/fazle-rabbi-dev/simplifying-state-management-with-zustand-updating-nested-objects-521g)
