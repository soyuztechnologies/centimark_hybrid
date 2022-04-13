sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "poc/centi/mark/centimarkui/model/models",
        "sap/ui/model/odata/v2/ODataModel"
    ],  
    function (UIComponent, Device, models, ODataModel) {
        "use strict";

        return UIComponent.extend("poc.centi.mark.centimarkui.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                    var sServiceUrl = "proxy/http/103.207.171.202:8021/sap/opu/odata/sap/ZCENTI_ODATA_SRV/";       
                    var oDataModel = new ODataModel(sServiceUrl, true,{
                        user: "mob5",
                        password:"welcome@123"
                    });
               
                    this.setModel(oDataModel);
                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }
        });
    }
);