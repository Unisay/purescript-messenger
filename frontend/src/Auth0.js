import createAuth0Client from "@auth0/auth0-spa-js";

export const _config =
  url => fetch(url).then(response => response.json());

export const _client =
  config => createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  });

export const _isAuthenticated =
  client => client.isAuthenticated();

export const _loginWithPopup =
  client => client.loginWithPopup();

export const _loginWithRedirect =
  client => opts => client.loginWithRedirect(opts);

export const _handleRedirectCallback =
  client => client.handleRedirectCallback();
