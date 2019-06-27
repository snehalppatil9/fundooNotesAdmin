import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var rowrowData;
    var id = localStorage.getItem("Id");
    $("#back").click(function() {
      window.location.href="/dashboard";
    })
    /**
     * @description getting the userlist table
     */
    $.ajax({
      type: 'GET',
      url: 'http://34.213.106.173/api/questionAndAnswerNotes/getUnApprovedAnswer',
      dataType: "json",
      headers:{
        "Authorization": id
      },
      success: function (data) {
        var list=data.data;
          var userList=[];
          for(var i=0; i<list.length; i++){
            userList.push([i+1,list[i].message]);
          }
        var tableData=$('#userlist').DataTable({
          "data": userList,
          "columns":[
            { 'width': '10%' }, { 'width': '70%' }, { 'width': '20%' }],
          "columnDefs": [{
            "targets": 2,
            "render": function ( data, type, row, meta ) {
              return '<button type="button" class="btn btn-outline-success" id="approval" style="background-color:rgb(203, 241, 230)">accept</button>                                                                                       <button id=reject type="button" class="btn btn-outline-success" style="background-color:rgb(203, 241, 230)">reject</button>';
            }
          }]
        });

        $('#userlist tbody').on('click', '#approval', function () {
           var rowData=tableData.row($(this).closest('tr')).data();
          console.log("rowData======>",rowData);
          
          $.ajax({
            type: 'POST',
            url: 'http://34.213.106.173/api/questionAndAnswerNotes/approve/'+data.data[rowData[0]-1].id,
            dataType:"json",
            headers:{
              "Authorization": id
            },
            success: function (data) {
              window.location.href = "/approval";
            },
            error: function (request, status, error) {
            }
          })
        });
        $('#userlist tbody').on('click', '#reject', function () {
          rowrowData=$(this).closest('tr')
          var rowData=tableData.row(rowrowData).data();
            $.ajax({
              type: 'POST',
              url: 'http://34.213.106.173/api/questionAndAnswerNotes/reject/'+data.data[rowData[0]-1].id,
              dataType:"json",
              headers:{
                "Authorization": id
              },
              success: function (data) {
                window.location.href = "/approval";
              },
              error: function (request, status, error) {
              }
            })
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
  }

}
