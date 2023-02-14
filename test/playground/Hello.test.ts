import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "../../services/SpacesTable/Read";

const event: APIGatewayProxyEvent = {
  queryStringParameters: {
    spaceId: "3dfcd446-f2db-414c-a37e-92788202ae4d",
  },
} as any;

handler(event, {} as any).then((apiResult) => {
  const items = JSON.parse(apiResult.body);
  console.log(123);
});
