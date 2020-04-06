### Basic Component 使用说明

Basic Component 需要与 destroy 装饰器同时使用以达到清理的功能，**被清理的对象  只会是继承自 Store 的对象**。

> 模块组件

必须继承此类并且使用 destroy 装饰器清理 container，其内部 store 不需要使用此装饰器

```tsx
import BasicComponent, { destroy } from 'components/Base/BasicComponent'
import container from 'ioc/yourContainer'

@destroy(container)
export default ModuleComponent extends BasicComponent {
}
```

- TIP： 使用 destroy 装饰器会在组件生命周期结束时清理 container 中所有的 Store 及 container 中的单例，更多细节可以参考测试 **_module destroy test_**

> 非模块组件

可选择是否使用此类（建议使用），此类可提供两个功能

- _getRootDOM_ 使用此方法直接获取根 DOM，可以用于 popover 等需要 getContainer 的组件直接使用
- _@destroy(container)_ 使用此装饰器装饰 Store 属性可以在组件生命周期结束时对 Store 进行清理，**(WARN)同时清理 container 中的单例**，更多细节可以参考测试 **_store destroy test_**
