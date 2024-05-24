<template>
  <ClientOnly>
  <div ref="containerRef"></div>
  </ClientOnly>
</template>
<script setup lang="ts">
import G6 from '@antv/g6';
import {ref,watch,onMounted,nextTick} from 'vue'
import TestData from './test.json'
const containerRef=ref()

const render=(data)=>{
  
    const graph = new G6.TreeGraph({
      container:containerRef.value,
      width: 800, // Number，必须，图的宽度
      height: 800, // Number，必须，图的高度
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const data = item.get('model');
              data.collapsed = collapsed;
              return true;
            },
          },
          'drag-canvas',
          'zoom-canvas',
        ],
      },

      defaultEdge: {
        type: 'cubic-horizontal',
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHeight: () => {
          return 16;
        },
        getWidth: () => {
          return 200;
        },
        getVGap: () => {
          return 10;
        },
        getHGap: () => {
          return 100;
        },
        getSide: () => {
          return 'right';
        },
      },
    });

    let centerX = 0;
    graph.node(function (node) {
      if (node.id === 'Modeling Methods') {
        centerX = node.x;
      }
    return {
        label: node.data.text,
        labelCfg: {
          position:
            node.children && node.children.length > 0
              ? 'right'
              : node.x > centerX
              ? 'right'
              : 'left',
          offset: 5,
          autoEllipsis: true, // 开启自动换行
        },
      };
    });
    graph.data(data);
    graph.render();
    graph.fitView();
}

onMounted(()=>{
  nextTick(()=>{
    render(TestData.root)
  })
})
</script>
<style lang="less" scoped>
</style>
