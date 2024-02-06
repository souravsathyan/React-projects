### features
- login sgnup page
    - login/signup form
    - once done redirect to browser page
- browse page (after authentication)
    - Header
    - main movie
    - trailer in bg
    - title n discription
    - movie suggestions
        - movie lists
- NetflixGPT
    - Search bar
    - Movie suggestions

### Hooks
- useRef
    - lets us reference a value that's not needed for rendering
    - reference to the DOM elements
    - steps
        - create a useRef() variable
            - ```const password = useRef(null)``` 
        - give reference to the element we want
        -```<input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-4 my-4 bg-gray-700 w-full"
            />```

# taking form data
- 2 ways
    - using state variables
    - using useRef hook

# firebase deployment
- firebase login
- firebase init
- select Hosting: Configure files for 
Firebase Hosting and (optionally) set up GitHub Action deploys
- select Use an existing project
- netflix-clone-84dac (netflix 
clone)
### give this info correct
- ? What do you want to use as your public directory? build
- ? Configure as a single-page app (rewrite all urls to /index.html)? No
- ? Set up automatic builds and deploys with GitHub? No

- build our project
- firebase deploy
    - will deploy our project and gives a live url