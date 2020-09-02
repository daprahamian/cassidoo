import {UserId, newUserId, Tweet, TweetContent, newTweet} from './interfaces';
import {feedCondenser} from './feedCondenser';

const users = new Map<UserId, User>();

export class User {
    #userId: UserId;
    #following: Set<UserId>;
    #tweets: Tweet[];

    public static getById(userId: UserId) : User {
        if (!users.has(userId)) {
            throw new Error(`Invalid userId ${userId}`);
        }
        return users.get(userId) as User;
    }

    constructor() {
        this.#userId = newUserId();
        this.#following = new Set();
        this.#tweets = [];
        users.set(this.#userId, this);
    }

    public get id() {
        return this.#userId;
    }

    public follow(userId: UserId) {
        this.#following.add(userId);
    }

    public unfollow(userId: UserId) {
        this.#following.delete(userId);
    }

    public postTweet(content: TweetContent) {
        const tweet = newTweet(this.#userId, content);
        this.#tweets.unshift(tweet);
    }

    public feed(limit: number = 10) : Tweet[] {
        if (limit <=0) {
            return [];
        }

        const feeds = this.following().map(user => user.tweetIterator(limit));
        const condenser = feedCondenser(feeds, limit);
        return [...condenser];
    }

    private *tweetIterator(limit: number = 10): Iterator<Tweet> {
        const max = Math.min(limit, this.#tweets.length);
        for (let i = 0; i < max; i += 1) {
            yield this.#tweets[i];
        }
    }

    private following(): User[] {
        return [...this.#following].map(User.getById);
    }
}
