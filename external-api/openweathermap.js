const fetch = require("node-fetch");

var AWS = require('aws-sdk'),
    region = process.env.AWS_REGION_ENV,
    secretName = process.env.OPENWEATHERMAP_APPID,
    accessKeyId = process.env.ACCESS_KEY_ID,
    secretAccessKey = process.env.SECRET_ACCESS_KEY,
    decodedBinarySecret;

var client = new AWS.SecretsManager({
    region,
    accessKeyId,
    secretAccessKey
});

exports.openweathermap = async (event, context, callback) => {
    await new Promise((resolve, reject) => {
        client.getSecretValue({ SecretId: secretName }, function (err, data) {
            if (err) {
                console.log(err);
                reject()
            }
            else {
                if ('SecretString' in data) {
                    decodedBinarySecret = JSON.parse(data.SecretString)[secretName];
                } else {
                    let buff = new Buffer(data.SecretBinary, 'base64');
                    decodedBinarySecret = buff.toString('ascii');
                }
                resolve()
            }
        });
    });
    return callExternalApi(event.pathParameters.latitude, event.pathParameters.longitude);
}


var callExternalApi = async function (latitude, longitude) {
    var apiUrl = process.env.OPENWEATHERMAP_URL;
    var appid = decodedBinarySecret

    try {
        var response = await fetch(`${apiUrl}/?lat=${latitude}&lon=${longitude}&appid=${appid}`);
        var json = await response.json();

        var body = { temperature: json.main.temp }

        var response = {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };
        return response
    } catch (error) {
        console.log(error);
    }
}
