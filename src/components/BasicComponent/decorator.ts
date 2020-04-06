import { Container } from 'inversify'
import Store from 'stores/store'

/**
 * 销毁装饰器中的 Store清理功能
 * @param container Store所在的container，当Store被清理时会刷新单例
 * @param properykey Store所在的属性
 */
const destroyStore = function(
  container: Container | undefined,
  properykey: string
) {
  return {
    configurable: true,
    set(value: any) {
      const ctx = this as any
      Object.defineProperty(ctx, properykey, {
        writable: true,
        configurable: true,
        value
      })

      if (!ctx.addDisposer) {
        console.error('component is not BasicComponent')
        return
      }
      if (!(value instanceof Store)) {
        console.error('destroy value must be Store instance')
        return
      }
      if (container && ctx._loc_container === container) {
        return
      }
      ctx.addDisposer(function() {
        value.dispose()
        if (container) {
          const iocContainer = container as any
          iocContainer._bindingDictionary._map.forEach(
            (entries: any, key: any) => {
              // 遍历container中的Store，对当前value进行rebind
              const instance = entries[0]
              if (instance && instance.cache === value) {
                container.rebind(key).to(instance.implementationType)
              }
            }
          )
        }
      })
    }
  }
}

/**
 * 销毁装饰器中的 Container清理功能
 * @param container 组件生命周期结束时，需要被清理的container
 * @param target 被装饰的BasicComponent
 */
const destroyContainer = function(
  container: Container | undefined,
  target: any
) {
  target.prototype._ioc_container = container
  return target
}

export const destroy = function(container?: Container): any {
  // 返回销毁装饰器
  return function(target: any, properykey: string) {
    if (properykey) {
      // 装饰对象为属性，其值为Store时
      return destroyStore(container, properykey)
    }
    // 装饰对象为BasicComponent时
    return destroyContainer(container, target)
  }
}
