
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase", //all widgets must inherit of. This inherits from dijit._WidgetBase, which serves as a foundation for all widgets
    "dijit/_TemplatedMixin",//I a HTML template, and creates the widget’s DOM tree according to that template

    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-construct",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",


    "dojo/text!Transplace/widget/template/Transplace.html"
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoConstruct, lang, dojoText, dojoHtml, widgetTemplate) {
    "use strict";


    // Declare widget's prototype.
    return declare("Transplace.widget.Transplace", [_WidgetBase, _TemplatedMixin], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        // DOM elements
        myName: null,
        myNamee: null,
        myWords: null,
        myWordss: null,
        counter: null,

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handles: null,
        _contextObj: null,
        _alertDiv: null,
        _readOnly: false,

        // counter
        _i: 0,
        postCreate: function () {
            logger.debug(this.id + ".postCreate");

            if (this.readOnly || this.get("disabled") || this.readonly) {
                this._readOnly = true;
            }

            this._updateRendering();
            this._setupEvents();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            this._resetSubscriptions();
            this._updateRendering(callback); // We're passing the callback to updateRendering to be called after DOM-manipulation
        },
        //my specialized function to do some stuff
        ReverseName: function () {
            this.myNamee.innerHTML = this.myName.value.split("").reverse().join("");
        },
        ReverseWords: function () {
            var aaa = this.myWord.value.split(" ").reverse().join(" ");
            this.myWordss.innerHTML = aaa;
        },
        increment: function (evt) {
            this.counter.innerHTML = ++this._i;
        },

        // Rerender the interface.
        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");

            // Important to clear all validations!
            this._clearValidations();

            // The callback, coming from update, needs to be executed, to let the page know it finished rendering
            this._executeCallback(callback, "_updateRendering");
        },

        // Handle validations.
        _handleValidation: function (validations) {
            logger.debug(this.id + "._handleValidation");
            this._clearValidations();

            var validation = validations[0],
                message = validation.getReasonByAttribute(this.backgroundColor);

            if (this._readOnly) {
                validation.removeAttribute(this.backgroundColor);
            } else if (message) {
                this._addValidation(message);
                validation.removeAttribute(this.backgroundColor);
            }
        },

        // Clear validations.
        _clearValidations: function () {
            logger.debug(this.id + "._clearValidations");
            dojoConstruct.destroy(this._alertDiv);
            this._alertDiv = null;
        },

        // Show an error message.
        _showError: function (message) {
            logger.debug(this.id + "._showError");
            if (this._alertDiv !== null) {
                dojoHtml.set(this._alertDiv, message);
                return true;
            }
            this._alertDiv = dojoConstruct.create("div", {
                "class": "alert alert-danger",
                "innerHTML": message
            });
            dojoConstruct.place(this._alertDiv, this.domNode);
        },

        // Add a validation.
        _addValidation: function (message) {
            logger.debug(this.id + "._addValidation");
            this._showError(message);
        },

        // Reset subscriptions.
        _resetSubscriptions: function () {
            logger.debug(this.id + "._resetSubscriptions");
            // Release handles on previous object, if any.
            this.unsubscribeAll();
        },

        _executeCallback: function (cb, from) {
            logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["Transplace/widget/Transplace"]);

