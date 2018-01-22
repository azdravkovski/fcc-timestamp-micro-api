
# API Project: Timestamp Microservice for FCC

### User stories :

1. The API endpoint is `GET [project_url]/api/timestamp/:date_string`
2. A date string is valid if can be successfully parsed by `new Date(date_string)` (JS) . Note that the unix timestamp needs to be an **integer** (not a string) specifying **milliseconds**. The service only parses date strings compliant with ISO-8601 (e.g. `"2016-11-20"`) because this will ensure an UTC timestamp.
3. If the date string is **empty** it triggers `new Date()`, i.e. the service uses the current timestamp.
4. If the date string is **valid** the API returns a JSON having the structure 
`{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
e.g. `{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`.
5. If the date string is **invalid** the API returns a JSON having the structure `{"unix": null, "utc" : "Invalid Date" }`.

#### Example usage:
* https://fcc-timestamp-micro-api.glitch.me/api/timestamp/2015-12-15
* https://fcc-timestamp-micro-api.glitch.me/api/timestamp/1450137600000

#### Example output:
* { "unix": 1450137600, "natural": "December 15, 2015" }
