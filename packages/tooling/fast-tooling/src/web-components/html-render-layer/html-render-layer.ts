import { FASTElement, observable } from "@microsoft/fast-element";
import {
    DataDictionary,
    MessageSystem,
    MessageSystemType,
    SchemaDictionary,
} from "../../message-system";

export enum ActivityType {
    hover = "hover",
    blur = "blur",
    click = "click",
    clear = "clear",
}

export abstract class HTMLRenderLayer extends FASTElement {
    protected dataDictionary: DataDictionary<unknown>;

    protected schemaDictionary: SchemaDictionary;

    @observable
    public messageSystem: MessageSystem;
    private messageSystemChanged(): void {
        if (this.messageSystem !== undefined) {
            this.messageSystem.add({ onMessage: this.handleMessageSystem });
        }
    }

    protected handleMessageSystem(e: MessageEvent): void {
        if (e.data) {
            if (
                e.data.type === MessageSystemType.initialize ||
                e.data.type === MessageSystemType.data
            ) {
                this.dataDictionary = e.data.dataDictionary;
                this.schemaDictionary = e.data.schemaDictionary;
            }
        }
    }

    public elementActivity(
        activityType: ActivityType,
        datadictionaryid: string,
        elementRef: HTMLElement
    ) {
        return;
    }
}
