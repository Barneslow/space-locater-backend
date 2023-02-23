import { CognitoUser } from "@aws-amplify/auth";
import { Auth } from "aws-amplify";
import { Amplify } from "aws-amplify";
import { config } from "./config";

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.REGION,
    userPoolId: config.USER_POOL_ID,
    userPoolWebClientId: config.APP_CLIENT_ID,
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});

export class AuthService {
  public async login(userName: string, password: string): Promise<CognitoUser> {
    const user = (await Auth.signIn(userName, password)) as CognitoUser;
    console.log(user);
    return user;
  }
}
