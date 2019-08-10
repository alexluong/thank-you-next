# Thank You, Next (TYN)

Twitter DM filter against harrassment

---

## The problem

Popular Twitter users receive unwanted harrassment all the time. Many choose to close their inbox just because of this reason, losing out on opportunities to connect with others. Meanwhile, those who remain open are "rewarded" with this kind of behavior.

## This solution

This is a Twitter DM filter that checks whether incoming message is appropriate or not. If it's not, the message will be deleted from your inbox, so you won't have to deal with it.

## Table of Content

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [How it works](#how-it-works)
- [Technology](#technology)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How it works

TYN has 2 components: a web app and a Twitter filter. To use TYN, you'd set up the web app and then use it to deploy the Twitter filter.

Here is how TYN works:

- TYN keeps track of an allowed list. They are people who can message you without going through the filter.
- Before deploying the filter, you must use the web app to construct this list (programmatically). TYN will add those to whom you've sent messages and those you follow to the list.
- Every time you send a message to someone, that account will be added to the allowed list.

*Note*: Because of Twitter limitation, TYN can only find a subset of accounts that fit the critetria before deploying the filter.

## Technology

TYN is powered by Firebase, Netlify, and Twitter API. Thanks to the generous free tier of these services, TYN can be run completely for free.

1. **Firebase**: This is your database where TYN save some of your account info, your allowed list, and all deleted messages.

2. **Netlify**: TYN uses Netlify for their amazing hosting (web and functions) services.

3. **Twitter**: TYN subscribes to the [Twitter Account webhook](https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/overview) to check your inbox. It also uses the API to delete messages and analyze your account (check DMs and check follows) to construct the allowed list.

## License

MIT
