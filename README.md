
# ⭕ n8n-nodes-twitter-dynamic-auth

  

![n8n.io - Workflow Automation](https://n8n.io/_nuxt/img/n8n-logo-press.9d4dfc1.png)


>**Twitter node with dynamic auth credentials for n8n.**  

Current node of twitter inside n8n has a credential method that let's us to connect directly a twitter account from n8n. In this case we don't want to connect and implement twitter operation from a single account but from different user accounts. To implement this we have the `access_token` and `access_secret` for each user and we can send request to twitter API against these users.

This custom node has now 4 fields for authentication credentials:

    ◉ Consumer Key
    ◉ Consumer Secret
    ◉ Access Token
    ◉ Access Secret

These field values can be dynamically set to send request for dynamic users.

## How to run and install

>Run & Test Locally

Once you've downloaded/cloned the repo, you need to build the code and publish the package locally to test it. Run the following commands:


### Install dependencies
    npm install

### Build the code
    npm run build

### "Publish" the package locally
    npm link

NOTE: If you get permission errors, run the command as a root user with sudo, for example sudo npm link.

## n8n Guide
[Creating n8n-nodes-module](https://docs.n8n.io/integrations/creating-nodes/code/create-n8n-nodes-module/)

## License

[Apache 2.0 with Commons Clause](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/LICENSE.md)