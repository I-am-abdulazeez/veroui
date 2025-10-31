import { As } from "@veroui/shared-types";
import { Component } from "vue";
// import { ItemElement, SectionProps } from "./section";
// import { Component } from "vue";

export type Key = string | number;

// type SectionElement<T extends As> = Component<SectionProps<T>> | null;

// type CollectionElement<T extends As> = SectionElement<T> | ItemElement<T>;
// type CollectionChildren<T extends As> = CollectionElement<T> | CollectionElement<T>[] | ((item: T) => CollectionElement<T>);

export interface BaseItemProps<T> extends LinkDOMProps {
    /** Rendered contents of the item if `children` contains child items. */
    title?: string | Component; // label?? contents?
    /** A string representation of the item's contents, used for features like typeahead. */
    textValue?: string;
    /** An accessibility label for this item. */
    "aria-label"?: string;
    /** Whether this item has children, even if not loaded yet. */
    hasChildItems?: boolean;
}

export interface CollectionProps<T extends As> {
    /** Item objects in the collection. */
    items?: T[];
    /** The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with. */
    disabledKeys?: Key[];
}

type HTMLAttributeAnchorTarget = "_self" | "_blank" | "_parent" | "_top" | (string & {});

type HTMLAttributeReferrerPolicy =
    | ""
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";

export interface LinkDOMProps {
    /** A URL to link to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href). */
    href?: string;
    /** Hints at the human language of the linked URL. See[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang). */
    hrefLang?: string;
    /** The target window for the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target). */
    target?: HTMLAttributeAnchorTarget;
    /** The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel). */
    rel?: string;
    /** Causes the browser to download the linked URL. A string may be provided to suggest a file name. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download). */
    download?: boolean | string;
    /** A space-separated list of URLs to ping when the link is followed. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping). */
    ping?: string;
    /** How much of the referrer to send when following the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy). */
    referrerPolicy?: HTMLAttributeReferrerPolicy;
    /** Options for the configured client side router. */
    // routerOptions?: RouterOptions;
}

/* interface PartialNode<T> {
    type?: string;
    key?: Key | null;
    value?: T;
    element?: ReactElement | null;
    wrapper?: (element: ReactElement) => ReactElement;
    rendered?: ReactNode;
    textValue?: string;
    'aria-label'?: string;
    index?: number;
    renderer?: (item: T) => ReactElement | null;
    hasChildNodes?: boolean;
    childNodes?: () => IterableIterator<PartialNode<T>>;
    props?: any;
    shouldInvalidate?: (context: any) => boolean;
}
 */
