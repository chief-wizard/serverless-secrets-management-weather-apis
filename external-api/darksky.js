const fetch = require("node-fetch");

var AWS = require('aws-sdk'),
    region = process.env.AWS_REGION_ENV,
    secretKey = process.env.DARKSKY_APIKEY,
    accessKeyId = process.env.ACCESS_KEY_ID,
    secretAccessKey = process.env.SECRET_ACCESS_KEY,
    decodedBinarySecret;

var kms = new AWS.KMS({
    region,
    accessKeyId,
    secretAccessKey
});

exports.darksky = async (event, context, callback) => {
    if (!decodedBinarySecret) {
        await new Promise((resolve, reject) => {
            kms.decrypt({ CiphertextBlob: Buffer(secretKey, 'base64') }, (err, data) => {
                if (err) {
                    console.log('Decrypt error:', err);
                    reject()
                    return;
                }
                decodedBinarySecret = data.Plaintext.toString('ascii');
                resolve()
            });
        });

    }
    return callExternalApi(event.pathParameters.latitude, event.pathParameters.longitude);
}

var callExternalApi = async function (latitude, longitude) {
    var apiUrl = process.env.DARKSKY_URL;
    var apiKey = decodedBinarySecret;

    try {
        var response = await fetch(`${apiUrl}/${apiKey}/${latitude},${longitude}`);
        var json = await response.json();

        var body = { temperature: json.currently.temperature }

        var response = {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };
        return response;
    } catch (error) {
        console.log(error);
    }
}

