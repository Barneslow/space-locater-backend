import { DynamoDB } from "aws-sdk";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";

import * as dotenv from "dotenv";
import {
  MissingFieldError,
  ValidateSpaceEntry,
} from "../../Shared/InputValidator";
import {
  addCorsHeader,
  generateRandomId,
  getEventBody,
} from "../../Shared/Utils";

dotenv.config({ path: "./.env" });

const TABLE_NAME = process.env.TABLE_NAME;
const dbClient = new DynamoDB.DocumentClient();

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: "Hello from DYnamoDb",
  };
  addCorsHeader(result);

  try {
    const item = getEventBody(event);
    item.spaceId = generateRandomId();

    ValidateSpaceEntry(item);

    await dbClient
      .put({
        TableName: TABLE_NAME!,
        Item: item,
      })
      .promise();
    result.body = JSON.stringify({
      id: item.spaceId,
    });
  } catch (error: any) {
    if (error instanceof MissingFieldError) {
      result.statusCode = 403;
    } else {
      result.statusCode = 500;
    }
    result.body = error.message;
  }

  return result;
}

export { handler };
