
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase", 
     "dijit/_TemplatedMixin",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/text!Transplace/widget/template/Transplace.html"
], function (declare, _WidgetBase, _TemplatedMixin, lang, dojoText, widgetTemplate) {
    "use strict";
   
    return declare("Transplace.widget.Transplace", [_WidgetBase, _TemplatedMixin], {
        templateString: widgetTemplate,

        // DOM elements
        myName: null,
        myNamee: null,
        myWords: null,
        myWordss: null,
        counter: null,

        // Internal variables
        _handles: null,
        _contextObject: null,
        storedValues: null,
        StudentData: "",
        _i: 0,

        //my specialized function to reverse letters 
        ReverseName: function () {
            this.myNamee.innerHTML = this.myName.value.split("").reverse().join("");
        },
        ReverseWords: function () {
            this.myWordss.innerHTML = this.myWord.value.split(" ").reverse().join(" ");
        },
        increment: function (evt) {
            this.counter.innerHTML = ++this._i;
        },
        
        GetName: function () {
           /* mx.data.get({
                guid: this._contextObject.getGuid(),
                callback: function (object) {
                    storedValues = object;
                    console.log("Received MxObject with GUID " + object.getGuid());
                }
            });
            return storedValues;*/
           var bb = this._contextObject.get(this.StudentData).value;
            this.myNamee.innerHTML = bb;
        },
    });
});

require(["Transplace/widget/Transplace"]);
