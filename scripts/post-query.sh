
TOKEN=w708nT1Ksh97eNcK8jUQUasfJsJnQU0IcGk5KsdIGIw=--TszfKnv85nxhfgROKbBNXnWplaYrcEArj2iK+/+qt+8=

curl --include --request POST http://localhost:3000/query \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN"\
  --data '{
    "response": {
      "time": "1468087387,
      "summary": "Overcast",
      "icon": "cloudy",
      "nearestStormDistance": "47",
      "nearestStormBearing": "299",
      "precipIntensity": "0",
      "precipProbability": "0",
      "temperature": "63.51",
      "apparentTemperature": "63.51",
      "dewPoint": "58.54",
      "humidity": "0.84",
      "windSpeed": "5.26",
      "windBearing": "95",
      "visibility": "9.14",
      "cloudCover": "0.98",
      "pressure": "1012.37",
      "ozone": "307.42",
    },
  }'
