export interface Action<T> {
  readonly type: string
  readonly payload?: T
}

export type AnyAction = Action<any>

interface ActionCreator<T> {
  readonly type: string
  (payload: T): Action<T>
}

export function actionCreator<T>(type: string): ActionCreator<T> {
  return Object.assign((payload: T): any => ({ type, payload }), { type })
}

export function is<T>(a: AnyAction, ac: ActionCreator<T>): a is Action<T> {
  return a.type === ac.type
}
