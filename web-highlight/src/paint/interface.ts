import { Hook } from "../hook";
import { Doc, DomMeta, DomSource } from "../interface";
import { Mode } from "../option";
import { Store } from "../store";

export interface Paint {
  source: DomSource
  root: Doc
  mode: Mode
  store: Store
  selectNodeHook: Hook<SelectNode[]>
  wrapNodeHook: Hook<HTMLElement>,
  removeSourceHook: Hook<HTMLElement>
}

export interface PaintSingle {
  selectNodes: SelectNode[]
  source: DomSource
  root: Doc
  store: Store
  selectNodeHook: Hook<SelectNode[]>
  wrapNodeHook: Hook<HTMLElement>,
  removeSourceHook: Hook<HTMLElement>
}

export interface RemvoePaint {
  source: DomSource
  root: Doc
  mode: Mode
  removeSourceHook: Hook<HTMLElement>
}

export interface DomMetaAndDoc {
  source: DomSource
  root: Doc
  domMeta: DomMeta
}

export interface DomNode {
  node: Node;
  offset: number;
}

export interface SelectTextNode extends DomNode {
  parent: HTMLElement;
  parentOffset: number;
}

export interface SelectNode {
  node: Node;
}

export type EleOrText = HTMLElement | Text;

export interface WrapNode {
  node: Node;
  // mode: Mode
  id: string;
  className: string;
  tagName: string;
}
