export const SERVER = {
    AUTH_MISSING: "auth-missing",
    AUTH_INSUFFICIENT: "auth-insufficient",
    REQUIRED_USERNAME: "require-username",
    INVALID_CONTENT: "invalid-content",
    INVALID_REQUEST: "invalid-request",
    POST_NOT_FOUND: "post-not-found",
    COMMENT_NOT_FOUND: "comment-not-found",
};

export const CLIENT = {
    NETWORK_ERROR: "network-error",
    NO_SESSION: "no-session",
};

export const LOGIN_STATUS = {
    PENDING: "pending",
    NOT_LOGGED_IN: "notLoggedIn",
    IS_LOGGED_IN: "loggedIn",
};

export const MESSAGES = {
    default: "Something went wrong. Please try again",

    [SERVER.AUTH_MISSING]: "Your authentication is missing here. Please try to Login Again",
    [SERVER.AUTH_INSUFFICIENT]:
        "Your username/password combination does not match any records, please try again.",
    [SERVER.REQUIRED_USERNAME]: "Please enter a valid (letters and/or numbers) username",
    [SERVER.INVALID_CONTENT]: "Please enter a valid content to Post! ",
    [SERVER.INVALID_REQUEST]:
        "Sorry CANNOT Find the post, may be deleted. Please add comment to another one ",
    [SERVER.POST_NOT_FOUND]: "Sorry CANNOT Find the post, may be deleted. ",
    [SERVER.COMMENT_NOT_FOUND]: "Sorry CANNOT Find this comment. ",

    [CLIENT.NETWORK_ERROR]: "Trouble connecting to the network.  Please try again",
    [CLIENT.NO_SESSION]: "Problem about retrieving your Session.",
};
