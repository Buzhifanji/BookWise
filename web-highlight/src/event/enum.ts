export enum UserInputEvent {
  touchend = 'touchend',
  mouseup = 'mouseup',
  touchstart = 'touchstart',
  click = 'click',
  dbclick = 'dblclick',
  mouseover = 'mouseover'
}

export enum EventTypeEnum {
  SOURCE = 'selection:source',
  CREATE = 'selection:create',
  REMOVE = 'selection:remove',
  MODIFY = 'selection:modify',
  HOVER = 'selection:hover',
  HOVER_OUT = 'selection:hover-out',
  CLICK = 'selection:click'
}

export enum CreateFrom {
  source = 'source',
  rang = 'rang'
}
