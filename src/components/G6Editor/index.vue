<template>
  <div id="mountNode" :style="{width:width}">
    <div class="editor" >
      <context-menu />
      <!--toolbar-->
      <toolbar />
      <div style="height: 42px;"></div>
      <div class="bottom-container">
        <!--itempannel-->
        <item-panel />
        <!--detailpannel-->
        <detail-panel />
        <!--miniMap-->
        <minimap />
        <!--page-->
        <page :height="height" :width="width"  :data="data" />
      </div>
    </div>
    <Flow />
  </div>
</template>

<script>
import Toolbar from "../Toolbar";
import ItemPanel from "../ItemPanel";
import DetailPanel from "../DetailPanel";
import Minimap from "../Minimap";
import Page from "../Page";
import Flow from "../Flow"
import ContextMenu from "../ContextMenu";
import Editor from "@/components/Base/Editor";
import command from "@/command";
import { removeStorage } from '@/utils/cache.js'
export default {
  name: "G6Editor",
  components: {
    Toolbar,
    ItemPanel,
    DetailPanel,
    Minimap,
    Page,
    ContextMenu,
    Flow
  },
  data() {
    return {
      editor: {},
      command: null,
      initData: {
        "nodes": [
            {
                "name": "测试节点",
                "label": "开始",
                "size": [
                    "80",
                    "80"
                ],
                "type": "node",
                "nodeType": "start",
                "x": 202,
                "y": 64,
                "shape": "customNode",
                "color": "#1890ff",
                "image": "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
                "backImage": "/static/img/logo.82b9c7a5.png",
                "stateImage": "/static/img/ok.463ab0e4.svg",
                "inPoints": [
                    [
                        0,
                        0.5
                    ]
                ],
                "outPoints": [
                    [
                        1,
                        0.5
                    ]
                ],
                "offsetX": 102,
                "offsetY": 16,
                "id": "node2"
            },
            {
                "name": "双输出节点",
                "label": "结束",
                "size": [
                    "170",
                    "34"
                ],
                "type": "node",
                "nodeType": "end",
                "x": 215,
                "y": 195,
                "shape": "customNode",
                "color": "#1890ff",
                "image": "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
                "stateImage": "/static/img/ok.463ab0e4.svg",
                "inPoints": [
                    [
                        0,
                        0.5
                    ]
                ],
                "outPoints": [
                    [
                        1,
                        0.4
                    ],
                    [
                        1,
                        0.6
                    ]
                ],
                "offsetX": 81,
                "offsetY": -1,
                "id": "node9"
            },
            {
                "name": "大型节点",
                "label": "大型节点",
                "size": [
                    "340",
                    "34"
                ],
                "type": "node",
                "x": 598,
                "y": 231,
                "shape": "customNode",
                "color": "#1890ff",
                "image": "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
                "stateImage": "/static/img/ok.463ab0e4.svg",
                "inPoints": [
                    [
                        0,
                        0.5
                    ]
                ],
                "outPoints": [
                    [
                        1,
                        0.5
                    ]
                ],
                "offsetX": 76,
                "offsetY": 16,
                "id": "node18"
            },
            {
                "name": "背景图片节点",
                "label": "中间",
                "size": [
                    "170",
                    "34"
                ],
                "type": "node",
                "nodeType": "center",
                "x": 469,
                "y": 99,
                "shape": "customNode",
                "color": "#1890ff",
                "image": "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
                "stateImage": "/static/img/ok.463ab0e4.svg",
                "backImage": "/static/img/bg.9a8b47e5.jpg",
                "inPoints": [
                    [
                        0,
                        0.5
                    ]
                ],
                "outPoints": [
                    [
                        1,
                        0.5
                    ]
                ],
                "offsetX": 90,
                "offsetY": 17,
                "id": "node25"
            }
        ],
        "edges": [
            {
                "id": "edge79",
                "source": "node2",
                "target": "node25",
                "sourceId": "node2",
                "targetId": "node25",
                "start": {
                    "x": 0,
                    "y": 40
                },
                "end": {
                    "x": 0,
                    "y": -17
                },
                "shape": "customEdge",
                "type": "edge",
                "startPoint": {
                    "x": 242.5,
                    "y": 69.30898876404495
                },
                "endPoint": {
                    "x": 383.5,
                    "y": 87.79213483146067
                }
            },
            {
                "id": "edge133",
                "source": "node25",
                "target": "node9",
                "sourceId": "node25",
                "targetId": "node9",
                "start": {
                    "x": 0,
                    "y": 17
                },
                "end": {
                    "x": 0,
                    "y": -17
                },
                "shape": "customEdge",
                "type": "edge",
                "startPoint": {
                    "x": 422.69791666666663,
                    "y": 116.5
                },
                "endPoint": {
                    "x": 261.30208333333337,
                    "y": 177.5
                }
            }
        ],
        "groups": []
      }
    }
  },
  props: {
    height: {
      type: Number,
      default: document.documentElement.clientHeight
    },
    width: {
      type: Number,
      default: document.documentElement.clientWidth
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.init();
    removeStorage('nodes')
  },
  methods: {
    init() {
      this.editor = new Editor();
      this.command = new command(this.editor);
    }
  }
};
</script>

<style scoped>
.editor {
  position: relative;
  width: 100%;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.bottom-container {
  position: relative;
}
</style>