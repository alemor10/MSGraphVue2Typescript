# microsoftgraphvue2


## Prerequisites
Node.js installed on your development machine.
Either a personal Microsoft account with a mailbox on Outlook.com, or a Microsoft work or school account.
create an env file with your environment variables and go to /src/lib/microsoftGraph/config.ts


Project is written in typescript to understand what values are being passed and expected from the Microsoft Graph API.


## Register a web application with the Azure Active Directory admin center

Open a browser and navigate to the Azure Active Directory admin center. Login using a personal account (aka: Microsoft Account) or Work or School Account.

Select Azure Active Directory in the left-hand navigation, then select App registrations under Manage.

![alt text](https://gyazo.com/5f5f36ec51ea097f8cbbb9bbc4f72987.png)


Select New registration. On the Register an application page, set the values as follows.

Set Name to what you see appropriate for the registration.
Set Supported account types to Accounts in any organizational directory and personal Microsoft accounts.
Under Redirect URI, set the first drop-down to Single-page application (SPA) and set the value to http://localhost:3000.

![alt text](https://gyazo.com/2799b27c3c27502a5f0674afee45a892.png)

Choose Register. On the Vue Graph Tutorial page, copy the value of the Application (client) ID and save it, you will need it in the next step.
![alt text](https://gyazo.com/f1a1bbf30297a8b0afa9e0f8567d49cd.png)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



