import React, { Component } from 'react';
import { Table, Breadcrumb, BreadcrumbItem } from 'reactstrap';

//Blynk app authentication token
//Unique for every app
let auth_token = '8aef21c0c59a4c92ba7e7be1eef296cb';
let pins = [];
var pako = require('pako');

class Fokusz extends React.Component {
   constructor(){
       super();
       this.state = {
       }
   }
   componentWillMount() {
        this.getT0();
         this.getT1();
       this.getT2();
       this.getT3();
       this.getStatus();
   }

   getStatus(){
        var requestHardware = new XMLHttpRequest();
        var requestApp = new XMLHttpRequest();

        requestHardware.open('GET', 'http://blynk-cloud.com/8aef21c0c59a4c92ba7e7be1eef296cb/isHardwareConnected');
        requestApp.open('GET', 'http://blynk-cloud.com/8aef21c0c59a4c92ba7e7be1eef296cb/isAppConnected');

        requestHardware.onreadystatechange = function () {
            if (this.readyState === 4) {
                document.getElementById("hardwareStatus").innerHTML = this.responseText;
            }
        };

        requestApp.onreadystatechange = function () {
            if (this.readyState === 4) {
                document.getElementById("appStatus").innerHTML = this.responseText;
            }
    };
        requestHardware.send();
        requestApp.send();
   }

   getT0() {
       var requestTemp = new XMLHttpRequest();
       var requestData = new XMLHttpRequest();

       requestTemp.open('GET', 'http://blynk-cloud.com/8aef21c0c59a4c92ba7e7be1eef296cb/get/V30');
       requestData.open('GET', 'http://blynk-cloud.com/8aef21c0c59a4c92ba7e7be1eef296cb/data/V30');

       requestTemp.onreadystatechange = function () {
           if (this.readyState === 4) {
               var x = this.responseText.substring(2, this.responseText.length - 2);
               document.getElementById("t0").innerHTML = this.responseText.substring(2, this.responseText.length - 2);
           }
       };

       requestData.onreadystatechange = function () {
        if (this.readyState === 4) {
            //unpack and parse csv.gz
            var compressed = this.responseText;
            try {
                var result = pako.inflateRaw(compressed);
              } catch (err) {
                console.log(err);
              }
              
        }
    };
       requestTemp.send();
       requestData.send();
   }
   getT1() {
       var request = new XMLHttpRequest();

       request.open('GET', 'http://blynk-cloud.com/8aef21c0c59a4c92ba7e7be1eef296cb/get/V31');

       request.onreadystatechange = function () {
           if (this.readyState === 4) {
               console.log('Status:', this.status);

               document.getElementById("t1").innerHTML = this.responseText.substring(2, this.responseText.length - 2);
           }
       };

       request.send();
   }

   getT2() {
       var request = new XMLHttpRequest();

       request.open('GET', 'http://blynk-cloud.com/8aef21c0c59a4c92ba7e7be1eef296cb/get/V32');

       request.onreadystatechange = function () {
           if (this.readyState === 4) {
               console.log('Status:', this.status);

               document.getElementById("t2").innerHTML = this.responseText.substring(2, this.responseText.length - 2);
           }
       };

       request.send();
   }

   getT3() {
       var request = new XMLHttpRequest();

       request.open('GET', 'http://blynk-cloud.com/8aef21c0c59a4c92ba7e7be1eef296cb/get/V33');

       request.onreadystatechange = function () {
           if (this.readyState === 4) {
               console.log('Status:', this.status);

               document.getElementById("t3").innerHTML = this.responseText.substring(2, this.responseText.length - 2);
           }
       };

       request.send();
   }

    render() {
        return(
            <div>
                <Breadcrumb>
                    <BreadcrumbItem active>Home</BreadcrumbItem>
                </Breadcrumb>

                <Table dark>
                    <thead>
                        <tr>
                            <th>Sensor</th>
                            <th>PIN</th>
                            <th>Homerseklet</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">T0</th>
                            <td>V30</td>
                            <td>
                                <p id="t0"></p>
                            </td>
                            <td>Hardware Status:
                                <p id="hardwareStatus"></p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">T1</th>
                            <td>V31</td>
                            <td>
                                <p id="t1"></p>
                            </td>
                            <td>App Status:
                                <p id="appStatus"></p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">T2</th>
                            <td>V32</td>
                            <td>
                                <p id="t2"></p>
                            </td>
                            <td>
                                <p id="hardwareStatus"></p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">T3</th>
                            <td>V33</td>
                            <td>
                                <p id="t3"></p>
                            </td>
                            <td>
                                <p id="hardwareStatus"></p>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default Fokusz;