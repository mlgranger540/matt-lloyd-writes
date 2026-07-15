To log in to Firebase CLI: `firebase login`

To log out: `firebase logout`

If it comes up with an authentication error: log out and back in, or reauthenticate with `firebase login --reauth` ([Post on StackOverflow](https://stackoverflow.com/questions/52891500/http-error-401-while-setting-up-firebase-cloud-functions-for-android-project))

To serve website locally for testing during development: `firebase serve --only functions, hosting`

To deploy changes to the live website: `firebase deploy`

To set up automatic deploys when pushing to GitHub: `firebase init hosting:github` and follow steps (don't allow automatic builds or something as we don't need that)
