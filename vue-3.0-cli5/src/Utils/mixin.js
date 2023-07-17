export const Lifecycle = {
    setup() {
        console.log('mixin---setup---')
        //数据
        let sum = ref(0)

        //通过组合式API的形式去使用生命周期钩子
        onBeforeMount(() => {
            console.log('mixin---onBeforeMount---')
        });
        onMounted(() => {
            console.log('mixin---onMounted---')
        });
        onBeforeUpdate(() => {
            console.log('mixin---onBeforeUpdate---')
        });
        onUpdated(() => {
            console.log('mixin---onUpdated---')
        });
        onBeforeUnmount(() => {
            console.log('mixin---onBeforeUnmount---')
        });
        onUnmounted(() => {
            console.log('mixin---onUnmounted---')
        });

    },
}