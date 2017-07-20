import * as dojoDeclare from "dojo/_base/declare";
import * as domConstruct from "dojo/dom-construct";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import * as dojoStyle from "dojo/dom-style";

import "Transplace/Transplace.css";

class Transplace extends WidgetBase {

    // Parameters configured in modeler
    StudentData: string;
    nameProperty: string;
    MicroflowToRun: string;

    // Internal variables
    private contextObject: mendix.lib.MxObject;
    private ReverseText:string;

    postCreate() {
        
    }

    update(object: mendix.lib.MxObject, callback?: () => void) {
        this.contextObject = object;
        this.updateRendering();

        if (callback) {
            callback();
        }
    }

    uninitialize(): boolean {
        // if (this.transplace) {
        //     this.transplace.destroy();
        // }

        return true;
    }

    private cropImage() {
        domConstruct.create("input", {
            class: "form-control btn-default",
            type: "button",
            value: "click me"
        }, this.domNode)
        
    }

    private updateRendering() {
        if (this.contextObject) {
            dojoStyle.set(this.domNode, "display", "block");
            this.ReverseText = this.contextObject.get(this.StudentData).toString();
            domConstruct.create("div", {
            innerHTML: "Reverse Text will be displayed here"
        }, this.domNode)
        } else {
            // dojoClass.add(this.domNode, "hidden");
             dojoStyle.set(this.domNode, "display", "none");
        }
    }

    private resetSubscriptions() {
        this.unsubscribeAll();
        if (this.contextObject) {
            this.subscribe({
                callback: () => this.updateRendering(),
                guid: this.contextObject.getGuid()
            });
        }
    }
}

// tslint:disable : only-arrow-functions
dojoDeclare("Transplace.widget.Transplace", [ WidgetBase ], function(Source: any) {
    const result: any = {};
    for (const i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
}(Transplace));
