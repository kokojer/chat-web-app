export default () => ({
  s3Config: {
    credentials: {
      accessKeyId: `${process.env.TENANT_ID}:${process.env.ID_KEY}`,
      secretAccessKey: process.env.SECRET,
    },
    endpoint: process.env.ENDPOINT,
    region: process.env.REGION,
  },
  bucketName: process.env.BUCKET_NAME,
  globalEndpoint: process.env.GLOBAL_ENDPOINT,
});
