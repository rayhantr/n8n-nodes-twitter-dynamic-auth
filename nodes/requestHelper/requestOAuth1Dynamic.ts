import { IResponseError } from "n8n-core";
import { IAllExecuteFunctions, IHttpRequestOptions } from "n8n-workflow";
import { OptionsWithUri, OptionsWithUrl } from "request-promise-native";
import requestPromise = require("request-promise-native");
import clientOAuth1, { Token } from 'oauth-1.0a';
import { createHmac } from 'crypto';

export async function requestOAuth1Dynamic(
	this: IAllExecuteFunctions,
	credentialsType: string,
	requestOptions:
		| OptionsWithUrl
		| OptionsWithUri
		| requestPromise.RequestPromiseOptions
		| IHttpRequestOptions,
	isN8nRequest = false,
) {
	const credentials = await this.getCredentials(credentialsType);

	if (credentials === undefined) {
		throw new Error('No credentials were returned!');
	}

	// if (credentials.oauthTokenData === undefined) {
	// 	throw new Error('OAuth credentials not connected!');
	// }

	const oauth = new clientOAuth1({
		consumer: {
			key: credentials.consumerKey as string,
			secret: credentials.consumerSecret as string,
		},
		signature_method: credentials.signatureMethod as string,
		hash_function(base: any, key: any) {
			const algorithm = credentials.signatureMethod === 'HMAC-SHA1' ? 'sha1' : 'sha256';
			return createHmac(algorithm, key).update(base).digest('base64');
		},
	});

	// const oauthTokenData = credentials.oauthTokenData as IDataObject;

	const token: Token = {
		key: credentials.accessToken as string,
		secret: credentials.accessSecret as string,
	};

	// @ts-ignore
	requestOptions.data = { ...requestOptions.qs, ...requestOptions.form };

	// Fixes issue that OAuth1 library only works with "url" property and not with "uri"
	// @ts-ignore
	if (requestOptions.uri && !requestOptions.url) {
		// @ts-ignore
		requestOptions.url = requestOptions.uri;
		// @ts-ignore
		delete requestOptions.uri;
	}

	// @ts-ignore
	requestOptions.headers = oauth.toHeader(oauth.authorize(requestOptions, token));

	if (isN8nRequest) {
		return this.helpers.httpRequest(requestOptions as IHttpRequestOptions);
	}

	return this.helpers.request!(requestOptions).catch(async (error: IResponseError) => {
		// Unknown error so simply throw it
		throw error;
	});
}