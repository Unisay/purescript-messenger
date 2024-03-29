import createAuth0Client from "@auth0/auth0-spa-js";

export const _config =
  url => () => fetch(url).then(response => response.json());

export const _client =
  config => () => createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience
  });

export const _isAuthenticated =
  client => client.isAuthenticated();

export const _loginWithPopup =
  client => client.loginWithPopup();

export const _loginWithRedirect =
  client => opts => client.loginWithRedirect(opts);

export const _logout =
  client => opts => { return client.logout(opts) || Promise.resolve(); }

export const _handleRedirectCallback =
  client => () => client.handleRedirectCallback();

export const _getUser =
  client => client.getUser();

export const _getTokenSilently =
  client => opts => () => client.getTokenSilently(opts);

export const _buildAuthorizeUrl =
  client => opts => client.buildAuthorizeUrl(opts);

export const _buildLogoutUrl =
  client => opts => client.buildLogoutUrl(opts);
