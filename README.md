# Prisma-S3-Backup-Restore

## Instructions

- Download repo locally
- Create an AWS account
- Create AWS credentials (ACCESS ID/SECRET)
- Create an S3 Bucket

Create a .env file in repo root with the following:

```bash
PRISMA_ENDPOINT=''
PRISMA_SECRET='' # Optional if your database is not protected by a secret
AWS_ACCESS_ID=""
AWS_ACCESS_SECRET=""
AWS_BUCKET_NAME=''
```

## Running script

```bash
node ./index.js
```

> Make sure node has write rights to the directory

If all has been setup successfully script should export prisma db and upload to S3.

> Restore coming soon
