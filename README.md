# Weather Demo

This is a demo web application made with React to be used for front-end tutorial workshops.

The application has most of the core functionality completed, but it is clearly in need of improvements and additional features. Follow the guide below to get started with modifying this app.

> For reference, you can visit the `solution` branch of this repository to view the intended solution.

## Project Setup

First, we'll need to prepare the project on your local machine. Follow these steps:

1. Clone or download this repository.
2. Make sure you have [Node.js](https://nodejs.org) installed.
3. In the project folder, run `npm install` in the command line.
4. Once dependencies have been installed, run `npm run dev` to run the development server.
5. Visit your local deployment at `http://localhost:5173/`

To test the app, type in a city name (such as "Seattle") in the search bar and select the shown result.

## Understanding the Code Structure

You'll want to familiarize yourself with the code structure. The bulk of the relevant code is in `src/App.tsx`, which handles the main interface rendering. The general structure of the file is as follows:

- _Imports_ at the top of the file, which declare file dependencies
- _State Variables_ defined first inside the main function
- _App Functions_ defined after the state variables
- _Return Function_ defined at the bottom, defining the JSX elements to be rendered

There are also a few component files in `src/components` that will be relevant as well. Each are imports rendered in `src/App.tsx`.

## Data Handling

The first thing we will tackle is the search bar, it only filters for cities if they are typed exactly as spelled. Find `updateSuggestions()` in `src/App.tsx`, the first app function defined. Update the following TODOs:

1. `TODO: Allow all substrings in search query`

- Instead of filtering for an exact string match, we should filter for a substring match. Use the `includes()` JavaScript method to update the filter accordingly.

2. `TODO: Prevent saved cities from appearing in suggestions`

- (Optional): We don't want saved cities to show up in the search results. Filter the results to ensure this.

## Data Fetching

At its core, this app fetches the latest weather data for a given city using an API. However, this doesn't seem to be working at the moment. Locate `fetchData()` in `src/App.tsx` and update the following TODOs:

1. `TODO: Update data cache with received data`

- The data cache is a JS object handled by React useState. Make sure to use the proper state function to update the variable value.

2. `TODO: Show error state`

- The error state is a boolean handled by React useState. Make sure to use the proper state function to update the variable value.

3. `TODO: Remove dummy data creation after fetch implementation`

- Once the data cache properly stores the data, remove the dummy data implementation denoted at this location.

Once you've completed these changes, you should see different values being shown for each city.

## Conditional Rendering

React allows you to dynamically render elements. We'll add a loading component and an error component in the popup dialog where relevant.

First, take a look at `src/components/loader.tsx` and `src/components/error.tsx`. These two files export simple functions that can be reused in other files. Here, we are only using it in `src/App.tsx`.

In the return function of `src/App.tsx`, locate the render of "City Information Dialog" near the bottom of the page. Update the following TODOs:

1. `TODO: Show Error component`

- Similarly, the "Error" component is imported at the top of the file. Use this variable to render the component here.

2. `TODO: Show loading component`

- Notice that the "Loader" component is imported at the top of the file. Use this variable to render the component here.

The `?` (JavaScript ternary operator) is used here to conditionally render components based on the state variables `errorState` and `loadingState`. Once you've implemented this correctly, you should notice a loading component when fetching a new city and an error component when failing to fetch a city name. Next, complete the remaining TODOs found below:

3. `TODO: Hide remove button if city is not added`

- Here, we are using the `?` operator to conditionally add the TailwindCSS "hidden" style. We do not want the "Remove" button to show for new cities, so update the operation to check for this.

4. `TODO: Hide remove button if city is added`

- Here, we are using the `?` operator to conditionally add the TailwindCSS "hidden" style. We do not want the "Add" button to show for existing cities, so update the operation to check for this.

Once you've added the relevant changes, the "Save" and "Remove" buttons should only show up in the relevant scenarios.

## Component Styling

The weather data in the popup dialog is very bland. All the text is the same font weight and size, so let's add more variety. Open up `src/components/info.tsx`, which defines the rendered content in the popup dialog. Update the following TODOs:

1. `TODO: Align child elements to center`
2. `TODO: Set font weight to bold, text side to 3xl`
3. `TODO: Add padding 2, blue-50 background color, lg border radius`
4. `TODO: Add Wind weather icon`
5. `TODO: Set font weight to medium, text size to lg`
6. `TODO: Set font weight to medium, text size to xl`

All of these TODOs update the styles of various elements in the dialog. They use TailwindCSS `className`s to update the style. This is much easier for style editing as opposed to traditional CSS, which is defined with separate CSS files. Refer to TailwindCSS documentation if you are stuck.

## Data Handling II

Now, we have one more issue to take care of. You may have noticed that the "Remove" button does not function properly. Locate the `removeCity()` function in `src/App.tsx`, where there is one TODO to complete:

1. `TODO: Remove cityName from saved cities list`

- Here, we are simply setting the `cities` variable to the same value, which ends up doing nothing. Use the JavaScript `filter()` function to remove the `cityName` parameter from the `cities` array.

## Future Steps

The app is mostly complete! Feel free to use this code as a reference or template for other projects. This is also a great opportunity for practice if you think a feature could be interesting to add to this application
