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

var backboneSwitchQuery = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "SR0742-BACKBONE1" or r["agent_host"] == "SR0738-BACKBONE2") \
|> filter(fn: (r) => \
r["_field"] == "cpu5sec" or \ 
r["_field"] == "output-Hu1-31" or \
r["_field"] == "output-Hu1-32" or \
r["_field"] == "output-Te1-09-03" or \
r["_field"] == "output-Te1-09-04" or \
r["_field"] == "output-Te1-10-01" or \ 
r["_field"] == "output-Te1-10-04" or \
r["_field"] == "output-Te1-11-01") \
|> limit(n:2, offset: 0)`

var leftSwitchQuery = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "SR0729-UPLINK") \
|> filter(fn: (r) => \
r["_field"] == "cpu5sec" or \ 
r["_field"] == "output-Te1-09" or \
r["_field"] == "output-Te1-10" or \
r["_field"] == "output-Te1-11" or \
r["_field"] == "output-Te1-12" or \
r["_field"] == "output-Te1-25" or \ 
r["_field"] == "output-Te1-26" or \
r["_field"] == "output-Te1-27" or \
r["_field"] == "output-Te1-28" or \
r["_field"] == "output-Te1-29" or \
r["_field"] == "output-Te1-30" or \
r["_field"] == "output-Te1-32" or \
r["_field"] == "input-Fo1-49" or \
r["_field"] == "input-Fo1-50" or \
r["_field"] == "input-Fo1-51" or \
r["_field"] == "input-Fo1-52" or \
r["_field"] == "input-Fo1-53" or \
r["_field"] == "input-Fo1-54") \
|> limit(n:2, offset: 0)`

var ccsi1Query = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "CCSI136-INJECTOR") \
|> filter(fn: (r) => r["_field"] == "input-Te1-0-03" or r["_field"] == "input-Te1-0-04") \
|> limit(n:2, offset: 0)`

var ccs02Query = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "CCS0240-SCL3") \
|> filter(fn: (r) => r["_field"] == "input-Te1-31" or r["_field"] == "input-Te1-32" or r["_field"] == "input-Te1-47" or r["_field"] == "input-Te1-48") \
|> limit(n:2, offset: 0)`

var ccs05Query = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "CCS0540-SCL3") \
|> filter(fn: (r) => r["_field"] == "input-Te1-31" or r["_field"] == "input-Te1-32" or r["_field"] == "input-Te1-47" or r["_field"] == "input-Te1-48") \
|> limit(n:2, offset: 0)`

var ccs09Query = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "CCS0940-SCL3") \
|> filter(fn: (r) => r["_field"] == "input-Te1-31" or r["_field"] == "input-Te1-32" or r["_field"] == "input-Te1-47" or r["_field"] == "input-Te1-48") \
|> limit(n:2, offset: 0)`

var ccs12Query = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "CCS1240-SCL3") \
|> filter(fn: (r) => r["_field"] == "input-Te1-31" or r["_field"] == "input-Te1-32" or r["_field"] == "input-Te1-47" or r["_field"] == "input-Te1-48") \
|> limit(n:2, offset: 0)`

var ccs14Query = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "CCS1440-SCL3") \
|> filter(fn: (r) => r["_field"] == "input-Te1-31" or r["_field"] == "input-Te1-32" or r["_field"] == "input-Te1-47" or r["_field"] == "input-Te1-48") \
|> limit(n:2, offset: 0)`

var ccs16Query = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "CCS1640-SCL3") \
|> filter(fn: (r) => r["_field"] == "input-Te1-31" or r["_field"] == "input-Te1-32" or r["_field"] == "input-Te1-47" or r["_field"] == "input-Te1-48") \
|> limit(n:2, offset: 0)`

var ccs21Query = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "CCS2138-P2DT") \
|> filter(fn: (r) => r["_field"] == "input-Te1-31" or r["_field"] == "input-Te1-32" or r["_field"] == "input-Te1-47" or r["_field"] == "input-Te1-48") \
|> limit(n:2, offset: 0)`

var queryData = {
    "backboneSwitch":
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
        "query": backboneSwitchQuery,
        "type": "flux"
    },
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

// 
// 
// 
// 
// 
// 
// 
//  Server Room Uplink Switch 
// 
// 
// 
// 
// 
// 
// 

function monitoringServerUplinkSwitch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            // CPU
            let cpu5secIndex = data.indexOf("cpu5sec") - 1;
            let cpu5sec = parseInt(data[cpu5secIndex]);

            document.getElementById('cpu-valueL').innerText = cpu5sec.toFixed(1);

            // Uplink
            var portlist = ['input-Fo1-49', 'input-Fo1-50', 'input-Fo1-51', 'input-Fo1-52'];
            let uplinkTrafficArray = calcTraffic(data, portlist, count);

            let uplinkTotalTraffic = uplinkTrafficArray[0] + uplinkTrafficArray[1] + uplinkTrafficArray[2] + uplinkTrafficArray[3];
            let uplinkUnitTraffic = changeUnit(uplinkTotalTraffic);

            document.getElementById('left-switch-value').innerText = uplinkUnitTraffic.value.toFixed(1) + uplinkUnitTraffic.unit + '/s';
            changeAnimationDuration('left-line', uplinkTotalTraffic, '40G');

            // Control
            var portlist = ['output-Te1-25', 'output-Te1-26'];
            let controlTrafficArray = calcTraffic(data, portlist, count);

            let controlTotalTraffic = controlTrafficArray[0] + controlTrafficArray[1];
            let controlUnitTraffic = changeUnit(controlTotalTraffic);

            document.getElementById('control-value').innerText = controlUnitTraffic.value.toFixed(1) + controlUnitTraffic.unit + '/s';
            changeAnimationDuration('control-line', controlTotalTraffic, '10G');

            // Ctrluser
            var portlist = ['output-Te1-32'];
            let ctrluserTrafficArray = calcTraffic(data, portlist, count);

            let ctrluserTotalTraffic = ctrluserTrafficArray[0];
            let ctrluserUnitTraffic = changeUnit(ctrluserTotalTraffic);

            document.getElementById('ctrluser-value').innerText = ctrluserUnitTraffic.value.toFixed(1) + ctrluserUnitTraffic.unit + '/s';
            changeAnimationDuration('ctrluser-line', ctrluserTotalTraffic, '10G');

            // Archive1
            var portlist = ['output-Te1-11'];
            let archive1TrafficArray = calcTraffic(data, portlist, count);

            let archive1TotalTraffic = archive1TrafficArray[0];
            let archive1UnitTraffic = changeUnit(archive1TotalTraffic);

            document.getElementById('archive1-value').innerText = archive1UnitTraffic.value.toFixed(1) + archive1UnitTraffic.unit + '/s';
            changeAnimationDuration('archive1-line', archive1TotalTraffic, '10G');

            // Archive2
            var portlist = ['output-Te1-12'];
            let archive2TrafficArray = calcTraffic(data, portlist, count);

            let archive2TotalTraffic = archive2TrafficArray[0];
            let archive2UnitTraffic = changeUnit(archive2TotalTraffic);

            document.getElementById('archive2-value').innerText = archive2UnitTraffic.value.toFixed(1) + archive2UnitTraffic.unit + '/s';
            changeAnimationDuration('archive2-line', archive2TotalTraffic, '10G');

            // SCL3 Gateway1
            var portlist = ['output-Te1-09'];
            let scl3Gateway1TrafficArray = calcTraffic(data, portlist, count);

            let scl3Gateway1TotalTraffic = scl3Gateway1TrafficArray[0];
            let scl3Gateway1UnitTraffic = changeUnit(scl3Gateway1TotalTraffic);

            document.getElementById('scl3-gateway1-value').innerText = scl3Gateway1UnitTraffic.value.toFixed(1) + scl3Gateway1UnitTraffic.unit + '/s';
            changeAnimationDuration('scl3-gateway1-line', scl3Gateway1TotalTraffic, '10G');

            // SCL3 Gateway1
            var portlist = ['output-Te1-10'];
            let scl3Gateway2TrafficArray = calcTraffic(data, portlist, count);

            let scl3Gateway2TotalTraffic = scl3Gateway2TrafficArray[0];
            let scl3Gateway2UnitTraffic = changeUnit(scl3Gateway2TotalTraffic);

            document.getElementById('scl3-gateway2-value').innerText = scl3Gateway2UnitTraffic.value.toFixed(1) + scl3Gateway2UnitTraffic.unit + '/s';
            changeAnimationDuration('scl3-gateway2-line', scl3Gateway2TotalTraffic, '10G');

            // Display Wall
            var portlist = ['output-Te1-27', 'output-Te1-28'];
            let displayWallTrafficArray = calcTraffic(data, portlist, count);

            let displayWallTotalTraffic = displayWallTrafficArray[0] + displayWallTrafficArray[1];
            let displayWallUnitTraffic = changeUnit(displayWallTotalTraffic);

            document.getElementById('display-wall-value').innerText = displayWallUnitTraffic.value.toFixed(1) + displayWallUnitTraffic.unit + '/s';
            changeAnimationDuration('display-wall-line', displayWallTotalTraffic, '10G');

            // Operator
            var portlist = ['output-Te1-29', 'output-Te1-30'];
            let operatorTrafficArray = calcTraffic(data, portlist, count);

            let operatorTotalTraffic = operatorTrafficArray[0] + operatorTrafficArray[1];
            let operatorUnitTraffic = changeUnit(operatorTotalTraffic);

            document.getElementById('operator-value').innerText = operatorUnitTraffic.value.toFixed(1) + operatorUnitTraffic.unit + '/s';
            changeAnimationDuration('operator-line', operatorTotalTraffic, '10G');
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

function monitorinBackboneSwitch(count) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            // CPU
            let cpu5secIndex = data.indexOf("cpu5sec") - 1;
            let cpu5sec = parseInt(data[cpu5secIndex]);

            document.getElementById('cpu-valueC').innerText = cpu5sec.toFixed(1);

            // ISOL
            var portlist = ['output-Te1-10-01'];
            let isolTrafficArray = calcRedundancyTraffic(data, portlist, count);

            let isolTotalTraffic = isolTrafficArray[0] + isolTrafficArray[1];
            let isolUnitTraffic = changeUnit(isolTotalTraffic);

            document.getElementById('isol-value').innerText = isolUnitTraffic.value.toFixed(1) + isolUnitTraffic.unit + '/s';

            // SRF
            var portlist = ['output-Te1-11-01'];
            let srfTrafficArray = calcRedundancyTraffic(data, portlist, count);

            let srfTotalTraffic = srfTrafficArray[0] + srfTrafficArray[1];
            let srfUnitTraffic = changeUnit(srfTotalTraffic);

            document.getElementById('srf-value').innerText = srfUnitTraffic.value.toFixed(1) + srfUnitTraffic.unit + '/s';

            // Cryo
            var portlist = ['output-Te1-09-04'];
            let cryoTrafficArray = calcRedundancyTraffic(data, portlist, count);

            let cryoTotalTraffic = cryoTrafficArray[0] + cryoTrafficArray[1];
            let cryoUnitTraffic = changeUnit(cryoTotalTraffic);

            document.getElementById('cryo-value').innerText = cryoUnitTraffic.value.toFixed(1) + cryoUnitTraffic.unit + '/s';

            // Low Energy
            var portlist = ['output-Te1-09-03'];
            let lowEnergyTrafficArray = calcRedundancyTraffic(data, portlist, count);

            let lowEnergyTotalTraffic = lowEnergyTrafficArray[0] + lowEnergyTrafficArray[1];
            let lowEnergyUnitTraffic = changeUnit(lowEnergyTotalTraffic);

            document.getElementById('low-energy-value').innerText = lowEnergyUnitTraffic.value.toFixed(1) + lowEnergyUnitTraffic.unit + '/s';

            // Low Energy
            var portlist = ['output-Te1-10-04'];
            let ifTrafficArray = calcRedundancyTraffic(data, portlist, count);

            let ifTotalTraffic = ifTrafficArray[0] + ifTrafficArray[1];
            let ifUnitTraffic = changeUnit(ifTotalTraffic);

            document.getElementById('if-value').innerText = ifUnitTraffic.value.toFixed(1) + ifUnitTraffic.unit + '/s';
        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.backboneSwitch));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.backboneSwitch.now = isoTime;
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

            let index1_1 = data.indexOf("input-Te1-0-03");
            let index1_2 = data.indexOf("input-Te1-0-03", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("input-Te1-0-04");
            let index2_2 = data.indexOf("input-Te1-0-04", index2_1 + 1);

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

            let index1_1 = data.indexOf("input-Te1-31");
            let index1_2 = data.indexOf("input-Te1-31", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("input-Te1-32");
            let index2_2 = data.indexOf("input-Te1-32", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let index3_1 = data.indexOf("input-Te1-47");
            let index3_2 = data.indexOf("input-Te1-47", index3_1 + 1);

            let data3_1 = data[index3_1 - 1];
            let data3_2 = data[index3_2 - 1];

            let index4_1 = data.indexOf("input-Te1-48");
            let index4_2 = data.indexOf("input-Te1-48", index4_1 + 1);

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

            let index1_1 = data.indexOf("input-Te1-31");
            let index1_2 = data.indexOf("input-Te1-31", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("input-Te1-32");
            let index2_2 = data.indexOf("input-Te1-32", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let index3_1 = data.indexOf("input-Te1-47");
            let index3_2 = data.indexOf("input-Te1-47", index3_1 + 1);

            let data3_1 = data[index3_1 - 1];
            let data3_2 = data[index3_2 - 1];

            let index4_1 = data.indexOf("input-Te1-48");
            let index4_2 = data.indexOf("input-Te1-48", index4_1 + 1);

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

            let index1_1 = data.indexOf("input-Te1-31");
            let index1_2 = data.indexOf("input-Te1-31", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("input-Te1-32");
            let index2_2 = data.indexOf("input-Te1-32", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let index3_1 = data.indexOf("input-Te1-47");
            let index3_2 = data.indexOf("input-Te1-47", index3_1 + 1);

            let data3_1 = data[index3_1 - 1];
            let data3_2 = data[index3_2 - 1];

            let index4_1 = data.indexOf("input-Te1-48");
            let index4_2 = data.indexOf("input-Te1-48", index4_1 + 1);

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

            let index1_1 = data.indexOf("input-Te1-31");
            let index1_2 = data.indexOf("input-Te1-31", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("input-Te1-32");
            let index2_2 = data.indexOf("input-Te1-32", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let index3_1 = data.indexOf("input-Te1-47");
            let index3_2 = data.indexOf("input-Te1-47", index3_1 + 1);

            let data3_1 = data[index3_1 - 1];
            let data3_2 = data[index3_2 - 1];

            let index4_1 = data.indexOf("input-Te1-48");
            let index4_2 = data.indexOf("input-Te1-48", index4_1 + 1);

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

            let index1_1 = data.indexOf("input-Te1-31");
            let index1_2 = data.indexOf("input-Te1-31", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("input-Te1-32");
            let index2_2 = data.indexOf("input-Te1-32", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let index3_1 = data.indexOf("input-Te1-47");
            let index3_2 = data.indexOf("input-Te1-47", index3_1 + 1);

            let data3_1 = data[index3_1 - 1];
            let data3_2 = data[index3_2 - 1];

            let index4_1 = data.indexOf("input-Te1-48");
            let index4_2 = data.indexOf("input-Te1-48", index4_1 + 1);

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

            let index1_1 = data.indexOf("input-Te1-31");
            let index1_2 = data.indexOf("input-Te1-31", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("input-Te1-32");
            let index2_2 = data.indexOf("input-Te1-32", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let index3_1 = data.indexOf("input-Te1-47");
            let index3_2 = data.indexOf("input-Te1-47", index3_1 + 1);

            let data3_1 = data[index3_1 - 1];
            let data3_2 = data[index3_2 - 1];

            let index4_1 = data.indexOf("input-Te1-48");
            let index4_2 = data.indexOf("input-Te1-48", index4_1 + 1);

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

            let index1_1 = data.indexOf("input-Te1-31");
            let index1_2 = data.indexOf("input-Te1-31", index1_1 + 1);

            let data1_1 = data[index1_1 - 1];
            let data1_2 = data[index1_2 - 1];

            let index2_1 = data.indexOf("input-Te1-32");
            let index2_2 = data.indexOf("input-Te1-32", index2_1 + 1);

            let data2_1 = data[index2_1 - 1];
            let data2_2 = data[index2_2 - 1];

            let index3_1 = data.indexOf("input-Te1-47");
            let index3_2 = data.indexOf("input-Te1-47", index3_1 + 1);

            let data3_1 = data[index3_1 - 1];
            let data3_2 = data[index3_2 - 1];

            let index4_1 = data.indexOf("input-Te1-48");
            let index4_2 = data.indexOf("input-Te1-48", index4_1 + 1);

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