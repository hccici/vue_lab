<template>
    <div ref="main" class="container">
        <div class="v-input" ref="inputBox" @click="handClick">
            <div v-for="item of showData" :key="item.value" class="v-input--item">
                <span>{{item.label}}</span>
                <i
                    v-if="item.value!=='msnmore'"
                    @click="select('other',item)"
                    class="el-icon-close v-input--item--close"
                ></i>
            </div>
        </div>
        <div ref="box" class="box" @click.stop>
            <div class="box--search" :placeholder="placeholder">
                <input
                    ref="input"
                    :placeholder="placeholder"
                    class="box--search--input"
                    type="text"
                    @input="searchMore"
                    v-model="searchVal"
                />
            </div>
            <div class="box--btnBox">
                <div class="box--btnBox--btn" @click="select('all')">{{leftBtnText}}</div>
                <div class="box--btnBox--btn" @click="select('clear')">{{rightBtnText}}</div>
            </div>
            <div @scroll="onScroll" class="box--list" :style="{maxHeight: `${maxH}px`}">
                <template v-if="optionList.length!==0">
                    <div
                        v-for="item of optionList"
                        :key="item.value"
                        @click="select('other',item)"
                        class="box--list--item"
                        :class="{'box--list--item__selected': isSelected(item.value)}"
                    >
                        <span>{{item.label}}</span>
                    </div>
                </template>
                <div v-else class="box--list--item box--list--item__empty">No data!</div>
            </div>
        </div>
    </div>
</template>

<script>
import emitter from 'element-ui/src/mixins/emitter';
const selfRecord = {};
export default {
    name: 'msnSeachSelect',
    props: {
        data: {
            type: Array,
            required: true,
            default: () => []
        },
        optionList: {
            type: Array,
            required: true
        },
        placeholder: {
            type: String,
            default: 'search...'
        },
        leftBtnText: {
            type: String,
            default: 'All'
        },
        rightBtnText: {
            type: String,
            default: 'Clear'
        },
        matchFn: {
            type: Function,
            default: (target, list) => {
                if (target === '') return list;
                const result = [];
                for (let item of list) {
                    if (item.label.indexOf(target) > -1) {
                        result.push(item);
                    }
                }
                return result;
            }
        },
        maxH: {
            type: Number,
            default: 200
        },
        loadmore: {
            type: Function,
            default: () => {}
        }
    },
    model: {
        prop: 'data',
        event: 'selected'
    },
    data() {
        return {
            searchVal: '',
            reachBottomDistance: 50,
            isReachBottom: false
        };
    },
    methods: {
        isSelected(value) {
            return this.data.includes(value);
        },
        selfValid(value) {
            this.dispatch('ElFormItem', 'el.form.change', [value]);
        },
        select(opt, sitem) {
            if (opt === 'all') {
                let result = [
                    ...this.data,
                    ...this.optionList.map(item => {
                        selfRecord[item.value] = item.label;
                        return item.value;
                    })
                ];
                result = Array.from(new Set(result));
                this.$emit('selected', result);
                this.selfValid(result);
            } else if (opt === 'clear') {
                let result = [...this.data];
                if (this.searchVal === '') {
                    result = [];
                } else {
                    for (let item of this.optionList) {
                        let tempI = result.indexOf(item.value);
                        tempI > -1 && result.splice(tempI, 1);
                    }
                }
                this.$emit('selected', result);
                this.selfValid(result);
            } else {
                selfRecord[sitem.value] = sitem.label;
                const result = [...this.data];
                result.includes(sitem.value)
                    ? result.splice(result.indexOf(sitem.value), 1)
                    : result.push(sitem.value);
                this.$emit('selected', result);
                this.selfValid(result);
            }
        },
        handClick() {
            this.$refs.inputBox.classList.add('v-input__reverse');
            // 计算该组件的位置
            const rect = this.$refs.main.getBoundingClientRect();
            const box = this.$refs.box;
            box.style.width = `${rect.width}px`;
            // 决定弹出框的上下
            if (document.documentElement.clientHeight - rect.bottom < 280) {
                box.style.top = 'initial';
                box.style.bottom = `${rect.height + 10}px`;
            } else {
                box.style.bottom = 'initial';
                box.style.top = `${rect.height + 10}px`;
            }
            box.style.display = 'block';
            // input框获取焦点
            this.$refs.input.focus();
            event.stopPropagation();
        },
        close() {
            this.$refs.box.style.display = 'none';
            this.$refs.inputBox.classList.remove('v-input__reverse');
        },
        onScroll(e) {
            let scrollTop = e.target.scrollTop;
            let scrollHeight = e.target.scrollHeight;
            let offsetHeight = Math.ceil(
                e.target.getBoundingClientRect().height
            );
            let currentHeight
                = scrollTop + offsetHeight + this.reachBottomDistance;

            if (currentHeight < scrollHeight && this.isReachBottom) {
                this.isReachBottom = false;
            }
            if (this.isReachBottom) {
                return;
            }
            if (currentHeight >= scrollHeight) {
                this.isReachBottom = true;
                this.loadmore();
            }
        },
        searchMore(e) {
            this.loadmore(e.target.value, 'filter');
        }
    },
    computed: {
        showData() {
            // 获取label
            const showData = this.data.map(item => {
                return { value: item, label: selfRecord[item] };
            });
            // 计算长度标签加载一起后的长度
            let length = 0;
            let index = showData.length;
            for (let i = 0; i < showData.length; i++) {
                length += showData[i].label.length * 8 + 30;
                if (
                    length
                    >= this.$refs.main.getBoundingClientRect().width - 50
                ) {
                    index = i;
                    break;
                }
            }
            if (index < showData.length) {
                let arr = [...showData];
                arr.splice(index, showData.length - index, {
                    value: 'msnmore',
                    label: `+ ${showData.length - index}`
                });
                return arr;
            } else {
                return showData;
            }
        }
    },
    mounted() {
        window.addEventListener('click', this.close);
    },
    beforeDestroy() {
        window.removeEventListener('click', this.close);
    },
    mixins: [emitter]
};
</script>

<style scoped lang="scss">
$bg: #eef1f4;
$item: #2dd1ac;
$gray: #edeeee;
.container {
    position: relative;
}
.v-input {
    width: 100%;
    height: 35px;
    background: $bg;
    border-radius: 17.5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    &--item {
        font-size: 13px;
        line-height: 24px;
        height: 24px;
        color: #ffffff;
        padding: 0 8px;
        border-radius: 13px;
        margin-left: 6px;
        background: $item;
        &--close {
            position: relative;
            top: 1px;
            cursor: pointer;
        }
    }
    &::after {
        display: block;
        font-family: "element-icons";
        content: "\E6E1";
        color: #c0c4cc;
        font-size: 14px;
        position: absolute;
        top: 0;
        right: 12px;
        transform: rotateZ(180deg);
        cursor: pointer;
        transition: transform 0.3s, -webkit-transform 0.3s;
    }
    &__reverse {
        &::after {
            transform: rotateZ(0deg);
        }
    }
}
.box {
    display: none;
    position: absolute;
    z-index: 1000;
    background: #ffffff;
    box-shadow: 0 2px 10px 0 rgba(119, 151, 178, 0.5);
    border-radius: 6px;
    &--list {
        overflow-y: scroll;
        &--item {
            height: 35px;
            line-height: 35px;
            font-size: 13px;
            color: #53575b;
            text-indent: 20px;
            &__selected {
                position: relative;
                color: $item;
                &::after {
                    display: block;
                    font-family: "element-icons";
                    content: "\E6DA";
                    font-size: 12px;
                    font-weight: bold;
                    position: absolute;
                    top: 0;
                    right: 20px;
                }
            }
            &:hover {
                background-color: #eef4f9;
            }
            &__empty {
                text-align: center;
                &:hover {
                    background-color: transparent;
                }
            }
        }
        &::-webkit-scrollbar {
            width: 6px;
        }
        &::-webkit-scrollbar-thumb {
            background: #d8d8d8;
            border-radius: 2.5px;
        }
    }
    &--search {
        &--input {
            width: 100%;
            box-sizing: border-box;
            border: none;
            height: 36px;
            line-height: 36px;
            text-indent: 2em;
            &:focus {
                outline: 1px solid $item;
            }
        }
    }
    &--btnBox {
        display: flex;
        justify-content: space-between;
        border-top: solid 1px $gray;
        border-bottom: solid 1px $gray;
        &--btn {
            box-sizing: border-box;
            width: 50%;
            height: 36px;
            line-height: 36px;
            text-align: center;
            font-size: 13px;
            color: #53575b;
            &:first-child {
                border-right: 0.5px solid $gray;
            }
            &:last-child {
                border-left: 0.5px solid $gray;
            }
        }
    }
}
</style>
