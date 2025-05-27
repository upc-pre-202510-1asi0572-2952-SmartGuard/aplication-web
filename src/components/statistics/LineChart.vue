<template>
    <div class="px-4 py-5 flex flex-col gap-4 bg-white shadow-2xl rounded-lg flex-1/2">
        <h2 class="text-lg font-semibold">Accesos por día</h2>
        <Chart type="line" :data="chartData" :options="chartOptions" class="md:max-w-[350px]" />
    </div>
</template>


<script>

import Chart from 'primevue/chart';
export default {
    components: {
        Chart
    },
    data() {
        return {
            chartData: null,
            chartOptions: null,
        }
    },
    mounted() {
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
    },
    methods: {
        setChartData() {
            const documentStyle = getComputedStyle(document.documentElement);

            return {
                labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7'],
                datasets: [
                    {
                        label: 'Accesos',
                        data: [0, 3, 4, 6, 5, 8, 6],
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--p-blue-500') || '#3B82F6',
                        tension: 0.4
                    },
                ]
            };
        },
        setChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color') || '#333333';
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color') || '#6B7280';
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color') || '#D1D5DB';

            return {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1.5,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: textColor
                        }
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    }
                }
            };
        },

    }
}

</script>

<style lang="">

</style>