# Simple-Spa-Shop-CMS 0.0 WIP

This is a templatized version of the hastily crafted tool I've built to maintain my own little shop site.
<img width="993" height="812" alt="image" src="https://github.com/user-attachments/assets/6e14ba2f-ad19-4462-9346-bc9a1d41c34b" />

### TODO:
In my spare time, I'm cleaning this project up with the help of Cursor:
- Refactoring the Admin for electron, vite, React and TypeScript, 
- Refactor the shop site template to actually be a template, also written in TypeScript.
- Expand configurability so that you can create and manage as many different sites as you want.
- Support for Payment System(s). Paypal and or Shop.
- Figure out what sort of license to use. I'm a late comer to open source.

### Currently 
This project contains two apps.

1. The spa-shop site app and
2. the admin app for the shop site that is meant to be run **locally only**.

### To use the admin to make data updates to the shop site:

1. Open a command line terminal window.
2. Navigate to the admin directory: `cd /{path to spa-shop-with-admin}/`
3. Run `./startit.sh`

4. This will open:
   - The admin, CMS app in a browser window [localhost:3001](http://localhost:3001)
   - A local staging version of the shop site [localhost:3000](http://localhost:3000)
5. Make your edits in the admin window and view changes in the staging window.

### To publish the changes you have made:

After you've finished making your changes, you'll want to review them carefully in the staging window,
[localhost:3000](http://localhost:3000), of your site.

If you are satisfied that your changes are good, navigate to the spa-shop directory (
`cd /path to spa-shop-with-admin/spa-shop/`) and then run `npm run build`. 

Once that's done, your site code has been updated! You can then push or upload your **dist** directory to wherever or however you host your site.
(`/path to spa-shop-with-admin/spa-shop/dist`). 

* Currently the JSON is stored in `/public/data` so that you can also just upload updated JSON files to the data directory of your hosted site, and update your site that way.

### Backstory
I've has some form or other of my web shop going since 2006, and have tried many libraries and frameworks to manage it over the years. I quickly became sick of 
- The database outages taking the whole site down
- Frameworks erasing all of my customizations every time they updated
- Frameworks with too many options and features for what I was doing 
- Security concerns at having customers’ personal and payment data stored in my dbs
- And reliance so much code I didn’t control

My shop’s data was simple and didn't change that often and so at some point I went DIY and wrote the whole thing myself, storing all the data in json files. 

I don’t need to tell you that editing the JSON files had its own downside. Even with VS Code formatting the JSON for me it was difficult to manage. Spelling errors and typos went undetected.

I actually muddled through that way for a long time until a friend wanted me to build him a site comparable to mine, and I realized that no one in their right mind would want to manage their site the way I did. So the SPA Shop Admin was born. 

I later modified it to work with my own site and use it to make updates. That is when I am not distracted wanting to improve the tool, which is more often than I update my site these days.  
