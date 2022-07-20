/* global expect, jest, describe, beforeEach, test */

const AWS = require('aws-sdk');
const mockGetItem = jest.fn();
const mockGetItemPromise = jest.fn();

jest.mock('aws-sdk', () => {
    return {
        DynamoDB: jest.fn(() => ({
            getItem: mockGetItem.mockImplementation(() => ({
                promise: mockGetItemPromise
            }))
        }))
    };
});
AWS.config = {};

import { isMuted } from './mute';

describe('mute', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('isMuted', () => {
        test('returns false if no mute exists for key', async () => {
            mockGetItemPromise.mockResolvedValueOnce({ Item: null });
            await expect(isMuted({
                to: 'test@test.com',
                type: 'test-email',
                key: 1234
            })).resolves.toEqual(false);
            expect(mockGetItem).toHaveBeenCalledWith({
                TableName: 'mute-dev',
                Key: {
                    to: {
                        S: 'test@test.com'
                    },
                    key: {
                        S: 'test-email-1234'
                    }
                }
            });
        });
    });
});
