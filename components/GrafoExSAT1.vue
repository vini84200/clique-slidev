<template>
    <p> :::{{ $slidev.nav.clicks }}</p>
    <GraphlyD3 ref="graphly" />
</template>

<script setup lang="ts" >
import GraphlyD3 from "@livereader/graphly-d3/component/vue3";
import "@livereader/graphly-d3/style.css";
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import Circle from "../graph/templates/circle";


const graphly = ref(null);
const simulation = computed(() => graphly.value?.simulation);
const circle = Circle;
const graph = {
    nodes: [
        {
            id: 'a', shape: {
                type: 'tag',
                scale: 0.2,
            },
            x: 100,
            y: 100,
        },
        {
            id: 'b', shape: {
                type: 'circle',
                scale: .2
            },
            x: 120,
            y: 120,

        },
        {
            id: 'c', shape: {
                type: 'circle',
                scale: .2
            },
            x: 140,
            y: 80,
        },
    ], links: $slidev.nav.clicks == 1 ? [
        { source: 'b', target: 'c' },
    ] : [
        { source: 'a', target: 'b' },
        { source: 'b', target: 'c' },
        { source: 'c', target: 'a' },
        { source: 'a', target: 'c' }
    ]
};


onMounted(() => {
    const simulation = graphly.value?.simulation;
    // console.log(simulation);
    // console.log(Circle);

    simulation.linkDistance = 250;
    simulation.templateStore.add('circle', Circle);
    simulation.render(graph, 0);
});

watch(() => $slidev.nav.clicks, (val) => {
    const graph = {
        nodes: [
            {
                id: 'a', shape: {
                    type: 'tag',
                    scale: 0.2,
                },
                x: 100,
                y: 100,
            },
            {
                id: 'b', shape: {
                    type: 'circle',
                    scale: .2
                },
                x: 120,
                y: 120,

            },
            {
                id: 'c', shape: {
                    type: 'circle',
                    scale: .2
                },
                x: 140,
                y: 80,
            },
        ], links: $slidev.nav.clicks == 1 ? [
            { source: 'b', target: 'c' },
        ] : [
            { source: 'a', target: 'b' },
            { source: 'b', target: 'c' },
            { source: 'c', target: 'a' },
            { source: 'a', target: 'c' }
        ]
    };
    console.log(val);
    simulation.value.render(graph, 0);
});

</script>
