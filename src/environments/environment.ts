// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BASE_BACKEND_URL: 'http://localhost:8080',
  PAYMENT_URL: 'http://localhost:3000/v1/pagamento',
  BFF_FIREBASE: 'http://52.186.41.221',
  firebase: {
    apiKey: "AIzaSyCKnpAWaCywc-4MmZPU_GX-WNpM4Gs6fv8",
    authDomain: "puppyplace-stg.firebaseapp.com",
    projectId: "puppyplace-stg",
    storageBucket: "puppyplace-stg.appspot.com",
    messagingSenderId: "748041158321",
    appId: "1:748041158321:web:b6b28768a67b4700496c90"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
