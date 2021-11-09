<template>
  <div>
    <button @click="editor">点击</button>
    <el-dialog title="差异对比" :visible.sync="editorDialog" class="history">
      <section class="box">
        <span>【注】左侧为历史版本，右侧为当前版本</span>
        <div id="view"></div>
      </section>
    </el-dialog>
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
  },
}
</script>

<style>
</style>