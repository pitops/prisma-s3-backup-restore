require('dotenv').config()

const execa = require('execa')
const ora = require('ora')
const fse = require('fs-extra')
const AWS = require('aws-sdk')

const spinner = ora()

// Enter copied or downloaded access ID and secret key here
const ID = process.env.AWS_ACCESS_ID
const SECRET = process.env.AWS_ACCESS_SECRET

// The name of the bucket that you have created
const BUCKET_NAME = process.env.AWS_BUCKET_NAME

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
})

const uploadFile = async fileName => {
  // Read content from the file
  const fileContent = fse.readFileSync(fileName)

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName, // File name you want to save as in S3
    Body: fileContent
  }

  // Uploading files to the bucket
  try {
    return s3.upload(params).promise()
  } catch (err) {
    throw err
  }
}

async function main () {
  const fileName = `${new Date().toISOString()}.zip`

  spinner.start('Exporting database')
  await execa('prisma', ['export', '--env-file', '.env', '--path', fileName])
  spinner.succeed('Exported database')

  spinner.start('Uploading to S3 bucket')
  const file = await uploadFile(fileName)
  spinner.succeed(`Database uploaded successfully. ${file.Location}`)

  spinner.start('Cleaning up')
  await fse.removeSync(fileName)
  spinner.succeed('Clean up')
}

main()
