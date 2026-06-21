To log in to Firebase CLI: `firebase login`

To log out: `firebase logout`

If it comes up with an authentication error: log out and back in, or reauthenticate with `firebase login --reauth` ([Post on StackOverflow](https://stackoverflow.com/questions/52891500/http-error-401-while-setting-up-firebase-cloud-functions-for-android-project))

To serve local website for testing: `firebase serve --only functions, hosting`

