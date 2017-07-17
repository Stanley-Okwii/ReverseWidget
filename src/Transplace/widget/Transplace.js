
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
        templateString: widgetTemplate,

        // DOM elements
        myName: null,
        myNamee: null,
        myWords: null,
        myWordss: null,
        counter: null,

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handles: null,
        _readOnly: false,

        // counter
        _i: 0,
        postCreate: function () {
            logger.debug(this.id + ".postCreate");

            this._updateRendering();
            this._setupEvents();
        },
        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            this._resetSubscriptions();
            this._updateRendering(callback); // We're passing the callback to updateRendering to be called after DOM-manipulation
        },
        //my specialized function to reverse letters 
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
            this._executeCallback(callback, "_updateRendering");
        },

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
