const process = require('process');
const AWS = require('aws-sdk');

const template = require('./template');

const generateKey = (type, key) => {
    // todo
};

/**
 * Check if a mute exists for this to/type/key combination.
 */
export const isMuted = ({ to, type, key }) => {

    // This env might be set for other tests that touch this module but to not
    // need to test it.
    if(process.env['NO_MUTE']) {
        return;
    }

    // util.send will pass through all keys from the handlers, make sure we have
    // the ones we require.
    if(!type || !to || !key) {
        return false;
    }

    const db = new AWS.DynamoDB();
    return db.getItem({
        TableName: process.env['MUTE_TABLE'],
        Key: {
            to: {
                S: to.toString()
            },
            key: {
                S: generateKey(type, key)
            }
        }
    }).promise().then(result => {
        if(result.Item) {
            return true;
        } else {
            return false;
        }
    });
};

/**
 * Create a mute
 *
 * to: User for which the email should be muted
 * type: Type of the email, set by the relevant handler
 * key: Unique key for this email instance, e.g. customer ID for an email about a customer event
 */
export const mute = ({ to, type, key }) => {
    // todo: Add an entry to the table with the key and email address.
};

/**
 * Generate a link to be inserted in to emails.
 */
export const generateMuteLink = ({ to, type, key }) => {
    return `https://${process.env['WEB_URL']}/mute/${type}/${to}/${key}`;
};

/**
 * Serve a message telling the user the mute request has been successful.
 */
export const handler = (event) => {
    mute(event.pathParameters);
    // todo: handle failure
    const tmpl = template.load('test');
    const body = tmpl({
        heading: 'Success',
        subtitle: 'Your request was completed successfully.',
        message: 'You may now close this window.'
    });
    return {
        body,
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html'
        }
    };
};
