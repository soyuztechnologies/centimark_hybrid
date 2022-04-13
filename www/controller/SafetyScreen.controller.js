sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageToast","poc/centi/mark/centimarkui/utils/formatter"],function(e,t,r){"use strict";return e.extend("poc.centi.mark.centimarkui.controller.SafetyScreen",{formatter:r,onInit:function(){this.oRouter=this.getOwnerComponent().getRouter();this.oRouter.getRoute("safetyScreen").attachMatched(this.handleRouteMatched,this)},handleRouteMatched:function(e){var t=e.getParameter("arguments").NtfID;var r=e.getParameter("arguments").BuildID;if(t&&r){this.NotId=t;this.BuildID=r;var i=this.getView().getModel();var u=i.createKey("/NotificationsSet",{NOT_NO:t});this.getView().bindElement(u);var a=i.createKey("/BuildingSet",{NOT_NO:t,BUID_ID:r})}this.checkForSetup(a)},checkForSetup:function(e){var t=this;var r=this.getView().getModel();r.read(e,{urlParameters:{$expand:"NAVSetup"},success:function(e){debugger;var r=e.NAVSetup.results;if(r.length){t.SetupID=e.NAVSetup.results[0].SETUP_ID;t.bindListToSafetySetup()}else{t.createSetupForBuild()}},error:function(e){debugger}})},CreateSetupPopup:null,createSetupForBuild:function(){if(!this.CreateSetupPopup){this.CreateSetupPopup=sap.ui.xmlfragment(this.getView().getId(),"poc.centi.mark.centimarkui.fragments.SetupPopup",this);this.getView().addDependent(this.CreateSetupPopup)}this.CreateSetupPopup.open()},onConfirmSetup:function(e){debugger;var t=this;var r=this.getView().byId("idSetupName").getValue();this.CreateSetupPopup.close();var i={NOT_NO:this.NotId,BUID_ID:this.BuildID,NAME:r};var u=this.getView().getModel();u.create("/SetupSet",i,{success:function(e){debugger;t.SetupID=e.SETUP_ID;t.CreateSafetyFromTemplate(e)},error:function(e){debugger}})},CreateSafetyFromTemplate:function(e){var t=this;var r=this.getView().getModel();r.read("/TemplateSet",{success:function(r){debugger;var i=r.results;t.CreateSafetyForSetup(e,i)},error:function(e){debugger}})},CreateSafetyForSetup:function(e,t){var r=this.getView().getModel();var i=this;for(var u=0;u<t.length;u++){var a={NOT_NO:e.NOT_NO,BUID_ID:e.BUID_ID,SETUP_ID:e.SETUP_ID,STEMP:t[u].STEMP,NAME:t[u].NAME,TYPE:t[u].TYPE,IS_REQ:t[u].IS_REQ};r.create("/SafetySet",a,{success:function(e){i.bindListToSafetySetup()},error:function(e){debugger}})}},bindListToSafetySetup:function(){var e=this.getView().getModel();var t=e.createKey("/SetupSet",{NOT_NO:this.NotId,BUID_ID:this.BuildID,SETUP_ID:this.SetupID});var r=this.getView().byId("idSafetyList");r.bindElement(t,{expand:"NAV2Safety"});r.s},getSetupForBinding:function(e){if(e){this.checkBuildingSetup();var t=this.getView().byId("idSafetyList");t.bindElement(e,{expand:"NAVSetup"})}},onBack:function(){this.oRouter.navTo("repairScreen",{NtfID:this.NotId})},onPhotoCapture:function(e){debugger;var t=e.getSource().getBindingContext().getObject();var r=this;var i=e.getParameter("files");if(!i.length){}else{var u=new FileReader;u.onload=async function(e){try{debugger;var i=e.currentTarget.result;t.PHOTO=i;var u=r.getView().getModel();var a=u.createKey("/SafetySet",{NOT_NO:t.NOT_NO,BUID_ID:t.BUID_ID,SETUP_ID:t.SETUP_ID,SAFETY_ID:t.SAFETY_ID});var n=r;var o={PHOTO:i,STATUS:"Complete"};u.update(a,o,{success:function(e){debugger;n.getView().getModel().refresh()},error:function(e){debugger}})}catch(e){console.log(e)}};this.getView().getModel("local").setProperty("/buttonTxt","Recapture");u.readAsDataURL(i[0])}},onEditSetup:function(e){if(!this.SetupPopup){this.SetupPopup=sap.ui.xmlfragment("poc.centi.mark.centimarkui.fragments.SetupPopup",this);this.getView().addDependent(this.SetupPopup)}this.SetupPopup.open()},onCancelSetup:function(){this.SetupPopup.close()}})});