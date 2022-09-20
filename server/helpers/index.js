const fetch = require("cross-fetch");

const getAdlibToken = async (platform) => {
    var details = {
        username: "ciano@ad-lib.io",
        password: "W4d1w4dz",
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    var loginRequest = await fetch(`https://api-${platform}.ad-lib.io/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formBody,
    });

    var responseHeaders = loginRequest.headers;
    var responseCookies = responseHeaders.get("set-cookie");
    var loginCookie = responseCookies.substr(
        responseCookies.indexOf("connect.sid=") + 12,
        responseCookies.indexOf(";") -
        (responseCookies.indexOf("connect.sid=") + 12)
    );

    return { status: "ok", data: loginCookie };
}

const getVersions = async (obj, res, platform, result) => {
    var count = 0;

    await obj?.templates?.map((data, index) => {
        if (result.status === "ok") {
            fetch(
                `https://api-${platform}.ad-lib.io/api/v2/assets/templates/${data.generation}/versions?partnerId=${obj.partnerId}`,
                {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-US,en;q=0.9",
                        "cache-control": "no-cache",
                        pragma: "no-cache",
                        "sec-ch-ua":
                            '"Google Chrome";v="87", " GATool_ConceptStatus";v="99", "Chromium";v="87"',
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        cookie: `connect.sid=${result.data};`,
                    },
                    referrer: `https://${platform}.ad-lib.io/`,
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: null,
                    method: "GET",
                    mode: "cors",
                }
            )
                .then((response) =>
                    response
                        .json()
                        .then((data) => ({ status: response.status, body: data }))
                )
                .then((template) => {
                    count++;
                    obj.templates[index].templateVersion = template.body.versions;
                    if (obj.templates.length === count) {
                        res.status(200).json({ body: obj });
                    }
                });
        }
    });
}

const getPartner = async (cId, platform, res) => {
    return getAdlibToken(platform).then((result) => {
        if (result.status === "ok") {
            fetch(`https://api-${platform}.ad-lib.io/api/v2/partners/conceptId/${cId}`, {
                headers: {
                    accept: "*/*",
                    "accept-language": "en-US,en;q=0.9",
                    "cache-control": "no-cache",
                    pragma: "no-cache",
                    "sec-ch-ua":
                        '"Google Chrome";v="87", " GATool_ConceptStatus";v="99", "Chromium";v="87"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    cookie: `connect.sid=${result.data};`,
                },
                referrer: `https://${platform}.ad-lib.io/`,
                referrerPolicy: "strict-origin-when-cross-origin",
                body: null,
                method: "GET",
                mode: "cors",
            })
                .then((response) =>
                    response
                        .json()
                        .then((data) => ({ status: response.status, body: data }))
                )
                .then((obj) => res.status(200).json(obj));
        }
    });
}

const getTemplates = async (platform, cId, pId, res) => {
    return getAdlibToken(platform).then((result) => {
        if (result.status === "ok") {
            fetch(
                `https://api-${platform}.ad-lib.io/api/v2/assets/concepts/${cId}?partnerId=${pId}`,
                {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-US,en;q=0.9",
                        "cache-control": "no-cache",
                        pragma: "no-cache",
                        "sec-ch-ua":
                            '"Google Chrome";v="87", " GATool_ConceptStatus";v="99", "Chromium";v="87"',
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        cookie: `connect.sid=${result.data};`,
                    },
                    referrer: `https://${platform}.ad-lib.io/`,
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: null,
                    method: "GET",
                    mode: "cors",
                }
            )
                .then((response) =>
                    response
                        .json()
                        .then((data) => ({ status: response.status, body: data }))
                )
                .then((obj) => {
                    getVersions(obj.body, res, platform, result)
                });
        }
    });
}

const getTemplateSelected = async (platform, tId, pId, res) => {
    return getAdlibToken(platform).then((result) => {
        if (result.status === "ok") {
            fetch(
                `https://api-${platform}.ad-lib.io/api/v2/assets/templates/${tId}?partnerId=${pId}`,
                {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-US,en;q=0.9",
                        "cache-control": "no-cache",
                        pragma: "no-cache",
                        "sec-ch-ua":
                            '"Google Chrome";v="87", " GATool_ConceptStatus";v="99", "Chromium";v="87"',
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        cookie: `connect.sid=${result.data};`,
                    },
                    referrer: `https://${platform}.ad-lib.io/`,
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: null,
                    method: "GET",
                    mode: "cors",
                }
            )
                .then((response) =>
                    response
                        .json()
                        .then((data) => ({ status: response.status, body: data }))
                )
                .then((obj) => {
                    res.json(obj)
                });
        }
    });
}


module.exports = { getPartner, getTemplates, getTemplateSelected }