# 配置型表单表格

`config-table`、`config-form`有很多相似之处，细节上又有些出入。

### 公共配置

| 参数       | 说明                                          | 类型    | 可选值 | 默认值 |
| ---------- | --------------------------------------------- | ------- | ------ | ------ |
| isEdit     | 编辑状态                                      | Boolean |        | false  |
| cols       | 设置项，通过它来设置要显示的内容              | Array   | 必填   |        |
| formConfig | 直接对组件内使用的`<el-form>`组件直接进行配置 | Object  |        | {}     |

> <span style="color: red;">注意！</span>**table**和**form**内的`<el-form>`都有各自的默认值，设置`formConfig`可以在原有的基础上添加或者覆盖属性。`<el-form>`支持的属性，通过`formConfig`都能使用。

### Table独有配置

| 参数          | 说明                                                       | 类型     | 可选值 | 默认值 |
| ------------- | ---------------------------------------------------------- | -------- | ------ | ------ |
| tableConfig   | 直接对组件内使用的`<el-table>`组件直接进行配置             | Object   |        | {}     |
| getDataUrl    | 表格获取数据时使用的Url（数据结构是通用的样子）            | String   |        |        |
| getDataMethod | 在返回的数据结构和通用的获取方法不一样时，可自定义获取方法 | Function |        |        |
| selection     | 是否可选择                                                 | Boolean  |        | false  |
| index         | 是否带索引                                                 | Boolean  |        | true   |

### Form独有配置

| 参数            | 说明       | 类型   | 可选值 | 默认值 |
| --------------- | ---------- | ------ | ------ | ------ |
| value / v-model | 绑定表单值 | Object |        |        |

### cols公共属性说明

`config-table`、`config-form`的配置都是一样的

| 字段   | 说明                                                         | 类型            | 可选值        |
| ------ | ------------------------------------------------------------ | --------------- | ------------- |
| key    | 获取数据的关键字，可以通过`.`来获取更深层级的数据，例如`user.name` | String          |               |
| title  | 字段名称，可直接传入国际化字段                               | String          |               |
| type   | 要使用的组件，不指定的话就是普通的文本                       | String          | input、select |
| rules  | 指定校验规则，可以是数组，也可以是Function                   | String/Function |               |
| config | 对原有组件的配置，例如，可直接通过它多el-input进行配置（type: input） | Object          |               |

> <span style="color: red;">注意！</span>对于不同类型的组件，已经提供了默认的配置，例如：`placeholder`，使用`config`可以在原有的基础上添加或者覆盖属性。所有el组件支持的属性，都能在这里进行设置。<span style="color: red;">甚至</span>，这里能够传入一个方法，根据入参信息，动态指定类型。

### 特有组件的cols属性

根据type的不同，特别的组件拥有额外的配置选项。

| 组件名    | 设置                                                         |
| --------- | ------------------------------------------------------------ |
| input     | 1、`onInput(value)`钩子，传入一个函数，在输入框中输入内容时触发，value为当前输入的值。 |
| select    | 1、`options`，设置选项内容，可以是一个数组，也可以传入一个方法，返回数组。2、`onChange(value)`钩子，传入一个函数，在内容被选择时触发，value为当前选择的值。 |
| operation | 1、`icons：[{name,  tooltip,  active}]`，指定要显示的图标，name：图标名称。tootip：鼠标覆盖在图标时显示的信息，可以直接传入一个字符串，也可以传入方法，入参为scope。active，图标状态，使用同tooltip。 |

### 使用参考

PCB_NPI：src\components\process\pcb-npi

