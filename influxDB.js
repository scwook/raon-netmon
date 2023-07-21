var influxDbAddr = INFLUXDB_ADDR;
var bucket = BUCKET;
var dataIOendpoint = "/api/v2/query?org=" + ORGANIZATION;
var queryString = influxDbAddr + dataIOendpoint;

var influxDBToken = INFLUXDB_TOKEN;

var date = new Date();
var timezone = "+00:00";
var isoTime = date.toISOString().replace('Z', timezone);

const chartMaxLength = Math.ceil(186 * Math.PI); // L = 2 * PI * Radius
const KByte = 1000;
const MByte = KByte * 1000;
const GByte = MByte * 1000;
const TByte = GByte * 1000;
const PByte = TByte * 1000;

var controlQuery = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "SR0837-CONTROL") \
|> filter(fn: (r) => r["_field"] == "cpu5sec" or r["_field"] == "output-Te1-49" or r["_field"] == "output-Te1-50") \
|> limit(n:2, offset: 0)'

var queryData = {
    "control":
    {
        "dialect": {
            "annotations": [
                "group"
            ],
            "commentPrefix": "#",
            "dateTimeFormat": "RFC3339",
            "delimiter": ",",
            "header": true
        },
        "now": isoTime,
        "params": {},
        "query": controlQuery,
        "type": "flux"
    }
};

function changeUnit(byteValue) {
    let calValue = 0;
    let calUnit = 'B';

    if (byteValue / KByte < 1) {
        calValue = byteValue;
        calUnit = 'B';
    }
    else if (byteValue / MByte < 1) {
        calValue = byteValue / KByte;
        calUnit = 'KB';
    }
    else if (byteValue / GByte < 1) {
        calValue = byteValue / MByte;
        calUnit = 'MB';
    }
    else if (byteValue / TByte < 1) {
        calValue = byteValue / GByte;
        calUnit = 'GB';
    }
    else if (byteValue / PByte < 1) {
        calValue = byteValue / TByte;
        calUnit = 'TB';
    }
    else {
        calValue = byteValue / PByte;
        calUnit = 'PB';
    }

    return { value: calValue, unit: calUnit }
}

function monitoringControlSwitch() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");
            // console.log(data);

            let cpu5secIndex = data.indexOf("cpu5sec") - 1;
            let cpu5sec = parseInt(data[cpu5secIndex]);

            let port49OutputIndex1 = data.indexOf("output-Te1-49");
            let port49OutputIndex2 = data.indexOf("output-Te1-49", port49OutputIndex1 + 1);

            let port49OutputData1 = data[port49OutputIndex1 - 1];
            let port49OutputData2 = data[port49OutputIndex2 - 1];

            let port50OutputIndex1 = data.indexOf("output-Te1-50");
            let port50OutputIndex2 = data.indexOf("output-Te1-50", port50OutputIndex1 + 1);

            let port50OutputData1 = data[port50OutputIndex1 - 1];
            let port50OutputData2 = data[port50OutputIndex2 - 1];

console.log(port49OutputData1, port49OutputData2, port50OutputData1, port50OutputData2);
            
            let port49OutputTraffic = (port49OutputData2 - port49OutputData1) / 10;
            let port50OutputTraffic = (port50OutputData2 - port50OutputData1) / 10;

            let totalOutputTraffic = port49OutputTraffic + port50OutputTraffic;
            let unitOutputTraffic = changeUnit(totalOutputTraffic);

            document.getElementById('control-value').innerText = unitOutputTraffic.value.toFixed(1) + unitOutputTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.control));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.control.now = isoTime;
}