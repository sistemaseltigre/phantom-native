# Wallet  - React Native

> This project was bootstrapped with [React Native](https://reactnative.dev/docs/environment-setup).

## Git flow and rules to use branches

This repo has two branches: `main` and `dev`, so if you want to push changes, features, hot fixes you must follow below steps:

```
git checkout dev
git checkout -b [BRANCH NAME]
git add .
git commit -m "[COMMENTS]"
git  push origin [BRANCH NAME]
```

When you finish all steps you should create a pull request to `dev` branch and wait to code review to approval your request.

> To read about pull request and git flow please [click here](https://www.atlassian.com/git/tutorials/making-a-pull-request).

### Conventional Commits

The commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

> You can read this article and lear more about how to structure your commit messages [click here](https://www.conventionalcommits.org/en/v1.0.0-beta.4/?).

## Available Scripts

In the project directory, you can run:

`yarn pods-install`

`npx react-native start`

`npx react-native run-ios`

`npx react-native run-android`

## Typescript files

> This project support Typescript files, so please always develop with it.

## Directory - folder structure

> Here is description of each folder of `src`

    ./src
    ├── api                   # Contains the API Layer of our application
    ├── assets                # Contains fonts, images, and videos
    ├── components            # The common directory will contain any reusable components. Not common would be placed inside of specific components.
    ├── constants             # Any conts values to reuse
    ├── context               # Should contain any global-level context state providers.
    ├── helpers               # Any utilities and small reusable functions
    ├── hooks                 # Would hold any custom and reusable hooks
    ├── layout                # Should have components that provide different layouts for your pages
    ├── services              # Complex business logic code that is used in a few different places
    ├── themes                # Global style values
    ├── views                 # Containers of components to create view
    ├── App.tsx               # Config of your App
    └── routing.tsx           # Routing structure and contains all views

## Test with Jest

> This project support Jest and all test files must be in `__test__` folder.

You can run test with this script:

`yarn test`

## Components - Storybook

> Always when you create a component you must set up its Storybook and test files

With Storybook for React Native you can design and develop individual React Native components without running your app.

For more information about storybook visit: [storybook.js.org](https://storybook.js.org)

You must run scripts in below order:

1. Change this line code in `./index.tsx` to available or not the use of Storybook: `const useStorybook = true;`
2. Open a terminal and run `yarn storybook`
3. Then, open other terminal and run `npx react-native start`
4. Now you can see Stroybook dashboard in `localhost:7007`
5. Open your simulator or device with your react native app

If you put the browser window and the device side by side it should look like:

![storybook example](https://res.cloudinary.com/practicaldev/image/fetch/s--242crClU--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/pie6baj8gpqu3wmgok39.gif)

### Connecting Devices

In order to work with React Native Storybook, one or more devices should be connected. Stories will only show when devices are available.

#### iOS simulator

- Start with `react-native run-ios`

#### Android emulator

- Get your AVD name with `emulator -list-avds`
- Start the emulator `emulator -avd MY_AVD_NAME`
- Forward port 8081 `adb reverse tcp:8081 tcp:8081`
- Forward port 9001 `adb reverse tcp:9001 tcp:9001`
- Start with `react-native run-android`

## Android device

- Connect your device with adb
- Forward port 8081 `adb reverse tcp:8081 tcp:8081`
- Forward port 9001 `adb reverse tcp:9001 tcp:9001`
- Start with `react-native run-android`
