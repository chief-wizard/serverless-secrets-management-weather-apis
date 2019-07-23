const fetch = require("node-fetch");

var apiUrl = process.env.DARKSKY_URL;
var apiKey = process.env.DARKSKY_APIKEY;

exports.darksky = async (event, context, callback) => {
    return callExternalApi(event.pathParameters.latitude, event.pathParameters.longitude);
}

var callExternalApi = async function (latitude, longitude) {
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
