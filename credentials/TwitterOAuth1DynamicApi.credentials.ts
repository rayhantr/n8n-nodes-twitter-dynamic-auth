import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TwitterOAuth1DynamicApi implements ICredentialType {
	name = 'twitterOAuth1DynamicApi';
	displayName = 'Twitter OAuth Dynamic API';
	documentationUrl = 'twitter';
	properties: INodeProperties[] = [
		{
			displayName: 'Consumer Key',
			name: 'consumerKey',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Consumer Secret',
			name: 'consumerSecret',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Access Secret',
			name: 'accessSecret',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Signature Method',
			name: 'signatureMethod',
			type: 'hidden',
			default: 'HMAC-SHA1',
		},
	];
}
