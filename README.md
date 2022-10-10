This template follows a very simple project structure:

src: This folder is the main container of all the code inside your application. 
  - actions: This folder contains all actions that can be dispatched to redux.
  - assets: Asset folder to store all images, vectors, etc.
  -  components: Folder to store any common component that you use through your app (such as a generic button)
  -  constants: Folder to store any kind of constant that you have.
  -  controllers: Folder to store all your network logic (you should have one controller per resource).
  -  localization: Folder to store the languages files.
  -  navigation: Folder to store the navigators.
  -  reducers: This folder should have all your reducers, and expose the combined result using its index.js
  -  screens: Folder that contains all your application screens/features.
      -  Screen: Each screen should be stored inside its folder and inside it a file for its code and a separate one for the styles and tests.
      -  Screen.js
      -  Screen.styles.js
  -  selectors: Folder to store your selectors for each reducer.
  -  storage: Folder that contains the application storage logic.
  -  store: Folder to put all redux middlewares and the store.
  -  test-utils: Folder to store tests-related utilities and components.
  -  theme: Folder to store all the styling concerns related to the application theme.