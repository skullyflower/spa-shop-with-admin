# Simple-Spa-Shop-CMS

This is a templatized version of the tool I've built to maintain my own little shop site.

This project contains two apps.

1. The spa-shop site app and
2. the admin app for the shop site that is meant to be run locally only.

### To make data updates to the shop site:

1. Open a command line terminal window.
2. Navigate to the admin directory: `cd /{path to spa-shop-with-admin}/`
3. Run `./startit.sh`

4. This will open:
   - The admin, CMS app in a browser window [localhost:3001](http://localhost:3001)
   - A local staging version of the shop site [localhost:3000](http://localhost:3000)
5. Make your edits in the admin window and view changes in the staging window.

### To publish the changes you have made:

Once you've finished making your changes, you'll want to review them carefully in the staging window
[localhost:3000](http://localhost:3000) of the site that opened along with your admin.

Once satisfied that your changes are good, navigate to the spa-shop directory (cd
`/path to spa-shop-with-admin/spa-shop/`) and run `npm run build`. Once that's done you can use your
hosting control panel's filemanager or your favorite ftp app to upload your dist directory
(`/path to spa-shop-with-admin/spa-shop/dist`). Make sure to replace all of thenfiles.
