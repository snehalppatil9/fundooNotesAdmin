/******************************************************************************
 *  Execution       :   1. default node         cmd> login.component.ts 
 *
 *  Purpose         : To login your Fundoo Notes Admin Account  
 * 
 *  @file           : login.component.ts
 *  @author         : Snehal Patil
 *  @version        : 1.0
 *  @since          : 29-04-2019
 *
 ******************************************************************************/
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
// declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    $(document).ready(function () {
      var id = localStorage.getItem("Id");
      $("button").click(function () {
        try {
          /**
           * 
           * @description taking the email and password values from frontend
           */
          var email = $('#email').val();
          var password = $('#password').val();
          /**
           * 
           * @description checking whether all the inputs are filled
           */
          if (email.length == 0 && password.length == 0) {
            $("h5").text("please fill all the inputs");
            return false;
          }
          if (email.length == 0) {
            $("h5").text("please enter email");
            return false;
          }
          if (password.length == 0) {
            $("h5").text("please enter password");
            return false;
          }
          /**
           * 
           * @description email validation
           */
          var regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
          if (regexEmail.test(email) == false) {
            $("h5").text("This is not the right way to write email.");
            return false;
          }
          /**
           * 
           * @description calling admin login api
           */
          $.ajax({
            type: 'POST',
            url: 'http://34.213.106.173/api/user/adminLogin',
            dataType: "json",
            data: {
              email: email,
              password: password
            },
            success: function (data) {
              localStorage.setItem("Id", data.id);
              /**
              * 
              * @description if the admin login is success then it will directly take to admin dashboard page
              */
              window.location.href = "/dashboard";
            },
            error: function (request, status, error) {
              $("h6").text("Incorrect email or password");
            }
          });
          return false;
        } catch (e) {
          if (e instanceof SyntaxError || e instanceof ReferenceError || e instanceof TypeError || e instanceof RangeError) {
          }
        }
      });
    });
  }
}
