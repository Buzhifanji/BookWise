import { Mode } from "./enum";
import { Options } from "./interface";

export { Mode };
export type { Options };


export function getDefaultOption(): Options {
  return {
    context: window,
    root: document.body,
    tagName: 'i',
    mode: Mode.single,
    className: '',
    showError: false,
    ignore: [],
    auto: true,
    dynamic: false, // 内容是否动态
  }
}
