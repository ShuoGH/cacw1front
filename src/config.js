export default {
  MAX_ATTACHMENT_SIZE:5000000,
  s3: {
    REGION: "eu-west-2",
    BUCKET: "projects-app-create "
  },
  apiGateway: {
    REGION: "eu-west-2",
    URL: "https://ro47631i9g.execute-api.eu-west-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-west-2",
    USER_POOL_ID: "eu-west-2_jLG7SrKfZ",
    APP_CLIENT_ID: "4gnc1t6gaj1vm5058n7r1p7o2i",
    IDENTITY_POOL_ID: "eu-west-2:8ba976bc-aae3-4da3-a248-83bb303be934"
  }
};