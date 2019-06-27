import { Component, OnInit } from '@angular/core';
import $ from 'jquery'

@Component({
  selector: 'app-carddetails',
  templateUrl: './carddetails.component.html',
  styleUrls: ['./carddetails.component.scss']
})
export class CarddetailsComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    var rowrowData;
    var id = localStorage.getItem("Id");
    $("#back").click(function () {
      window.location.href = "/dashboard";
    })
    /**
     * @description getting the userlist table
     */
    $.ajax({
      type: 'GET',
      url: 'http://34.213.106.173/api/productcarts/userCartList',
      dataType: "json",
      headers: {
        "Authorization": id
      },
      success: function (data) {
        var list = data.data;
        var cartList = [];
        for (var i = 0; i < list.length; i++) {
          if(data['data'][i].user)
          cartList.push([i+1,list[i].user.firstName+" "+list[i].user.lastName,list[i].user.addresses[0].address,list[i].product.name])
        else
          cartList.push([i+1,"----","----",list[i].product.name])

        }
        var tableData = $('#cartList').DataTable({
          "data": cartList,
          "columns": [
            {'width':'10%'},{'width':'20%'},{'width':'20%'},{'width':'30%'},{'width':'20%'}],
          "columnDefs": [{
            "targets": 4,
            "render": function (data, type, row, meta) {
              return '<button type="button" class="btn btn-outline-success" id="accept" style="background-color:rgb(203, 241, 230)">accept</button>                                                                                       <button id=cancel type="button" class="btn btn-outline-success" style="background-color:rgb(203, 241, 230)">reject</button>';
            }
          }]
        });

        $('#cartList tbody').on('click', '#accept', function () {
          rowrowData=$(this).closest('tr')
          var index=tableData.row(rowrowData).data()[0]-1;
          
          $.ajax({
            type: 'POST',
            url: 'http://34.213.106.173/api/productcarts/adminCompleteOrder',
            data:{
              "cartId": data['data'][index].id
            },
            dataType:"json",
            headers:{
              "Authorization": id
            },
            success: function (data) {
              window.location.href = "/carddetails";
            },
            error: function (request, status, error) {
            }
          })
        });

        $('#cartList tbody').on('click', '#cancel', function () {
          rowrowData=$(this).closest('tr')
          var index=tableData.row(rowrowData).data()[0]-1;
          
          $.ajax({
            type: 'POST',
            url: 'http://34.213.106.173/api/productcarts/adminCancelOrder',
            data:{
              "cartId": data['data'][index].id
            },
            dataType:"json",
            headers:{
              "Authorization": id
            },
            success: function (data) {
              window.location.href = "/carddetails";
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
