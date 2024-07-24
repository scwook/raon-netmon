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
r["_field"] == "input-Te1-0-03" or \ 
r["_field"] == "output-Gi1-0-01" or \
r["_field"] == "output-Gi1-0-02" or \
r["_field"] == "output-Gi1-0-03" or \
r["_field"] == "output-Te1-0-01" or \
r["_field"] == "output-Te1-0-02" or \
r["_field"] == "output-Te1-0-03") \
|> limit(n:2, offset: 0)`

var tpsB1_1Query = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "192.168.66.211") \
|> filter(fn: (r) => \
r["_field"] == "output-Te1-0-01" or \
r["_field"] == "output-Te1-0-02" or \
r["_field"] == "output-Te1-0-03") \
|> limit(n:2, offset: 0)`

var tpsB1_2Query = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "192.168.66.210") \
|> filter(fn: (r) => \
r["_field"] == "input-Te1-0-03" or \
r["_field"] == "output-Te1-0-01") \
|> limit(n:2, offset: 0)`

var kobraE1MainQuery = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "192.168.131.115") \
|> filter(fn: (r) => \
r["_field"] == "input-Te1-0-01" or \
r["_field"] == "input-Te1-0-02" or \
r["_field"] == "input-Te1-0-03" or \
r["_field"] == "input-Te1-0-04" or \
r["_field"] == "output-Te1-0-12") \
|> limit(n:2, offset: 0)`

var kobraCountingRoomQuery = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "192.168.131.116") \
|> filter(fn: (r) => \
r["_field"] == "input-Gi1-0-20" or \
r["_field"] == "input-Gi1-0-22" or \
r["_field"] == "input-Gi1-0-23" or \
r["_field"] == "input-Gi1-0-24" or \
r["_field"] == "output-Te1-0-01") \
|> limit(n:2, offset: 0)`

var ndpsTOFMainQuery = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "192.168.135.15") \
|> filter(fn: (r) => \
r["_field"] == "output-Gi1-25") \
|> limit(n:2, offset: 0)`

var ndpsPSRoomMainQuery = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "192.168.135.230") \
|> filter(fn: (r) => \
r["_field"] == "input-eth1-01-13" or \
r["_field"] == "output-eth1-01-29") \
|> limit(n:2, offset: 0)`

var ndpsPSRoomQuery = `from(bucket: "${bucket}") \
|> range(start: -60s) \
|> filter(fn: (r) => r["_measurement"] == "snmp") \
|> filter(fn: (r) => r["agent_host"] == "192.168.135.231") \
|> filter(fn: (r) => \
r["_field"] == "input-Gi1-02" or \
r["_field"] == "input-Gi1-08" or \
r["_field"] == "output-Te1-49") \
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
    },
    "tpsB1_1":
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
        "query": tpsB1_1Query,
        "type": "flux"
    },
    "tpsB1_2":
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
        "query": tpsB1_2Query,
        "type": "flux"
    },
    "kobraE1Main":
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
        "query": kobraE1MainQuery,
        "type": "flux"
    },
    "kobraCountingRoom":
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
        "query": kobraCountingRoomQuery,
        "type": "flux"
    },
    "ndpsTOFMain":
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
        "query": ndpsTOFMainQuery,
        "type": "flux"
    },
    "ndpsPSRoomMain":
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
        "query": ndpsPSRoomMainQuery,
        "type": "flux"
    },
    "ndpsPSRoom":
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
        "query": ndpsPSRoomQuery,
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

function monitoringKoBRAe1MainSwitch(interval) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index_input1_1 = data.indexOf("input-Te1-0-01");
            let index_input1_2 = data.indexOf("input-Te1-0-01", index_input1_1 + 1);

            let data_input1_1 = data[index_input1_1 - 1];
            let data_input1_2 = data[index_input1_2 - 1];

            let index_input2_1 = data.indexOf("input-Te1-0-02");
            let index_input2_2 = data.indexOf("input-Te1-0-02", index_input2_1 + 1);

            let data_input2_1 = data[index_input2_1 - 1];
            let data_input2_2 = data[index_input2_2 - 1];

            let index_input3_1 = data.indexOf("input-Te1-0-03");
            let index_input3_2 = data.indexOf("input-Te1-0-03", index_input3_1 + 1);

            let data_input3_1 = data[index_input3_1 - 1];
            let data_input3_2 = data[index_input3_2 - 1];

            let index_input4_1 = data.indexOf("input-Te1-0-04");
            let index_input4_2 = data.indexOf("input-Te1-0-04", index_input4_1 + 1);

            let data_input4_1 = data[index_input4_1 - 1];
            let data_input4_2 = data[index_input4_2 - 1];

            let traffic_input1 = (data_input1_2 - data_input1_1) / interval;
            let traffic_input2 = (data_input2_2 - data_input2_1) / interval;
            let traffic_input3 = (data_input3_2 - data_input3_1) / interval;
            let traffic_input4 = (data_input4_2 - data_input4_1) / interval;

            // let totalTraffic = traffic1;
            // let unitTraffic = changeUnit(totalTraffic);
            let unitTraffic_input1 = changeUnit(traffic_input1)
            let unitTraffic_input2 = changeUnit(traffic_input2)
            let unitTraffic_input3 = changeUnit(traffic_input3)
            let unitTraffic_input4 = changeUnit(traffic_input4)

            document.getElementById('kobra-f1-rack-value').innerText = unitTraffic_input1.value.toFixed(1) + unitTraffic_input1.unit + '/s';
            document.getElementById('kobra-f2-rack-value').innerText = unitTraffic_input2.value.toFixed(1) + unitTraffic_input2.unit + '/s';
            document.getElementById('kobra-f3-rack-value').innerText = unitTraffic_input3.value.toFixed(1) + unitTraffic_input3.unit + '/s';
            document.getElementById('kobra-beamdump-rack-value').innerText = unitTraffic_input4.value.toFixed(1) + unitTraffic_input4.unit + '/s';

            let index_output1_1 = data.indexOf("output-Te1-0-12");
            let index_output1_2 = data.indexOf("output-Te1-0-12", index_output1_1 + 1);

            let data_output1_1 = data[index_output1_1 - 1];
            let data_output1_2 = data[index_output1_2 - 1];

 
            let traffic_output1 = (data_output1_2 - data_output1_1) / interval;


            // let totalTraffic = traffic1;
            // let unitTraffic = changeUnit(totalTraffic);
            let unitTraffic_output1 = changeUnit(traffic_output1)


            document.getElementById('kobra-e1-main-value').innerText = unitTraffic_output1.value.toFixed(1) + unitTraffic_output1.unit + '/s';

            // checkTraffic('ccsi1-line', 'ccsi1-value', totalTraffic, '10G');

        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.kobraE1Main));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.kobraE1Main.now = isoTime;
}

function monitoringTPSB1_2Switch(interval) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index_input1_1 = data.indexOf("input-Te1-0-03");
            let index_input1_2 = data.indexOf("input-Te1-0-03", index_input1_1 + 1);

            let data_input1_1 = data[index_input1_1 - 1];
            let data_input1_2 = data[index_input1_2 - 1];

            let traffic_input1 = (data_input1_2 - data_input1_1) / interval;

            // let totalTraffic = traffic1;
            // let unitTraffic = changeUnit(totalTraffic);
            let unitTraffic_input1 = changeUnit(traffic_input1)


            document.getElementById('kobra-btr-value').innerText = unitTraffic_input1.value.toFixed(1) + unitTraffic_input1.unit + '/s';


            let index_output1_1 = data.indexOf("output-Te1-0-01");
            let index_output1_2 = data.indexOf("output-Te1-0-01", index_output1_1 + 1);

            let data_output1_1 = data[index_output1_1 - 1];
            let data_output1_2 = data[index_output1_2 - 1];

   
            let traffic_output1 = (data_output1_2 - data_output1_1) / interval;

            // let totalTraffic = traffic1;
            // let unitTraffic = changeUnit(totalTraffic);
            let unitTraffic_output1 = changeUnit(traffic_output1)


            document.getElementById('tps-b1-2-value').innerText = unitTraffic_output1.value.toFixed(1) + unitTraffic_output1.unit + '/s';


            // checkTraffic('ccsi1-line', 'ccsi1-value', totalTraffic, '10G');

        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.tpsB1_2));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.tpsB1_2.now = isoTime;
}

function monitoringTPSB1_1Switch(interval) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index_output1_1 = data.indexOf("output-Te1-0-01");
            let index_output1_2 = data.indexOf("output-Te1-0-01", index_output1_1 + 1);

            let data_output1_1 = data[index_output1_1 - 1];
            let data_output1_2 = data[index_output1_2 - 1];

   
            let traffic_output1 = (data_output1_2 - data_output1_1) / interval;

            // let totalTraffic = traffic1;
            // let unitTraffic = changeUnit(totalTraffic);
            let unitTraffic_output1 = changeUnit(traffic_output1)


            document.getElementById('tps-b1-1-value').innerText = unitTraffic_output1.value.toFixed(1) + unitTraffic_output1.unit + '/s';


            // checkTraffic('ccsi1-line', 'ccsi1-value', totalTraffic, '10G');

        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.tpsB1_1));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.tpsB1_1.now = isoTime;
}

function monitoringKoBRACountingRoomSwitch(interval) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index_input1_1 = data.indexOf("input-Gi1-0-20");
            let index_input1_2 = data.indexOf("input-Gi1-0-20", index_input1_1 + 1);

            let data_input1_1 = data[index_input1_1 - 1];
            let data_input1_2 = data[index_input1_2 - 1];

            let index_input2_1 = data.indexOf("input-Gi1-0-22");
            let index_input2_2 = data.indexOf("input-Gi1-0-22", index_input2_1 + 1);

            let data_input2_1 = data[index_input2_1 - 1];
            let data_input2_2 = data[index_input2_2 - 1];

            let index_input3_1 = data.indexOf("input-Gi1-0-23");
            let index_input3_2 = data.indexOf("input-Gi1-0-23", index_input3_1 + 1);

            let data_input3_1 = data[index_input3_1 - 1];
            let data_input3_2 = data[index_input3_2 - 1];

            let index_input4_1 = data.indexOf("input-Gi1-0-24");
            let index_input4_2 = data.indexOf("input-Gi1-0-24", index_input4_1 + 1);

            let data_input4_1 = data[index_input4_1 - 1];
            let data_input4_2 = data[index_input4_2 - 1];

            let traffic_input1 = (data_input1_2 - data_input1_1) / interval;
            let traffic_input2 = (data_input2_2 - data_input2_1) / interval;
            let traffic_input3 = (data_input3_2 - data_input3_1) / interval;
            let traffic_input4 = (data_input4_2 - data_input4_1) / interval;

            // let totalTraffic = traffic1;
            // let unitTraffic = changeUnit(totalTraffic);
            let unitTraffic_input1 = changeUnit(traffic_input1)
            let unitTraffic_input2 = changeUnit(traffic_input2)
            let unitTraffic_input3 = changeUnit(traffic_input3)
            let unitTraffic_input4 = changeUnit(traffic_input4)

            document.getElementById('kobra-virtual-value').innerText = unitTraffic_input1.value.toFixed(1) + unitTraffic_input1.unit + '/s';
            document.getElementById('kobra-archive-value').innerText = unitTraffic_input2.value.toFixed(1) + unitTraffic_input2.unit + '/s';
            document.getElementById('kobra-ioc-value').innerText = unitTraffic_input4.value.toFixed(1) + unitTraffic_input4.unit + '/s';


            let index_output1_1 = data.indexOf("output-Te1-0-01");
            let index_output1_2 = data.indexOf("output-Te1-0-01", index_output1_1 + 1);

            let data_output1_1 = data[index_output1_1 - 1];
            let data_output1_2 = data[index_output1_2 - 1];

            let traffic_output1 = (data_output1_2 - data_output1_1) / interval;


            // let totalTraffic = traffic1;
            // let unitTraffic = changeUnit(totalTraffic);
            let unitTraffic_output1 = changeUnit(traffic_output1)

            document.getElementById('kobra-counting-room-value').innerText = unitTraffic_output1.value.toFixed(1) + unitTraffic_output1.unit + '/s';

            // checkTraffic('ccsi1-line', 'ccsi1-value', totalTraffic, '10G');

        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.kobraCountingRoom));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.kobraCountingRoom.now = isoTime;
}

function monitoringNDPSTOFMainSwitch(interval) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index_output1_1 = data.indexOf("output-Gi1-25");
            let index_output1_2 = data.indexOf("output-Gi1-25", index_output1_1 + 1);

            let data_output1_1 = data[index_output1_1 - 1];
            let data_output1_2 = data[index_output1_2 - 1];

   
            let traffic_output1 = (data_output1_2 - data_output1_1) / interval;

            // let totalTraffic = traffic1;
            // let unitTraffic = changeUnit(totalTraffic);
            let unitTraffic_output1 = changeUnit(traffic_output1)


            document.getElementById('tof-area-value1').innerText = unitTraffic_output1.value.toFixed(1) + unitTraffic_output1.unit + '/s';


            // checkTraffic('ccsi1-line', 'ccsi1-value', totalTraffic, '10G');

        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.ndpsTOFMain));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.ndpsTOFMain.now = isoTime;
}

function monitoringNDPSPSRoomMainSwitch(interval) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index_input1_1 = data.indexOf("input-eth1-01-13");
            let index_input1_2 = data.indexOf("input-eth1-01-13", index_input1_1 + 1);

            let data_input1_1 = data[index_input1_1 - 1];
            let data_input1_2 = data[index_input1_2 - 1];

            let traffic_input1 = (data_input1_2 - data_input1_1) / interval;

            let unitTraffic_input1 = changeUnit(traffic_input1)

            document.getElementById('ndps-storage-value').innerText = unitTraffic_input1.value.toFixed(1) + unitTraffic_input1.unit + '/s';

            let index_output1_1 = data.indexOf("output-eth1-01-29");
            let index_output1_2 = data.indexOf("output-eth1-01-29", index_output1_1 + 1);

            let data_output1_1 = data[index_output1_1 - 1];
            let data_output1_2 = data[index_output1_2 - 1];
   
            let traffic_output1 = (data_output1_2 - data_output1_1) / interval;

            // let totalTraffic = traffic1;
            // let unitTraffic = changeUnit(totalTraffic);
            let unitTraffic_output1 = changeUnit(traffic_output1)


            document.getElementById('ndps-ps-room-main-value').innerText = unitTraffic_output1.value.toFixed(1) + unitTraffic_output1.unit + '/s';


            // checkTraffic('ccsi1-line', 'ccsi1-value', totalTraffic, '10G');

        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.ndpsPSRoomMain));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.ndpsPSRoomMain.now = isoTime;
}


function monitoringNDPSPSRoomSwitch(interval) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let data = this.responseText.split(",");

            let index_input1_1 = data.indexOf("input-Gi1-02");
            let index_input1_2 = data.indexOf("input-Gi1-02", index_input1_1 + 1);

            let data_input1_1 = data[index_input1_1 - 1];
            let data_input1_2 = data[index_input1_2 - 1];

            let index_input2_1 = data.indexOf("input-Gi1-08");
            let index_input2_2 = data.indexOf("input-Gi1-08", index_input2_1 + 1);

            let data_input2_1 = data[index_input2_1 - 1];
            let data_input2_2 = data[index_input2_2 - 1];

            let traffic_input1 = (data_input1_2 - data_input1_1) / interval;
            let traffic_input2 = (data_input2_2 - data_input2_1) / interval;

            // let totalTraffic = traffic1;
            // let unitTraffic = changeUnit(totalTraffic);
            let unitTraffic_input1 = changeUnit(traffic_input1)
            let unitTraffic_input2 = changeUnit(traffic_input2)

            document.getElementById('ndps-archive-value').innerText = unitTraffic_input1.value.toFixed(1) + unitTraffic_input1.unit + '/s';
            document.getElementById('ndps-virtual-value').innerText = unitTraffic_input2.value.toFixed(1) + unitTraffic_input2.unit + '/s';

            let index_output1_1 = data.indexOf("output-Te1-49");
            let index_output1_2 = data.indexOf("output-Te1-49", index_output1_1 + 1);

            let data_output1_1 = data[index_output1_1 - 1];
            let data_output1_2 = data[index_output1_2 - 1];
   
            let traffic_output1 = (data_output1_2 - data_output1_1) / interval;

            // let totalTraffic = traffic1;
            // let unitTraffic = changeUnit(totalTraffic);
            let unitTraffic_output1 = changeUnit(traffic_output1)


            document.getElementById('ndps-ps-room-value').innerText = unitTraffic_output1.value.toFixed(1) + unitTraffic_output1.unit + '/s';


            // checkTraffic('ccsi1-line', 'ccsi1-value', totalTraffic, '10G');

        }
    };

    xhttp.open('POST', queryString, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader("Authorization", "Token " + influxDBToken)
    xhttp.send(JSON.stringify(queryData.ndpsPSRoom));

    let date = new Date();
    let isoTime = date.toISOString().replace('Z', timezone);
    queryData.ndpsPSRoom.now = isoTime;
}