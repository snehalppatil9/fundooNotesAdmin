/******************************************************************************
 *  Execution       :   1. default node         cmd> dashboard.component.ts 
 *
 *  Purpose         : Dashboard page to fetch all the table data  
 * 
 *  @file           : dashboard.component.ts 
 *  @author         : Snehal Patil
 *  @version        : 1.0
 *  @since          : 29-04-2019
 *
 ******************************************************************************/
import { Component, OnInit } from '@angular/core';
// import jQuery 
import * as $ from 'jquery';
// importing datatables
import "datatables.net";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataTable: any[];
  constructor() { }
  ngOnInit() {
    var id = localStorage.getItem("Id");
    $.ajax({
      type: 'GET',
      url: 'http://34.213.106.173/api/user/UserStatics',
      dataType: "json",
      headers: {
        "Authorization": id
      },
      success: function (data) {
        var html = "";
        for (var i = 0; i < data.data.details.length; i++) {
          html += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'><div class='card' style='margin-top:5%;'>";
          html += "<div class='card-title' style='padding-top:5%;color: red'><center><h3>" + data.data.details[i].service + "</h3></center></div>";
          html += "<div class='card-body' style='padding-bottom:5%'><center>number of users: " + data.data.details[i].count + "</center></div>";
          html += "</div></div>";
        }
        /**
         * 
         * @description total number of count it will print
         */
         $("#services").html(html);
      },
      error: function (request, status, error) {
      }
    });
    /**
     * @description getting the userlist table
     */
    $.ajax({
      type: 'GET',
      url: 'http://34.213.106.173/api/user/getAdminUserList',
      dataType: "json",
      success: function (data) {
        var list = data.data.data;
        var userList = [];
        for (var i = 0; i < list.length; i++) {
          userList.push([i + 1, list[i].firstName, list[i].email, list[i].service]);
        }
        $('#userlist').DataTable({
          "data": userList
        });
     },
      error: function (error) {
      }
    })
    /**
     * @description logging out
     */
    $("#logout").click(function () {
      $.ajax({
        type: 'POST',
        url: 'http://34.213.106.173/api/user/logout',
        headers: {
          "Authorization": id
        },
        success: function (data) {
          /**
           * @description if the logout is success then it will directly take to admin login page
           */
          window.location.href = "/login";
          localStorage.removeItem("Id");
        },
        error: function (request, status, error) {
          $("h5").text("something wrong while logout");
        }
      });
    });

     /**
     * @description : approval/Reject
     */
    $("#approval").click(function () {
      window.location.href = "/approval";
    });
    /**
     * @description :: card details button for product accept or cancel
     */
    $("#card").click(function () {
      window.location.href = "/carddetails";
    });

  }
}
