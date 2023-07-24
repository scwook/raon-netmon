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

var leftSwitchQuery = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "SR0729-UPLINK") \
|> filter(fn: (r) => r["_field"] == "cpu5sec" or r["_field"] == "output-Fo1-49" or r["_field"] == "output-Fo1-50" or r["_field"] == "output-Fo1-51" or r["_field"] == "output-Fo1-52" or r["_field"] == "output-Fo1-53" or r["_field"] == "output-Fo1-54") \
|> limit(n:2, offset: 0)'

var controlQuery = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "SR0729-UPLINK") \
|> filter(fn: (r) => r["_field"] == "input-Te1-25" or r["_field"] == "input-Te1-26") \
|> limit(n:2, offset: 0)'

var ctrluserQuery = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "SR0729-UPLINK") \
|> filter(fn: (r) => r["_field"] == "input-Te1-32") \
|> limit(n:2, offset: 0)'

var archive1Query = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "SR0729-UPLINK") \
|> filter(fn: (r) => r["_field"] == "input-Te1-11") \
|> limit(n:2, offset: 0)'

var archive2Query = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "SR0729-UPLINK") \
|> filter(fn: (r) => r["_field"] == "input-Te1-12") \
|> limit(n:2, offset: 0)'

var scl3Gateway1Query = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "SR0729-UPLINK") \
|> filter(fn: (r) => r["_field"] == "input-Te1-09") \
|> limit(n:2, offset: 0)'

var scl3Gateway2Query = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "SR0729-UPLINK") \
|> filter(fn: (r) => r["_field"] == "input-Te1-10") \
|> limit(n:2, offset: 0)'

var displayWallQuery = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "SR0729-UPLINK") \
|> filter(fn: (r) => r["_field"] == "input-Te1-27" or r["_field"] == "input-Te1-28") \
|> limit(n:2, offset: 0)'

var operatorQuery = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "SR0729-UPLINK") \
|> filter(fn: (r) => r["_field"] == "input-Te1-29" or r["_field"] == "input-Te1-30") \
|> limit(n:2, offset: 0)'

var ccsi1Query = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "CCSI136-INJECTOR") \
|> filter(fn: (r) => r["_field"] == "output-Te1-0-03" or r["_field"] == "output-Te1-0-04") \
|> limit(n:2, offset: 0)'

var ccs02Query = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "CCS0240-SCL3") \
|> filter(fn: (r) => r["_field"] == "output-Te1-31" or r["_field"] == "output-Te1-32" or r["_field"] == "output-Te1-47" or r["_field"] == "output-Te1-48") \
|> limit(n:2, offset: 0)'

var ccs05Query = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "CCS0540-SCL3") \
|> filter(fn: (r) => r["_field"] == "output-Te1-31" or r["_field"] == "output-Te1-32" or r["_field"] == "output-Te1-47" or r["_field"] == "output-Te1-48") \
|> limit(n:2, offset: 0)'

var ccs09Query = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "CCS0940-SCL3") \
|> filter(fn: (r) => r["_field"] == "output-Te1-31" or r["_field"] == "output-Te1-32" or r["_field"] == "output-Te1-47" or r["_field"] == "output-Te1-48") \
|> limit(n:2, offset: 0)'

var ccs12Query = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "CCS1240-SCL3") \
|> filter(fn: (r) => r["_field"] == "output-Te1-31" or r["_field"] == "output-Te1-32" or r["_field"] == "output-Te1-47" or r["_field"] == "output-Te1-48") \
|> limit(n:2, offset: 0)'

var ccs14Query = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "CCS1440-SCL3") \
|> filter(fn: (r) => r["_field"] == "output-Te1-31" or r["_field"] == "output-Te1-32" or r["_field"] == "output-Te1-47" or r["_field"] == "output-Te1-48") \
|> limit(n:2, offset: 0)'

var ccs16Query = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "CCS1640-SCL3") \
|> filter(fn: (r) => r["_field"] == "output-Te1-31" or r["_field"] == "output-Te1-32" or r["_field"] == "output-Te1-47" or r["_field"] == "output-Te1-48") \
|> limit(n:2, offset: 0)'

var ccs21Query = 'from(bucket: ' + '"' + bucket + '"' + ') \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "CCS2138-P2DT") \
|> filter(fn: (r) => r["_field"] == "output-Te1-31" or r["_field"] == "output-Te1-32" or r["_field"] == "output-Te1-47" or r["_field"] == "output-Te1-48") \
|> limit(n:2, offset: 0)'

var queryData = {
    "leftSwitch":
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
        "query": leftSwitchQuery,
        "type": "flux"
    },
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
    },
    "ctrluser":
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
        "query": ctrluserQuery,
        "type": "flux"
    },
    "archive1":
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
        "query": archive1Query,
        "type": "flux"
    },
    "archive2":
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
        "query": archive2Query,
        "type": "flux"
    },
    "scl3Gateway1":
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
        "query": scl3Gateway1Query,
        "type": "flux"
    },
    "scl3Gateway2":
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
        "query": scl3Gateway2Query,
        "type": "flux"
    },
    "displayWall":
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
        "query": displayWallQuery,
        "type": "flux"
    },
    "operator":
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
        "query": operatorQuery,
        "type": "flux"
    },
    "ccsi1":
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
        "query": ccsi1Query,
        "type": "flux"
    },
    "ccs02":
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
        "query": ccs02Query,
        "type": "flux"
    },
    "ccs05":
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
        "query": ccs05Query,
        "type": "flux"
    },
    "ccs09":
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
        "query": ccs09Query,
        "type": "flux"
    },
    "ccs12":
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
        "query": ccs12Query,
        "type": "flux"
    },
    "ccs14":
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
        "query": ccs14Query,
        "type": "flux"
    },
    "ccs16":
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
        "query": ccs16Query,
        "type": "flux"
    },
    "ccs21":
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
        "query": ccs21Query,
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

function monitoringServerUplinkSwitch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let cpu5secIndex = data.indexOf("cpu5sec") - 1;
            let cpu5sec = parseInt(data[cpu5secIndex]);

            document.getElementById('cpu-valueL').innerText = cpu5sec.toFixed(1);

            let index1_1 = data.indexOf("output-Fo1-49");
            let index1_2 = data.indexOf("output-Fo1-49", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("output-Fo1-50");
            let index2_2 = data.indexOf("output-Fo1-50", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let index3_1 = data.indexOf("output-Fo1-51");
            let index3_2 = data.indexOf("output-Fo1-51", index3_1 + 1);

            let data3_1 = data[index3_1 - 1];
            let data3_2 = data[index3_2 - 1];

            let index4_1 = data.indexOf("output-Fo1-52");
            let index4_2 = data.indexOf("output-Fo1-52", index4_1 + 1);

            let data4_1 = data[index4_1 - 1];
            let data4_2 = data[index4_2 - 1];

            let index5_1 = data.indexOf("output-Fo1-53");
            let index5_2 = data.indexOf("output-Fo1-53", index5_1 + 1);

            let data5_1 = data[index5_1 - 1];
            let data5_2 = data[index5_2 - 1];

            let index6_1 = data.indexOf("output-Fo1-54");
            let index6_2 = data.indexOf("output-Fo1-54", index6_1 + 1);

            let data6_1 = data[index6_1 - 1];
            let data6_2 = data[index6_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;
            let traffic2 = (data2_2 - data2_1) / count;
            let traffic3 = (data3_2 - data3_1) / count;
            let traffic4 = (data4_2 - data4_1) / count;
            let traffic5 = (data5_2 - data5_1) / count;
            let traffic6 = (data6_2 - data6_1) / count;


            let totalTraffic = traffic1 + traffic2 + traffic3 + traffic4 + traffic5 + traffic6;
            let unitTraffic = changeUnit(totalTraffic);

            document.getElementById('left-switch-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.leftSwitch));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.leftSwitch.now = isoTime;
}

function monitoringControlSwitch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index1_1 = data.indexOf("input-Te1-25");
            let index1_2 = data.indexOf("input-Te1-25", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("input-Te1-26");
            let index2_2 = data.indexOf("input-Te1-26", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;
            let traffic2 = (data2_2 - data2_1) / count;

            let totalTraffic = traffic1 + traffic2;
            let unitTraffic = changeUnit(totalTraffic);

            document.getElementById('control-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
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

function monitoringCtrluserSwitch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index1_1 = data.indexOf("input-Te1-32");
            let index1_2 = data.indexOf("input-Te1-32", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;

            let unitTraffic = changeUnit(traffic1);

            document.getElementById('ctrluser-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.ctrluser));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.ctrluser.now = isoTime;
}

function monitoringArchive1Switch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index1_1 = data.indexOf("input-Te1-11");
            let index1_2 = data.indexOf("input-Te1-11", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;

            let unitTraffic = changeUnit(traffic1);

            document.getElementById('archive1-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.archive1));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.archive1.now = isoTime;
}

function monitoringArchive2Switch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index1_1 = data.indexOf("input-Te1-12");
            let index1_2 = data.indexOf("input-Te1-12", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;

            let unitTraffic = changeUnit(traffic1);

            document.getElementById('archive2-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.archive2));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.archive2.now = isoTime;
}

function monitoringSCL3Gateway1Switch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index1_1 = data.indexOf("input-Te1-09");
            let index1_2 = data.indexOf("input-Te1-09", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;

            let unitTraffic = changeUnit(traffic1);

            document.getElementById('scl3-gateway1-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.scl3Gateway1));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.scl3Gateway1.now = isoTime;
}

function monitoringSCL3Gateway2Switch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index1_1 = data.indexOf("input-Te1-10");
            let index1_2 = data.indexOf("input-Te1-10", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;

            let unitTraffic = changeUnit(traffic1);

            document.getElementById('scl3-gateway2-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.scl3Gateway2));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.scl3Gateway2.now = isoTime;
}

function monitoringDisplayWallSwitch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index1_1 = data.indexOf("input-Te1-27");
            let index1_2 = data.indexOf("input-Te1-27", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("input-Te1-28");
            let index2_2 = data.indexOf("input-Te1-28", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;
            let traffic2 = (data2_2 - data2_1) / count;

            let totalTraffic = traffic1 + traffic2;
            let unitTraffic = changeUnit(totalTraffic);

            document.getElementById('display-wall-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.displayWall));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.displayWall.now = isoTime;
}

function monitoringOperatorSwitch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index1_1 = data.indexOf("input-Te1-29");
            let index1_2 = data.indexOf("input-Te1-29", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("input-Te1-30");
            let index2_2 = data.indexOf("input-Te1-30", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;
            let traffic2 = (data2_2 - data2_1) / count;

            let totalTraffic = traffic1 + traffic2;
            let unitTraffic = changeUnit(totalTraffic);

            document.getElementById('operator-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.operator));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.operator.now = isoTime;
}

// 
// 
// 
// 
// 
// 
// 
//  Gallery Switch 
// 
// 
// 
// 
// 
// 
// 

function monitoringCCSI1Switch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index1_1 = data.indexOf("output-Te1-0-03");
            let index1_2 = data.indexOf("output-Te1-0-03", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("output-Te1-0-04");
            let index2_2 = data.indexOf("output-Te1-0-04", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;
            let traffic2 = (data2_2 - data2_1) / count;

            let totalTraffic = traffic1 + traffic2;
            let unitTraffic = changeUnit(totalTraffic);

            document.getElementById('ccsi1-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.ccsi1));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.ccsi1.now = isoTime;
}

function monitoringCCS02Switch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index1_1 = data.indexOf("output-Te1-31");
            let index1_2 = data.indexOf("output-Te1-31", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("output-Te1-32");
            let index2_2 = data.indexOf("output-Te1-32", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let index3_1 = data.indexOf("output-Te1-47");
            let index3_2 = data.indexOf("output-Te1-47", index3_1 + 1);

            let data3_1 = data[index3_1 - 1];
            let data3_2 = data[index3_2 - 1];
            
            let index4_1 = data.indexOf("output-Te1-48");
            let index4_2 = data.indexOf("output-Te1-48", index4_1 + 1);

            let data4_1 = data[index4_1 - 1];
            let data4_2 = data[index4_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;
            let traffic2 = (data2_2 - data2_1) / count;
            let traffic3 = (data3_2 - data3_1) / count;
            let traffic4 = (data4_2 - data4_1) / count;


            let totalTraffic = traffic1 + traffic2 + traffic3 + traffic4;
            let unitTraffic = changeUnit(totalTraffic);

            document.getElementById('ccs02-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.ccs02));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.ccs02.now = isoTime;
}

function monitoringCCS05Switch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index1_1 = data.indexOf("output-Te1-31");
            let index1_2 = data.indexOf("output-Te1-31", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("output-Te1-32");
            let index2_2 = data.indexOf("output-Te1-32", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let index3_1 = data.indexOf("output-Te1-47");
            let index3_2 = data.indexOf("output-Te1-47", index3_1 + 1);

            let data3_1 = data[index3_1 - 1];
            let data3_2 = data[index3_2 - 1];
            
            let index4_1 = data.indexOf("output-Te1-48");
            let index4_2 = data.indexOf("output-Te1-48", index4_1 + 1);

            let data4_1 = data[index4_1 - 1];
            let data4_2 = data[index4_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;
            let traffic2 = (data2_2 - data2_1) / count;
            let traffic3 = (data3_2 - data3_1) / count;
            let traffic4 = (data4_2 - data4_1) / count;


            let totalTraffic = traffic1 + traffic2 + traffic3 + traffic4;
            let unitTraffic = changeUnit(totalTraffic);

            document.getElementById('ccs05-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.ccs05));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.ccs05.now = isoTime;
}

function monitoringCCS09Switch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index1_1 = data.indexOf("output-Te1-31");
            let index1_2 = data.indexOf("output-Te1-31", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("output-Te1-32");
            let index2_2 = data.indexOf("output-Te1-32", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let index3_1 = data.indexOf("output-Te1-47");
            let index3_2 = data.indexOf("output-Te1-47", index3_1 + 1);

            let data3_1 = data[index3_1 - 1];
            let data3_2 = data[index3_2 - 1];
            
            let index4_1 = data.indexOf("output-Te1-48");
            let index4_2 = data.indexOf("output-Te1-48", index4_1 + 1);

            let data4_1 = data[index4_1 - 1];
            let data4_2 = data[index4_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;
            let traffic2 = (data2_2 - data2_1) / count;
            let traffic3 = (data3_2 - data3_1) / count;
            let traffic4 = (data4_2 - data4_1) / count;


            let totalTraffic = traffic1 + traffic2 + traffic3 + traffic4;
            let unitTraffic = changeUnit(totalTraffic);

            document.getElementById('ccs09-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.ccs09));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.ccs09.now = isoTime;
}

function monitoringCCS12Switch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index1_1 = data.indexOf("output-Te1-31");
            let index1_2 = data.indexOf("output-Te1-31", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("output-Te1-32");
            let index2_2 = data.indexOf("output-Te1-32", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let index3_1 = data.indexOf("output-Te1-47");
            let index3_2 = data.indexOf("output-Te1-47", index3_1 + 1);

            let data3_1 = data[index3_1 - 1];
            let data3_2 = data[index3_2 - 1];
            
            let index4_1 = data.indexOf("output-Te1-48");
            let index4_2 = data.indexOf("output-Te1-48", index4_1 + 1);

            let data4_1 = data[index4_1 - 1];
            let data4_2 = data[index4_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;
            let traffic2 = (data2_2 - data2_1) / count;
            let traffic3 = (data3_2 - data3_1) / count;
            let traffic4 = (data4_2 - data4_1) / count;


            let totalTraffic = traffic1 + traffic2 + traffic3 + traffic4;
            let unitTraffic = changeUnit(totalTraffic);

            document.getElementById('ccs12-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.ccs12));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.ccs12.now = isoTime;
}

function monitoringCCS14Switch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index1_1 = data.indexOf("output-Te1-31");
            let index1_2 = data.indexOf("output-Te1-31", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("output-Te1-32");
            let index2_2 = data.indexOf("output-Te1-32", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let index3_1 = data.indexOf("output-Te1-47");
            let index3_2 = data.indexOf("output-Te1-47", index3_1 + 1);

            let data3_1 = data[index3_1 - 1];
            let data3_2 = data[index3_2 - 1];
            
            let index4_1 = data.indexOf("output-Te1-48");
            let index4_2 = data.indexOf("output-Te1-48", index4_1 + 1);

            let data4_1 = data[index4_1 - 1];
            let data4_2 = data[index4_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;
            let traffic2 = (data2_2 - data2_1) / count;
            let traffic3 = (data3_2 - data3_1) / count;
            let traffic4 = (data4_2 - data4_1) / count;


            let totalTraffic = traffic1 + traffic2 + traffic3 + traffic4;
            let unitTraffic = changeUnit(totalTraffic);

            document.getElementById('ccs14-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.ccs14));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.ccs14.now = isoTime;
}

function monitoringCCS16Switch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index1_1 = data.indexOf("output-Te1-31");
            let index1_2 = data.indexOf("output-Te1-31", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("output-Te1-32");
            let index2_2 = data.indexOf("output-Te1-32", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let index3_1 = data.indexOf("output-Te1-47");
            let index3_2 = data.indexOf("output-Te1-47", index3_1 + 1);

            let data3_1 = data[index3_1 - 1];
            let data3_2 = data[index3_2 - 1];
            
            let index4_1 = data.indexOf("output-Te1-48");
            let index4_2 = data.indexOf("output-Te1-48", index4_1 + 1);

            let data4_1 = data[index4_1 - 1];
            let data4_2 = data[index4_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;
            let traffic2 = (data2_2 - data2_1) / count;
            let traffic3 = (data3_2 - data3_1) / count;
            let traffic4 = (data4_2 - data4_1) / count;


            let totalTraffic = traffic1 + traffic2 + traffic3 + traffic4;
            let unitTraffic = changeUnit(totalTraffic);

            document.getElementById('ccs16-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.ccs16));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.ccs16.now = isoTime;
}

function monitoringCCS21Switch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index1_1 = data.indexOf("output-Te1-31");
            let index1_2 = data.indexOf("output-Te1-31", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("output-Te1-32");
            let index2_2 = data.indexOf("output-Te1-32", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let index3_1 = data.indexOf("output-Te1-47");
            let index3_2 = data.indexOf("output-Te1-47", index3_1 + 1);

            let data3_1 = data[index3_1 - 1];
            let data3_2 = data[index3_2 - 1];
            
            let index4_1 = data.indexOf("output-Te1-48");
            let index4_2 = data.indexOf("output-Te1-48", index4_1 + 1);

            let data4_1 = data[index4_1 - 1];
            let data4_2 = data[index4_2 - 1];

            let traffic1 = (data1_2 - data1_1) / count;
            let traffic2 = (data2_2 - data2_1) / count;
            let traffic3 = (data3_2 - data3_1) / count;
            let traffic4 = (data4_2 - data4_1) / count;


            let totalTraffic = traffic1 + traffic2 + traffic3 + traffic4;
            let unitTraffic = changeUnit(totalTraffic);

            document.getElementById('ccs21-value').innerText = unitTraffic.value.toFixed(1) + unitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.ccs21));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.ccs21.now = isoTime;
}

// 
// 
// 
// 
// 
// 
// 
//  Backbone Switch 
// 
// 
// 
// 
// 
// 
// 