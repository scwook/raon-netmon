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

var kobraE1TPSQuery = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "192.168.66.210") \
|> filter(fn: (r) => \
r["_field"] == "cpu5sec" or \ 
r["_field"] == "input-Gi1-0-01" or \
r["_field"] == "input-Gi1-0-02" or \
r["_field"] == "input-Gi1-0-03" or \
r["_field"] == "input-Te1-0-01" or \
r["_field"] == "input-Te1-0-02" or \ 
r["_field"] == "output-Gi1-0-01" or \
r["_field"] == "output-Gi1-0-02" or \
r["_field"] == "output-Gi1-0-03" or \
r["_field"] == "output-Te1-0-01" or \
r["_field"] == "output-Te1-0-02") \
|> limit(n:2, offset: 0)`

var queryData = {
    "kobraE1TPS":
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
        "query": kobraE1TPSQuery,
        "type": "flux"
    }
};

function calcTraffic(dbData, portlist, intervalCount) {
    let data = dbData;
    let port = portlist;
    let count = intervalCount;
    let resultArray = [];

    for (let name of port) {
        let index = -1;
        let trafficArray = [];
        while (true) {
            index = data.indexOf(name, index + 1);
            if (index == -1) break;

            trafficArray[trafficArray.length] = data[index - 1];
        }

        resultArray[resultArray.length] = (trafficArray[1] - trafficArray[0]) / count;
    }

    return resultArray;
}

function calcRedundancyTraffic(dbData, portlist, intervalCount) {
    let data = dbData;
    let port = portlist;
    let count = intervalCount;
    let resultArray = [];

    for (let name of port) {
        let index = -1;
        let trafficArray = [];
        while (true) {
            index = data.indexOf(name, index + 1);
            if (index == -1) break;

            trafficArray[trafficArray.length] = data[index - 1];
        }

        resultArray[resultArray.length] = (trafficArray[1] - trafficArray[0]) / count;
        resultArray[resultArray.length] = (trafficArray[3] - trafficArray[2]) / count;
    }

    return resultArray;
}

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

function monitoringKoBRAe1TPSSwitch(interval) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index_input1_1 = data.indexOf("input-Gi1-0-01");
            let index_input1_2 = data.indexOf("input-Gi1-0-01", index_input1_1 + 1);

            let data_input1_1 = data[index_input1_1 - 1];
            let data_input1_2 = data[index_input1_2 - 1];

            let index_input2_1 = data.indexOf("input-Gi1-0-02");
            let index_input2_2 = data.indexOf("input-Gi1-0-02", index_input2_1 + 1);

            let data_input2_1 = data[index_input2_1 - 1];
            let data_input2_2 = data[index_input2_2 - 1];

            let index_input3_1 = data.indexOf("input-Gi1-0-03");
            let index_input3_2 = data.indexOf("input-Gi1-0-03", index_input3_1 + 1);

            let data_input3_1 = data[index_input3_1 - 1];
            let data_input3_2 = data[index_input3_2 - 1];

            let index_input4_1 = data.indexOf("input-Te1-0-01");
            let index_input4_2 = data.indexOf("input-Te1-0-01", index_input4_1 + 1);

            let data_input4_1 = data[index_input4_1 - 1];
            let data_input4_2 = data[index_input4_2 - 1];

            let index_input5_1 = data.indexOf("input-Te1-0-02");
            let index_input5_2 = data.indexOf("input-Te1-0-02", index_input5_1 + 1);

            let data_input5_1 = data[index_input5_1 - 1];
            let data_input5_2 = data[index_input5_2 - 1];

            let traffic_input1 = (data_input1_2 - data_input1_1) / interval;
            let traffic_input2 = (data_input2_2 - data_input2_1) / interval;
            let traffic_input3 = (data_input3_2 - data_input3_1) / interval;
            let traffic_input4 = (data_input4_2 - data_input4_1) / interval;
            let traffic_input5 = (data_input5_2 - data_input5_1) / interval;

            // let totalTraffic = traffic1;
            // let unitTraffic = changeUnit(totalTraffic);
            let unitTraffic_input1 = changeUnit(traffic_input1)
            let unitTraffic_input2 = changeUnit(traffic_input2)
            let unitTraffic_input3 = changeUnit(traffic_input3)
            let unitTraffic_input4 = changeUnit(traffic_input4)
            let unitTraffic_input5 = changeUnit(traffic_input5)

            document.getElementById('kobra-e1-tps-value-in1').innerText = unitTraffic_input1.value.toFixed(1) + unitTraffic_input1.unit + '/s';
            document.getElementById('kobra-e1-tps-value-in2').innerText = unitTraffic_input2.value.toFixed(1) + unitTraffic_input2.unit + '/s';
            document.getElementById('kobra-e1-tps-value-in3').innerText = unitTraffic_input3.value.toFixed(1) + unitTraffic_input3.unit + '/s';
            document.getElementById('kobra-e1-tps-value-in4').innerText = unitTraffic_input4.value.toFixed(1) + unitTraffic_input4.unit + '/s';
            document.getElementById('kobra-e1-tps-value-in5').innerText = unitTraffic_input5.value.toFixed(1) + unitTraffic_input5.unit + '/s';


            let index_output1_1 = data.indexOf("output-Gi1-0-01");
            let index_output1_2 = data.indexOf("output-Gi1-0-01", index_output1_1 + 1);

            let data_output1_1 = data[index_output1_1 - 1];
            let data_output1_2 = data[index_output1_2 - 1];

            let index_output2_1 = data.indexOf("output-Gi1-0-02");
            let index_output2_2 = data.indexOf("output-Gi1-0-02", index_output2_1 + 1);

            let data_output2_1 = data[index_output2_1 - 1];
            let data_output2_2 = data[index_output2_2 - 1];

            let index_output3_1 = data.indexOf("output-Gi1-0-03");
            let index_output3_2 = data.indexOf("output-Gi1-0-03", index_output3_1 + 1);

            let data_output3_1 = data[index_output3_1 - 1];
            let data_output3_2 = data[index_output3_2 - 1];

            let index_output4_1 = data.indexOf("output-Te1-0-01");
            let index_output4_2 = data.indexOf("output-Te1-0-01", index_output4_1 + 1);

            let data_output4_1 = data[index_output4_1 - 1];
            let data_output4_2 = data[index_output4_2 - 1];

            let index_output5_1 = data.indexOf("output-Te1-0-02");
            let index_output5_2 = data.indexOf("output-Te1-0-02", index_output5_1 + 1);

            let data_output5_1 = data[index_output5_1 - 1];
            let data_output5_2 = data[index_output5_2 - 1];

            let traffic_output1 = (data_output1_2 - data_output1_1) / interval;
            let traffic_output2 = (data_output2_2 - data_output2_1) / interval;
            let traffic_output3 = (data_output3_2 - data_output3_1) / interval;
            let traffic_output4 = (data_output4_2 - data_output4_1) / interval;
            let traffic_output5 = (data_output5_2 - data_output5_1) / interval;

            // let totalTraffic = traffic1;
            // let unitTraffic = changeUnit(totalTraffic);
            let unitTraffic_output1 = changeUnit(traffic_output1)
            let unitTraffic_output2 = changeUnit(traffic_output2)
            let unitTraffic_output3 = changeUnit(traffic_output3)
            let unitTraffic_output4 = changeUnit(traffic_output4)
            let unitTraffic_output5 = changeUnit(traffic_output5)

            document.getElementById('kobra-e1-tps-value-out1').innerText = unitTraffic_output1.value.toFixed(1) + unitTraffic_output1.unit + '/s';
            document.getElementById('kobra-e1-tps-value-out2').innerText = unitTraffic_output2.value.toFixed(1) + unitTraffic_output2.unit + '/s';
            document.getElementById('kobra-e1-tps-value-out3').innerText = unitTraffic_output3.value.toFixed(1) + unitTraffic_output3.unit + '/s';
            document.getElementById('kobra-e1-tps-value-out4').innerText = unitTraffic_output4.value.toFixed(1) + unitTraffic_output4.unit + '/s';
            document.getElementById('kobra-e1-tps-value-out5').innerText = unitTraffic_output5.value.toFixed(1) + unitTraffic_output5.unit + '/s';

            // checkTraffic('ccsi1-line', 'ccsi1-value', totalTraffic, '10G');

        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.kobraE1TPS));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.kobraE1TPS.now = isoTime;
}