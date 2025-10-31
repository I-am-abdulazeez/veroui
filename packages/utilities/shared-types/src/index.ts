import { HTMLAttributes } from "vue";

// export type As<Props = any> = React.ElementType<Props>;
//
type ElementList = HTMLElementTagNameMap &
  SVGElementTagNameMap &
  MathMLElementTagNameMap;
export type As<Props extends ElementList = ElementList> = keyof Props;

export type PropsOf<T extends As> = HTMLAttributes & {
  as?: T;
};

export type Merge<M, N> =
  N extends Record<string, unknown> ? M : Omit<M, keyof N> & N;

export type HTMLHeroUIProps<
  T extends As = "div",
  OmitKeys extends keyof any = never,
> = Omit<PropsOf<T>, "ref" | "color" | "slot" | "size" | OmitKeys> & {
  as?: T;
};
