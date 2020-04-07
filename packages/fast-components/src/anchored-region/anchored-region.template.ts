import { html, ref, when } from "@microsoft/fast-element";
import { AnchoredRegion } from "./anchored-region";

export const AnchoredRegionTemplate = html<AnchoredRegion>`
  <template>
      <div
          class="region"
          ${ref("region")}
          style=${x => x.regionStyle}
    >
    <slot></slot>
    </div>
  </template>
`;
//${when(x => x.initialLayoutComplete, html`<slot></slot>`)}
