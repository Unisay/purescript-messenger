import createAuth0Client from "@auth0/auth0-spa-js";

export const _client = async () => {
  const response = await fetch("http://localhost:8081/auth_config.json");
  const config = await response.json();

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
