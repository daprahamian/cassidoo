// Design a simplified version of Twitter, where users can post tweets, 
// follow/unfollow others, and is able to see the 10 most recent tweets in the user’s news feed.
//
// Some useful functions to include would be getNewsFeed(userid), postTweet(userid, tweet),
// follow(follower, followee), and unfollow(follower, followee).

import {UserId, Tweet, TweetContent} from './interfaces';
import {User} from './User';

export class Twitter {
    createUser(): UserId {
        const user = new User();
        return user.id;
    }

    getNewsFeed(userid: UserId) : Tweet[] {
        const user = User.getById(userid);
        return user.feed();
    }

    postTweet(userid: UserId, tweet: TweetContent): void {
        const user = User.getById(userid);
        user.postTweet(tweet);
    }

    follow(follower: UserId, followee: UserId): void {
        const user = User.getById(follower);
        user.follow(followee);
    }

    unfollow(follower: UserId, followee: UserId): void {
        const user = User.getById(follower);
        user.unfollow(followee);
    }
}
