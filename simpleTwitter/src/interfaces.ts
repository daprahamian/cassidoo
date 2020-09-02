export type UserId = number;

let _userId: UserId = 0;
export function newUserId() {
    return _userId++;
}

export type TweetContent = String;
export interface Tweet {
    userId: UserId;
    date: Date;
    content: TweetContent;
}

export function newTweet(userId: UserId, content: TweetContent) {
    return {userId, content, date: new Date()};
}