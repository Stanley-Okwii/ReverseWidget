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
    private ReverseText: string;

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
        }, this.domNode);

    }

    private updateRendering() {
        if (this.contextObject) {
            dojoStyle.set(this.domNode, "display", "block");
            this.ReverseText = this.contextObject.get(this.StudentData).toString();
            this.domStructureCreation();
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

    private domStructureCreation() {
        domConstruct.create("input", {
            type: "text",
            placeholder: "Enter your Text here"
        }, this.domNode).addEventListener("click", () => {
            if (this.MicroflowToRun !== "") {
               // this.ExecuteMicroflow(this.MicroflowToRun, Number(this.contextObject.getGuid()));
            }
        }, false);

        domConstruct.create("div", {
            innerHTML: "Reverse Text will be displayed here"
        }, this.domNode);
    }

    private ReverseName(TextToReverse: string) {
        return TextToReverse.split("").reverse().join("");
    }

    // private ExecuteMicroflow(mf: string, guid: number, callback?: () => void) {
    //     if (mf && guid) {
    //         mx.ui.action(mf, {

    //             progressMsg: string,
    //         }, this);
    //     }
    // }
}


// tslint:disable : only-arrow-functions
dojoDeclare("Transplace.widget.Transplace", [WidgetBase], function (Source: any) {
    const result: any = {};
    for (const i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
}(Transplace));
