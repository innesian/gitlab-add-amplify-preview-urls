# Gitlab - Automatic Amplify Preview URLs

## Serverless Lambda Function to add Amplify Preview links to Gitlab Merge Requests
AWS Amplify offers a feature [called Previews](https://docs.aws.amazon.com/amplify/latest/userguide/pr-previews.html) which automatically creates a web accessible version of a Merge Request for review on a unique URL and destroys it automatically once the Merge Request is completed. This Lambda function adds the Amplify preview URL to the Merge Request comments in Gitlab automatically. 

The installation instructions go over how to set the bot up using AWS EventBridge as a cron.

-----

## Expected Environment Variables
These variables should be set in the Lambda configuration's Environment Variables section.

| Variable Name | Description |
| ------------- | ----------- |
| GITLAB_PERSONAL_ACCESS_CODE | This script will post the links as a user, add a [personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) for a user with access to the `api` permission. |
| GITLAB_PROJECT_ID | (Number) Should be directly beneath the repository name on the project landing page in Gitlab. |
| AMPLIFY_PROJECT_ID | The Amplify project ID can be found in the General settings of the Amplify project; look up the App ARN which is structured like this `arn:aws:amplify:REGION:AWS_ACCOUNT_ID:apps/AMPLIFY_PROJECT_ID` - the ID is the alphanumeric code after the last slash. |
|  |  |

## Enabling Previews in Amplify
[...]

## Using Authentication
[...]

## AWS EventBridge - Configuring Cron Job
[...]