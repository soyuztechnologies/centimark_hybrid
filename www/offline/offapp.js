sap.ui.define([
	"sap/m/Shell",
	"sap/ui/core/ComponentContainer",
	"sap/m/BusyDialog",
	"sap/m/MessageBox",
	"sap/ui/thirdparty/datajs",
	"firebase/auth/cordova"
], function(Shell, ComponentContainer, BusyDialog, MessageBox, GoogleAuthProvider) {
	"use strict";

	return {

		initialize: function() {
			document.addEventListener("deviceready", jQuery.proxy(this.onDeviceReady, this), false);
			document.addEventListener("online", jQuery.proxy(this.deviceOnline, this), false);
			document.addEventListener("offline", jQuery.proxy(this.deviceOffline, this), false);
		},

		onDeviceReady: function() {
			
			
			this.onCreateLocalDB();

			//import { GoogleAuthProvider } from "firebase/auth/cordova";

			const provider = new GoogleAuthProvider();
			console.log(provider);
		},

		//DB Creation
		onCreateLocalDB: function() {
			sqliteDB = window.sqlitePlugin.openDatabase({
				name: 'localSqlite.db',
				location: 'default',
				androidDatabaseImplementation: 2
			});

		
			//To Create Tables
			this.onCreateTables();

			//To Load UI5 Component
			this.onStartComponent();
		},

		
		//Loading the UI5 App Component
		onStartComponent: function() {
			sap.ui.getCore().attachInit(function() {
				new Shell({
					app: new ComponentContainer({
						height: "100%",
						name: "poc.centi.mark.centimarkui"
					})
				}).placeAt("content");
			});

		},
		
		
		//Tables Creation
		onCreateTables : function(){
			// Table to Store Login Credentials
			sqliteDB.transaction(function(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS user_login (logged varchar,userName varchar, password varchar)');
				}, function(error) {
              }, function() {
				console.log("login user table created successfully");
                
            });
			
			// Table to Store Employee List Details
			sqliteDB.transaction(function(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS employeelist (json varchar)');
				}, function(error) {
              }, function() {
				  console.log("employeelist table created successfully");
                
            });	
		 
		},
		
		deviceOnline: function() {
			//alert("Online");
			//this.flushAppOfflineStore();			
		},

		//========================================================================
		//Cordova deviceOffline event handler
		//========================================================================
		deviceOffline: function() {
			//alert("offline");
		}

	};
});