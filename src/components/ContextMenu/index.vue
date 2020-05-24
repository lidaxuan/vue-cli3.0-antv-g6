<template>
  <div>
    <ul class="el-scrollbar__view el-select-dropdown__list context-menu" ref="contextMenu">
      <li
        class="el-select-dropdown__item"
        v-for="menu in menus"
        :key="menu.key"
        @click="handleClick(menu)"
      >{{menu.name}}</li>
    </ul>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
export default {
  data() {
    return {
      menus: [{ key: 1, name: "删除", type: 'delete' }, { key: 2, name: "复制", type: 'copy' }]
    };
  },
  created() {
    this.bindEvent();
  },
  methods: {
    init() {},
    bindEvent() {
      eventBus.$on("contextmenuClick", e => {
        const menu = this.$refs.contextMenu;
        menu.style.left = e.clientX + "px";
        menu.style.top = e.clientY + "px";
        menu.style.display = "block";
      });
       eventBus.$on("mousedown", () => {
        const menu = this.$refs.contextMenu;
        menu.style.display = "none";
      });
    },
    handleClick(item) {
      if (item.type == 'delete') {
        this.handleDel(item);
      } else if (item.type == 'copy') {
        this.handleCopy(item);
      }
    },
    // 删除
    handleDel(item) {
       this.$confirm('要删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (item.type == 'delete') {
            this.$message({ type: 'success', message: '删除成功!' });
            eventBus.$emit('deleteItem')
          }
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消删除' });          
        });
      const menu = this.$refs.contextMenu;
      menu.style.display = "none";
    },
    // 复制
    handleCopy(item){

    }
  }
};
</script>

<style>
.context-menu {
  position: absolute;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 5px 0;
  z-index: 1;
  display: none;
}

.context-menu li {
  cursor: pointer;
  font-size: 12px;
  height: 28px;
  line-height: 28px;
}
.context-menu li:hover {
  background-color: #f5f7fa;
}
</style>