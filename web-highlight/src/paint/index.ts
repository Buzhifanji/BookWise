import { INTERNAL_ERROR_EVENT, errorEventEimtter } from "../event";
import { Hook, handleHookCall } from "../hook";
import { Doc, DomSource } from "../interface";
import { Mode } from "../option";
import { isLen } from "../util/array";
import { DATA_WEB_HIGHLIGHT, DATA_WEB_HIGHLIGHT_EXTRA } from "../util/const";
import { getAttr, selctorAll } from "../util/dom";
import { ERROR } from "../util/err";
import { isNull } from "../util/is";
import { getPaintedDoms } from "./dom";
import { Paint, RemvoePaint } from "./interface";
import { paintReserve } from "./paint-reserve";
import { getPaintedIds, paintSingle } from "./paint-single";
import { getSelectNodes } from "./select-node";
import { warpToRemove, wrapToUpdate } from "./wrap";

export function paint({ source, root, mode, store, selectNodeHook, wrapNodeHook, removeSourceHook }: Paint) {
  const { id, tagName } = source

  const paintedDoms = getPaintedDoms(tagName, id, root)
  if (isLen(paintedDoms)) {
    //已经绘制过了，无需再绘制
    errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
      type: ERROR.DARA_DOM_REPEATEDLY,
      error: `The highlight source has painted.`,
      detail: source
    })

    return null
  }

  let selectNodes = getSelectNodes(source, root);
  if (isNull(selectNodes)) {
    return null
  }

  if (!isLen(selectNodes)) {
    errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
      type: ERROR.DOM_SELECTION_EMPTY,
      error: `The selection contains select nodes is empty.`,
      detail: source
    })

    return null
  }

  if (mode === Mode.single) {
    return paintSingle({ selectNodes, source, root, store, selectNodeHook, wrapNodeHook, removeSourceHook })
  } else if (mode === Mode.reserve) {

    selectNodes = handleHookCall(selectNodes, selectNodeHook, source.id, [])

    return { wrap: paintReserve(selectNodes, source, wrapNodeHook), ids: [] }
  } else {
    return null
  }
}


export function removePainted({ source, root, mode, removeSourceHook }: RemvoePaint) {
  const { id, tagName } = source

  const paintedDoms = getPaintedDoms(tagName, id, root)

  const toRemove: HTMLElement[] = [];
  const toUpdate: HTMLElement[] = [];

  paintedDoms.forEach((dom) => {
    const extraId = mode === Mode.reserve && getAttr(dom, DATA_WEB_HIGHLIGHT_EXTRA);
    extraId ? toUpdate.push(dom) : toRemove.push(dom);
  });

  warpToRemove(toRemove, removeSourceHook)

  wrapToUpdate(toUpdate)
}

export function removeAllPainted(root: Doc, tagName: string, removeSourceHook: Hook<HTMLElement>) {
  const doms = selctorAll(`${tagName}[${DATA_WEB_HIGHLIGHT}]`, root)
  warpToRemove(doms, removeSourceHook)
}

export function getSourceRemvoeIds(source: DomSource, root: Doc) {
  const result: string[] = []

  const selectNodes = getSelectNodes(source, root);

  if (selectNodes) {
    const oldIds = getPaintedIds(selectNodes)

    result.push(...oldIds)
  }

  return result
}