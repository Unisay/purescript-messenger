import createAuth0Client from "@auth0/auth0-spa-js";

export const _client = async () => {
  // const response = await fetch("http://puremess:8081/auth_config.json");
  // const config = await response.json();
  const config = {
    "domain": "unisay.eu.auth0.com",
    "clientId": "WZqts8HeI6kr24DWbaXqr4XrjKZIRl8f"
  }

  return createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  });
};

export const _isAuthenticated =
  (client) => client.isAuthenticated();

export const _loginWithPopup =
  (client) => client.loginWithPopup();

export const _loginWithRedirect =
  (client) => (opts) => client.loginWithRedirect(opts);

export const _handleRedirectCallback =
  (client) => client.handleRedirectCallback();
