const fetch = require("node-fetch");
exports.dest = async (event, context, callback) => {
    return callExternalApi(event.pathParameters.latitude, event.pathParameters.longitude);
}
var callExternalApi = async function (latitude, longitude) {
    var appCode = process.env.DEST_APP_CODE
    var apiUrl = process.env.DEST_URL
    var apiId = process.env.DEST_APP_ID


    try {
        var response = await fetch(`${apiUrl}?product=observation&latitude=${latitude}&longitude=${longitude}&app_id=${apiId}&app_code=${appCode}`);
        var json = await response.json();

        var body = { temperature: json.observations.location[0].observation[0].temperature }

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
