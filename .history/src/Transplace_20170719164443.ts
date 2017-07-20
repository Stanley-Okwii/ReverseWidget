import * as dojoDeclare from "dojo/_base/declare";
import * as domConstruct from "dojo/dom-construct";
import * as WidgetBase from "mxui/widget/_WidgetBase";

import "Transplace/Transplace.css";

class Transplace extends WidgetBase {

    // Parameters configured in modeler
    StudentData: string;
    nameProperty: string;
    MicroflowToRun: string;

    // Internal variables
    private contextObject: mendix.lib.MxObject;

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
            dojoClass.remove(this.domNode, "hidden");
            if (!this.configChecked) {
                this.checkConfig();
            }
            this.croppie.bind({
                url: UrlHelper.getDynamicResourceUrl(this.contextObject.getGuid(),
                    this.contextObject.get("changedDate") as number)
            });
        } else {
            dojoClass.add(this.domNode, "hidden");
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
dojoDeclare("org.flockofbirds.widget.cropimage.CropImage", [ WidgetBase ], function(Source: any) {
    const result: any = {};
    for (const i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
}(Transplace));
