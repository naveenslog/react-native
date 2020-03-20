import * as Msal from "msal";
import { msalConfig } from "./conf";

const loginRequest = {
  scopes: ["openid", "profile", "User.Read"]
};

const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};

const myMSALObj = new Msal.UserAgentApplication(msalConfig);

const callMSGraph = (endpoint, token, callback) => {
  const headers = new Headers();
  const bearer = `Bearer ${token}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers
  };

  alert("request made to Graph API at: " + new Date().toString());

  fetch(endpoint, options)
    .then(response => response.json())
    .then(response => callback(response, endpoint))
    .catch(error => alert(JSON.stringify(error)));
};

const updateUI = (data, endpoint) => {
  alert(JSON.stringify(data));
  alert(endpoint);
};

export const signIn = () => {
  alert("signing in");
  myMSALObj
    .loginPopup(loginRequest)
    .then(loginResponse => {
      alert("success");
      alert("id_token acquired at: " + new Date().toString());
      alert(JSON.stringify(loginResponse));

      if (myMSALObj.getAccount()) {
        alert(JSON.stringify(myMSALObj.getAccount()));
      } else {
        alert("did get account");
      }
    })
    .catch(error => {
      alert("error");
      alert(JSON.stringify(error));
    });
};

export const signOut = () => {
  myMSALObj.logout();
};

function getTokenPopup(request) {
  return myMSALObj.acquireTokenSilent(request).catch(error => {
    alert(JSON.stringify(error));
    alert("silent token acquisition fails. acquiring token using popup");

    // fallback to interaction when silent call fails
    return myMSALObj
      .acquireTokenPopup(request)
      .then(tokenResponse => {
        return tokenResponse;
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  });
}

export const seeProfile = () => {
  if (myMSALObj.getAccount()) {
    getTokenPopup(loginRequest)
      .then(response => {
        callMSGraph(
          graphConfig.graphMeEndpoint,
          response.accessToken,
          updateUI
        );
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  } else {
    alert("not loggedin, please login first");
  }
};
