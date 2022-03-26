<template>
  <div>
    <button @click="editor">点击</button>
    <button @click="editor2">点击2</button>
    <el-dialog title="差异对比" :visible.sync="editorDialog" class="history">
      <section class="box">
        <span>【注】左侧为历史版本，右侧为当前版本</span>
        <div id="view"></div>
      </section>
    </el-dialog>
    <div class="body">
      <div class="box">
        <pre id='pre1'></pre>
      </div>
      <div class="box">
        <pre id='pre2'></pre>
      </div>
    </div>
  </div>
</template>

<script>
// 代码对比插件
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/merge/merge.js'
import 'codemirror/addon/merge/merge.css'
// 对比
import DiffMatchPatch from 'diff-match-patch'
window.diff_match_patch = DiffMatchPatch
window.DIFF_DELETE = -1
window.DIFF_INSERT = 1
window.DIFF_EQUAL = 0
export default {
  data() {
    return {
      editorDialog: false,
      oldStr: "cs少时诵诗书",
      newStr: 'cf少时诵诗书11'
    }
  },
  methods: {
    // json对比
    initUI(value, orig) {
      if (value == null) return
      const target = document.getElementById('view')
      target.innerHTML = ''
      CodeMirror.MergeView(target, {
        value: value, // 上次内容
        origLeft: null,
        orig: orig, // 本次内容
        lineNumbers: true, // 显示行号
        mode: '',
        highlightDifferences: true,
        foldGutter: true,
        lineWrapping: true,
        styleActiveLine: true,
        matchBrackets: true,
        connect: 'align',
        readOnly: true // 只读 不可修改 
      })
    },
    /** 按钮操作 */
    editor() {
      this.editorDialog = true
      // 初始化版本差异
      this.$nextTick(function () {
        var a = this.oldStr // 旧版本
        var b = this.newStr // 新版本
        this.initUI(a, b)
      })
    },
    editor2() {
      // 格式化
      function fm(str) {
        return JSON.stringify(JSON.parse(str), null, 4)
      }
      const str = '{"name":"张馨元","age":25.2,"birthday":"1990-01-01","children":{"name":"彭璇","age":25.2,"birthday":"1990-01-01"}}'
      const str1 = '{"name":"孙炳义","age":25.2,"birthday":"1990-01-01","children":{"name":"张馨元","age":25.2,"birthday":"1990-01-01"}}'
      const dmp = new DiffMatchPatch();
      const diff = dmp.diff_main(fm(str), fm(str1));
      document.querySelector("#pre1").innerHTML = fm(str);
      document.querySelector("#pre2").innerHTML = this.modify(diff);
    },
    modify(arr) {
      return arr.reduce((pre, next) => {
        if (next[0] === 0) {
          return pre += next[1]
        } else if (next[0] === 1) {
          return pre += `<span style="color: red;background: yellow">${next[1]}</span>`
        } else {
          return pre
        }
      }, '')
    }
  },
}
</script>
  <style>
.body {
  width: 1000px;
  height: 500px;
  display: flex;
}

.box {
  flex: 1;
  margin: 10px;
  border: 1px solid #000;
  text-align: left;
}
</style>