# github-viewer
This is a viewer for all pull requests on the specified repos. Just
update config/index.js and add the repos.

## Setup
1. ```git clone https://github.com/gideonairex/github-viewer```
2. ```npm install && npm run bower -- install```
3. ```npm start```
4. Open browser to http://localhost:5555

## How to
1. Use __username__ and __accessToken__ from github use it as youre credentials
2. Once login press __Fetch status__. This will load up all the statuses of the pull requests from the 3 repos.
3. Statuses: __Updated__ and __Ready__ only works on comments so comment exactly just the markdown.
  * Need verification : There wasnt any action done yet on the pull request.
  * Need to fix: There is a comment on the pull request.
  * Updated: This was updated by the dev. The markdown is [D:Ready].
  * Ready: Approved and reviewed by the team lead. The markdown is [TL:Ready].
