import { INTERNAL_ERROR_EVENT, errorEventEimtter } from "../event";
import { Hook } from "../hook";
import { Doc, DomSource } from "../interface";
import { Mode } from "../option";
import { last } from "../util/array";
import { ERROR } from "../util/err";
import { isString } from "../util/is";
import { createUUID } from "../util/uuid";
import { getDomMeta } from "./dom";

interface RangeOption {
  range: Range,
  root: Doc
  className: string
  tagName: string
  mode: Mode,
  idHook: Hook<string>
}

/**
 * 将 rang数据信息 转换成 domSource
 * @param range 
 */
export function getSourceFromRange({ range, root, className, tagName, mode, idHook }: RangeOption): DomSource {
  const { startContainer, startOffset, endContainer, endOffset } = range

  const startDomMeta = getDomMeta(startContainer as HTMLElement, startOffset, root, mode);

  const endDomMeta = getDomMeta(endContainer as HTMLElement, endOffset, root, mode);

  const text = range.toString();

  let id = createUUID()

  if (!idHook.isEmpty()) {
    const res = idHook.call(startDomMeta, endDomMeta, text)
    const _id = last(res)

    if (isString(id)) {
      if (id === '') {
        errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
          type: ERROR.HOOKS_CALLBACK_REURN_VALUE,
          error: `The ${idHook.name} hook return value id 【${id}】 is empty string. `,
          hook: idHook
        })
      } else {
        id = _id
      }
    } else {
      errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
        type: ERROR.HOOKS_CALLBACK_REURN_VALUE,
        error: `The ${idHook.name} hook return value id 【${id}】 is not string type `,
        hook: idHook
      })
    }
  }

  return { startDomMeta, endDomMeta, className, tagName, text, id }
}