SoccerHub is a  modern web application for soccer enthusiasts to share match discussions, analyze plays, and connect with other fans. Built with React and Supabase, it features a real-time feed, a robust upvoting system, and threaded comments.

Submitted by: Duban Correa

Time spent: 4 hours spent in total

Application Features
Required Features
[x] Create Form: Users can create posts with a title, content, and an external image URL.

[x] Home Feed: Displays all match reports with their title, creation time, and upvote count.

[x] Post Navigation: Clicking on a post redirects the user to its unique details page.

[x] Sorting: Users can sort the pitch feed by either creation time (Newest) or popularity (Upvotes).

[x] Search: Users can search for specific match discussions by title.

[x] Post Details: The post page displays the full analysis, image, and comments.

[x] Upvoting: Users can increase the upvote count on any post page to show support.

[x] Comments: Users can leave and view comments underneath every post.

[x] Edit/Delete: Users can update or remove their previously created posts.

Stretch Features
[x] Pseudo-authentication: Implemented a "Secret Key" system—only the original author who knows the key can edit or delete a post.

[x] Loading Animation: Displays a custom "Checking the pitch..." message while data is being fetched from Supabase.

[x] Responsive Grid: The feed uses a CSS grid that adapts from mobile to desktop layouts.

Video Walkthrough
Here's a walkthrough of the implemented user stories:
<img src='./public/SoccerHubWalk.gif' title='SoccerHub Walkthrough' width='' alt='Video Walkthrough' />

Notes
The biggest challenge was ensuring the state stayed in sync between the Home Feed and the Post Details page, especially when upvoting. I used Supabase's .select().single() to ensure that the app always had the most recent data after an update.

License
Copyright [2026] [Duban Correa]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

ss