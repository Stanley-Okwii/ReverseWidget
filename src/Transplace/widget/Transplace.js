
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/_base/lang",
    "dojo/dom-style",
    "dojo/text",
    "dojo/html",
    "dojo/text!Transplace/widget/template/Transplace.html"
], function (declare, _WidgetBase, _TemplatedMixin, lang, dojoStyle, dojoText, dojoHtml, widgetTemplate) {
    "use strict";

    return declare("Transplace.widget.Transplace", [_WidgetBase, _TemplatedMixin], {
        templateString: widgetTemplate,

        // DOM elements
        myNamee: null,
        addText: null,

        // Internal variables
        _contextObject: null,
        StudentData: "",
        nameproperty: "",
        MicroflowToRun: "",


        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObject = obj;
            this._updateRendering(callback); // We're passing the callback to updateRendering to be called after DOM-manipulation
        },

        //my special function to reverse letters 
        ReverseName: function (TextToReverse) {
            return TextToReverse.split("").reverse().join("");
        },

        CreateObject: function () {
            mx.data.create({
                entity: this.nameproperty,
                callback: lang.hitch(this, function (Sobject) {
                    Sobject.set(this.StudentData, this.addText.value);
                    this.SaveObject(Sobject);
                    console.log("Object created on server");
                    }),
                error: function (e) {
                    console.log("an error occured: " + e);
                }
            });
        },
        SaveObject: function (StudentObject) {
            mx.data.commit({
                mxobj: StudentObject,
                callback: function () {
                    console.log("Object committed");
                },
                error: function (e) {
                    console.error("Could not commit object:"+ e);
                }
            });
        },
        Saving: function () {
            mx.data.save({
                mxobj: obj,
                callback: function () {
                    console.log("Object saved");
                }
            });
        },
        CallMicroFlow: function () {
            if (this.MicroflowToRun !== "") {
                this.ExecuteMicroflow(this.MicroflowToRun, this._contextObject.getGuid());
            }
        }
        ,

        ExecuteMicroflow: function (mf, guid, cb) {
            if (mf && guid) {
                mx.ui.action(mf, {
                    params: {
                        applyto: "selection",
                        guids: [guid]
                    },
                    callback: lang.hitch(this, function (objs) {
                        if (cb && typeof cb === "function") {
                            cb(objs);
                        }
                    }),
                    error: function (error) {
                        console.debug(error.description);
                    }
                }, this);
            }
        },
        // Rerender the interface.
        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");
            if (this._contextObject !== null) {
                dojoStyle.set(this.domNode, "display", "block");
                var ReverseText = this._contextObject.get(this.StudentData);
                dojoHtml.set(this.myNamee, this.ReverseName(ReverseText));
            }
            else {
                dojoStyle.set(this.domNode, "display", "none");
            }
            this._executeCallback(callback, "_updateRendering");
        },

        _executeCallback: function (cb, from) {
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["Transplace/widget/Transplace"]);
