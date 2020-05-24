import {
    uniqueId
} from '@/utils'

import * as util from './util';

import eventBus from "@/utils/eventBus";
import store from '@/store'
import { loadStorage } from '@/utils/cache.js'
class command {
    editor = null;
    undoList = []
    redoList = []
    constructor(editor) {
        this.editor = editor;
    }
    executeCommand(key, datas) {
        console.log('------------');
        console.log(key, datas);


        const list = []
        datas.map(data => {
            let model = data
            if (key === 'add') {
                model.id = data.type + uniqueId()
            }
            if (key === 'delete') {
                if (data.getType() === 'node') {
                    const edges = data.getEdges()
                    model = data.getModel()
                    model.type = data.getType()
                    model.id = data.get('id')
                    edges.forEach(edge => {
                        let edgeModel = edge.getModel()
                        edgeModel.type = 'edge'
                        edgeModel.id = edge.get('id')
                        list.push(edgeModel)
                    })
                } else if (data.getType() === 'edge') {
                    model = data.getModel()
                    model.type = data.getType()
                    model.id = data.get('id')
                }
            }
            list.push(model)

            this.doCommand(key, model)

        });
        this.undoList.push({
            key,
            datas: list
        })
        if (key === 'delete') {
            this.redoList = []
        }
        this.editor.emit(key, {
            undoList: this.undoList,
            redoList: this.redoList
        })
    }
    doCommand(key, data) {
        if (key == 'add') {
            console.log('data.type', data.type);
            if (data.type == 'edge') { // 线
                console.log('进来了');
                
                let startNode = util.getNodeById( data.sourceId)
                let endNode = util.getNodeById( data.targetId)
                console.log('startNode', startNode);
                console.log('endNode', endNode);
                if ( startNode.nodeType == 'start' && endNode.nodeType == 'end') {
                    util.operationIllegal();
                    return false;
                } else {
                    this.add(data.type, data)
                }
            } else if (data.type == 'node') {
                this.add(data.type, data)
            }
            console.log('-------');
            
        } else if (key == 'update') {
            this.update(data.item, data.newModel)
        } else if (key == 'delete') {
            this.remove(data)
        }
        /* switch (key) {
            case 'add':
                this.add(data.type, data)
                break;
            case "update":
                this.update(data.item, data.newModel)
                break
            case "delete":
                this.remove(data)
                break
        } */
    }
    add(type, item) {
        this.editor.add(type, item)
        if (type == 'node') {
            let nodeArr = [];
            if (loadStorage('nodes')) { // 如果有只
                nodeArr = loadStorage('nodes')
                nodeArr.push(item)
                store.dispatch('editor/setNodes', nodeArr)
            } else {
                let arr =  [item]
                store.dispatch('editor/setNodes', arr)
            }
        }
    }
    update(item, model) {
        this.editor.update(item, model)
    }
    remove(item) {
        this.editor.remove(item)
    }
    undo() {
        const undoData = this.undoList.pop()
        const edgeList = []
        const list = []
        for (let i = 0; i < undoData.datas.length; i++) {
            const data = undoData.datas[i]
            if (data.type === 'edge') {
                edgeList.push(data)
                continue
            }
            list.push(data)
            this.doundo(undoData.key, data)
        }
        for (let i = 0; i < edgeList.length; i++) {
            const edge = edgeList[i]
            if (edge.source.destroyed) {
                edge.source = edge.sourceId

            }
            if (edge.target.destroyed) {
                edge.target = edge.targetId
            }
            list.push(edge)
            this.doundo(undoData.key, edge)
        }
        this.redoList.push({
            key: undoData.key,
            datas: list
        })
        this.editor.emit(undoData.key, {
            undoList: this.undoList,
            redoList: this.redoList
        })
    }
    doundo(key, data) {
        switch (key) {
            case 'add':
                this.remove(data)
                break;
            case "update":
                this.update(data.item, data.oldModel)
                break
            case "delete":
                this.add(data.type, data)
                break
        }
    }
    redo() {
        const redoData = this.redoList.pop()
        const list = []
        const edgeList = []
        for (let i = 0; i < redoData.datas.length; i++) {
            const data = redoData.datas[i]
            if (data.type === 'edge') {
                edgeList.push(data)
                continue
            }
            list.push(data)
            this.doredo(redoData.key, data)
        }
        for (let i = 0; i < edgeList.length; i++) {
            const edge = edgeList[i]
            if (edge.source.destroyed) {
                edge.source = edge.sourceId

            }
            if (edge.target.destroyed) {
                edge.target = edge.targetId
            }
            list.push(edge)
            this.doredo(redoData.key, edge)
        }
        this.undoList.push({
            key: redoData.key,
            datas: list
        })

        this.editor.emit(redoData.key, {
            undoList: this.undoList,
            redoList: this.redoList
        })
    }
    doredo(key, data) {
        switch (key) {
            case 'add':
                this.add(data.type, data)
                break;
            case "update":
                this.update(data.item, data.newModel)
                break
            case "delete":
                this.remove(data)
                break
        }
    }
    delete(item) {
        this.executeCommand('delete', [item])
    }
}

export default command;