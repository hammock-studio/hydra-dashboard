## Hydra Dashboard

[![CircleCI](https://circleci.com/gh/hammock-studio/hydra-dashboard.svg?style=svg&circle-token=d8865b7eaa5078a41180b75780b5db4ac730c877)](https://circleci.com/gh/hammock-studio/hydra-dashboard)

Implementation of full OAuth2 flow of login and consent with clients and users management.
Based on [ory hydra] as authorization server.

* [eco system review](#eco-system-review)
* [configuration](#configuration)
* [up and running](#up-and-running)

### eco system review

### configuration
create .env file
```
$ mv .env.example .env
```

system default environment variables:

```
PG_URL='postgres://hydra:secret@localhost:5432/hydra'
PG_TEST_URL='postgres://hydra:secret@localhost:5432/hydra-test'
HYDRA_DASHBOARD_CLIENT_ID='hydra-dashboard'
HYDRA_DASHBOARD_CLIENT_SECRET='hydra-dashboard-secret'
HYDRA_PUBLIC_URL='https://localhost:9000'
HYDRA_ADMIN_URL='https://localhost:9001'
HYDRA_CALLBACK_URI='http://localhost:3000/callback'
HYDRA_CONSENT_URL='http://localhost:3000'
NODE_TLS_REJECT_UNAUTHORIZED=0
API_VERSION=v1
```

### up and running
The steps in this section are for running hydra server,
see [hydra-cloud README] for remote server configuration.

#### prerequisites
make sure you got those installed:

* docker (on local or remote server)
* nodejs && npm

#### setup
 - clone hydra-cloud

```
$ git clone https://github.com/hammock-studio/hydra-cloud
```

- run hydra server

```
$ make reset_hydra_local_to_local
```

- clone hydra-dashboard

```
$ git clone https://github.com/hammock-studio/hydra-dashboard
```

- run hydra dashboard server

```
$ npm install && npm start
```


[ory hydra]: https://github.com/ory/hydra
[hydra-cloud README]: https://github.com/ory/hydra
