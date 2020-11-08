/*

https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authresponse_.html
AuthResponse: object
Defined in AuthResponse.ts:10
Type declaration
accessToken: string
account: Account
accountState: string
expiresOn: Date
fromCache: boolean
idToken: IdToken
idTokenClaims: StringDict
scopes: Array<string>
tenantId: string
tokenType: string
uniqueId: string

https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-browser/classes/_src_app_publicclientapplication_.publicclientapplication.html
The PublicClientApplication class is the object exposed by the library to perform authentication and authorization functions in Single Page Applications to obtain JWT tokens as described in the OAuth 2.0 Authorization Code Flow with PKCE specification.
PublicClientApplication
constructor
acquireTokenPopup
acquireTokenRedirect
acquireTokenSilent
addEventCallback
getAccountByHomeId
getAccountByUsername
getAllAccounts
getLogger
handleRedirectPromise
loginPopup
loginRedirect
logout
removeEventCallback
setLogger
ssoSilent

*/

import { UserAgentApplication, AuthResponse } from "msal";

//error handler
const isInteractionRequired = (error: any) => {
  if (!error.message || error.message.length <= 0) {
    return false;
  }

  return (
    error.message.indexOf("consent_required") > -1 ||
    error.message.indexOf("interaction_required") > -1 ||
    error.message.indexOf("login_required") > -1
  );
};


//get token function
export const getAccessToken = (
  userAgentApplication: UserAgentApplication,
  scopes: Array<string>
): Promise<string> => {
  return new Promise<AuthResponse>((resolve) => {
    resolve(
      userAgentApplication.acquireTokenSilent({
        scopes,
      })
    );
  })
    .then(({ accessToken }) => {
      return accessToken;
    })
    .catch((error) => {
      return new Promise<AuthResponse>((resolve, reject) => {
        if (isInteractionRequired(error)) {
          resolve(
            userAgentApplication.acquireTokenPopup({
              scopes,
            })
          );
        }
        reject(error);
      })
        .then(({ accessToken }) => {
          return accessToken;
        })
        .catch(() => {
          return "TOKEN_NOT_EXISTS";
        });
    });
};
