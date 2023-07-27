var lineGradientInfo = {
    'control' : {
        'id' : 'control-line',
        'color' : '#0C68AC',
        'x1' : '115',
        'y1' : '249',
        'x2' : '372',
        'y2' : '249'
    },
    'ctrluser' : {
        'id' : 'ctrluser-line',
        'color' : '#7D4E22',
        'x1' : '70',
        'y1' : '249',
        'x2' : '272',
        'y2' : '249'
    },
    'archive1' : {
        'id' : 'archive1-line',
        'color' : '#88157B',
        'x1' : '40',
        'y1' : '249',
        'x2' : '272',
        'y2' : '249'
    },
    'archive2' : {
        'id' : 'archive2-line',
        'color' : '#88157B',
        'x1' : '40',
        'y1' : '249',
        'x2' : '272',
        'y2' : '249'
    },
    'scl3Gateway1' : {
        'id' : 'scl3-gateway1-line',
        'color' : '#88157B',
        'x1' : '15',
        'y1' : '249',
        'x2' : '272',
        'y2' : '249'
    },
    'scl3Gateway2' : {
        'id' : 'scl3-gateway2-line',
        'color' : '#88157B',
        'x1' : '10',
        'y1' : '249',
        'x2' : '272',
        'y2' : '249'
    },
    'displayWall' : {
        'id' : 'display-wall-line',
        'color' : '#2CA339',
        'x1' : '50',
        'y1' : '249',
        'x2' : '272',
        'y2' : '249'
    },
    'operator' : {
        'id' : 'operator-line',
        'color' : '#F0E62A',
        'x1' : '115',
        'y1' : '249',
        'x2' : '372',
        'y2' : '249'
    }
    
}



function lineShowUp(lineInfo) {
    let line = lineInfo;
    let gradientID = line.id + '-gradient';

    let linearGr = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    linearGr.setAttribute('id', gradientID);
    linearGr.setAttribute('gradientUnits', 'userSpaceOnUse');
    linearGr.setAttribute('x1', line.x1);
    linearGr.setAttribute('y1', line.y1);
    linearGr.setAttribute('x2', line.x2);
    linearGr.setAttribute('y2', line.y2);

    let stop1 = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
    stop1.setAttribute('offset', '1');
    stop1.style.stopColor = "#FFFFFF";
    stop1.style.stopOpacity = "0";

    let stop2 = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
    stop2.setAttribute('offset', '1');
    stop2.style.stopColor = line.color;

    let ani1 = document.createElementNS("http://www.w3.org/2000/svg", 'animate');
    ani1.setAttribute("attributeName", "offset");
    ani1.setAttribute('begin', '0s');
    ani1.setAttribute('dur', '0.5s');
    ani1.setAttribute('fill', 'freeze');
    ani1.setAttribute('from', '1');
    ani1.setAttribute('to', '0');
    ani1.setAttribute('keySplines', "0.1 0.2 0.4 1");
    ani1.setAttribute('keyTimes', "0;1");
    ani1.setAttribute('calcMode', "spline");

    let ani2 = document.createElementNS("http://www.w3.org/2000/svg", 'animate');
    ani2.setAttribute("attributeName", "offset");
    ani2.setAttribute('begin', '0.2s');
    ani2.setAttribute('dur', '0.5s');
    ani2.setAttribute('fill', 'freeze');
    ani2.setAttribute('from', '1');
    ani2.setAttribute('to', '0');
    ani2.setAttribute('keySplines', "0.1 0.2 0.4 1");
    ani2.setAttribute('keyTimes', "0;1");
    ani2.setAttribute('calcMode', "spline");

    stop1.appendChild(ani1);
    stop2.appendChild(ani2);

    linearGr.appendChild(stop1);
    linearGr.appendChild(stop2);

    let lineGroup = document.getElementById('left-line-group');
    lineGroup.appendChild(linearGr);


    let id = document.getElementById(line.id);
    id.style.stroke = `url(#${gradientID}`;
}