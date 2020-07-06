# Moonshot

- Author: Rik de Vos

## Libraries used

- React: JavaScript framework
- TypeScript: Superscript of JS to enable type checking
- Axios: For making HTTP requests. Using the browser's built-in `fetch` api is
  not supported cross-platform.
- Redux: State management library. When dealing with complicated state it's
  often a good idea to use a management library like Redux.
- LoDash: This lib is used for helper functions, in this case making an array unique.

## Architectural Decisions

- Project is nicely organised in various folders:
  - `components` for all stateless functional components
  - `containers` for stateful container components
  - `store` containing everything related to the Redux store
  - `utils` helper functions
  - `models` used for various models used throughout the app

## Completed Functionality

- Users can open the app and select a Start Date & End Date. By default, they
  are set to today and a date 3 months from now respectively.
- Users can press **Update Map** to fetch launches.
- Users can see the button changing to "Loading" when it's performing an API
  request
- Users can see an Error banner when the API
  request fails
- Users can see a list of Launch dates, after pressing **Update Map**
- Users can filter by **Agency**
- The list of Agencies is automatically updated when a new search is performed.

## ToDo functionality

- Add a Map and place Launch events on there. This data is already saved in the
  Reactive Store so it should be fairly easy. Steps would be:

  - Pass Launches to the LaunchMap component
  - Render the markers using the Map component on the correct coordinates.

  However, unfortunately in the available time I
  could not get the Map to work properly. The Map component also gives some errors.

- Add tests. I wanted to add some e2e tests using Cypress, but did not have
  enough time. This React app shipps with Jest built-in, and it would be pretty
  easy to add some tests to test the stateless components, as that's easy to do.
- Refactor part of the state management: Currently it's executing all API
  requests from the Launches component, however it would be better to use
  Asynchronous Actions to perform these async actions. This would mean we can
  move this logic away from the container, and clean it up.
- Make the UI responsive: The Form can be made responsive by simply changing the
  `flex-direction` to `column` at a breakpoint.
- Clean up imports, by for example adding an `index.ts` file to `./components`
  which exports all components.
