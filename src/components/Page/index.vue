<template>
  <div class="page">
    <div :id="pageId" class="graph-container" style="position: relative;"></div>
  </div>
</template>


<script>
import G6 from "@antv/g6/build/g6";
import { initBehavors } from "@/behavior";
export default {
  data() {
    return {
      pageId: "graph-container",
      graph: null,
      initData: {
        nodes: [
          {
            name: "测试节点",
            label: "开始",
            size: ["80", "80"],
            type: "node",
            nodeType: "start",
            x: 202,
            y: 64,
            shape: "customNode",
            color: "#1890ff",
            image:
              "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
            backImage: "/static/img/logo.82b9c7a5.png",
            stateImage: "/static/img/ok.463ab0e4.svg",
            inPoints: [[0, 0.5]],
            outPoints: [[1, 0.5]],
            offsetX: 102,
            offsetY: 16,
            id: "node2"
          },
          {
            name: "双输出节点",
            label: "结束",
            size: ["170", "34"],
            type: "node",
            nodeType: "end",
            x: 215,
            y: 195,
            shape: "customNode",
            color: "#1890ff",
            image:
              "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
            stateImage: "/static/img/ok.463ab0e4.svg",
            inPoints: [[0, 0.5]],
            outPoints: [[1, 0.4], [1, 0.6]],
            offsetX: 81,
            offsetY: -1,
            id: "node9"
          },
          {
            name: "大型节点",
            label: "大型节点",
            size: ["340", "34"],
            type: "node",
            x: 598,
            y: 231,
            shape: "customNode",
            color: "#1890ff",
            image:
              "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
            stateImage: "/static/img/ok.463ab0e4.svg",
            inPoints: [[0, 0.5]],
            outPoints: [[1, 0.5]],
            offsetX: 76,
            offsetY: 16,
            id: "node18"
          },
          {
            name: "背景图片节点",
            label: "中间",
            size: ["170", "34"],
            type: "node",
            nodeType: "center",
            x: 469,
            y: 99,
            shape: "customNode",
            color: "#1890ff",
            image:
              "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
            stateImage: "/static/img/ok.463ab0e4.svg",
            backImage: "/static/img/bg.9a8b47e5.jpg",
            inPoints: [[0, 0.5]],
            outPoints: [[1, 0.5]],
            offsetX: 90,
            offsetY: 17,
            id: "node25"
          }
        ],
        edges: [
          {
            id: "edge79",
            source: "node2",
            target: "node25",
            sourceId: "node2",
            targetId: "node25",
            start: {
              x: 0,
              y: 40
            },
            end: {
              x: 0,
              y: -17
            },
            shape: "customEdge",
            type: "edge",
            startPoint: {
              x: 242.5,
              y: 69.30898876404495
            },
            endPoint: {
              x: 383.5,
              y: 87.79213483146067
            }
          },
          {
            id: "edge133",
            source: "node25",
            target: "node9",
            sourceId: "node25",
            targetId: "node9",
            start: {
              x: 0,
              y: 17
            },
            end: {
              x: 0,
              y: -17
            },
            shape: "customEdge",
            type: "edge",
            startPoint: {
              x: 422.69791666666663,
              y: 116.5
            },
            endPoint: {
              x: 261.30208333333337,
              y: 177.5
            }
          }
        ],
        groups: []
      }
    };
  },
  props: {
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    initBehavors();
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      const height = this.height - 42;
      const width = this.width - 400;

      this.graph = new G6.Graph({
        container: "graph-container",
        height: height,
        width: width,
        modes: {
          // 支持的 behavior
          default: [
            "drag-canvas",
            "zoom-canvas",
            "hover-node",
            "select-node",
            "hover-edge",
            "keyboard",
            "customer-events",
            "add-menu",
            {
              type: "tooltip", // 提示框
              formatText(model) {
                // 提示框文本内容
                console.log(model);

                const text =
                  "label: " + model.label + "<br/> class: " + model.label;
                return text;
              },
              shouldUpdate: e => {
                return true;
              }
            },
            {
              type: "edge-tooltip", // 边提示框
              formatText(model) {
                // 边提示框文本内容
                const text =
                  "source: " +
                  model.source +
                  "<br/> target: " +
                  model.target +
                  "<br/> weight: " +
                  model.weight;
                return text;
              }
            }
          ],
          mulitSelect: ["mulit-select"],
          addEdge: ["add-edge"],
          moveNode: ["drag-item"]
        }
      });
      const { editor, command } = this.$parent;
      editor.emit("afterAddPage", { graph: this.graph, command });

      this.readData();
    },
    readData() {
      let data = this.initData;
      if (data) {
        // this.graph.read(data);
        this.graph.data(data); // 加载数据
        this.graph.render(); // 渲染
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  margin-left: 200px;
  margin-right: 200px;
  .graph-container {
    &::v-deep .g6-tooltip {
      background: #000;
      color: red;
    }
  }
}
</style>