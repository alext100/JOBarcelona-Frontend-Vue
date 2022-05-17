import { computed, onMounted, onUnmounted, ref } from "vue";

export default function useBreakpoints() {
  const windowWidth = ref(window.innerWidth);

  function onWidthChange() {
    windowWidth.value = window.innerWidth;
  }
  onMounted(() => window.addEventListener("resize", onWidthChange));
  onUnmounted(() => window.removeEventListener("resize", onWidthChange));

  const breakpoint = computed(() => {
    if (windowWidth.value < 440) return "xs";
    if (windowWidth.value < 640) return "sm";
    if (windowWidth.value < 768) return "md";
    if (windowWidth.value < 1024) return "lg";
    if (windowWidth.value < 1280) return "xl";
    return "2xl";
  });

  const width = computed(() => windowWidth.value);

  const upToLargeBreakpoint = computed(() => ["xs", "sm", "md", "lg"].includes(breakpoint.value));

  const upToMediumBreakpoint = computed(() => ["xs", "sm", "md"].includes(breakpoint.value));

  const upToSmallBreakpoint = computed(() => ["xs", "sm"].includes(breakpoint.value));

  return {
    width,
    breakpoint,
    upToLargeBreakpoint,
    upToMediumBreakpoint,
    upToSmallBreakpoint,
  };
}
