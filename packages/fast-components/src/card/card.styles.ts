import { css } from "@microsoft/fast-element";
import { display, elevation } from "../styles";
import { SystemColors } from "../styles/forced-colors";

export const CardStyles = css`
    ${display("block")} :host {
        --elevation: 4;
        display: block;
        contain: content;
        height: var(--card-height, 100%);
        width: var(--card-width, 100%);
        box-sizing: border-box;
        background: var(--neutral-layer-card);
        border-radius: var(--elevated-corner-radius);
        ${elevation};
    }

    @media (forced-colors: active) {
        :host {
            background: ${SystemColors.Canvas};
        }
    }
`;
