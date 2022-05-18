import SplitText from "@/utils/gsap/SplitText";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const useSplitText = (cssSelector: string, animationSettings: string) => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  requestAnimationFrame(() => {
    const splitTimeline = gsap.timeline();

    const SplitTextByCSSSelector = new SplitText(cssSelector, { type: "words,chars" });
    const { chars } = SplitTextByCSSSelector;

    let settings: Record<string, unknown>;
    const charsWave = {
      duration: 1.5,
      opacity: 0,
      scale: 1.1,
      y: 50,
      rotationX: 200,
      transformOrigin: "10% 100% -20%",
      ease: "back",
      stagger: 0.01,
    };
    const staggerFromEnd = {
      opacity: 0,
      y: 50,
      ease: "back(1)",
      stagger: {
        from: "start",
        each: 0.05,
      },
    };

    switch (animationSettings) {
      case "ChartsWave":
        settings = charsWave;
        break;

      case "staggerFromEnd":
        settings = staggerFromEnd;
        break;

      default:
        settings = charsWave;
        break;
    }

    splitTimeline.from(chars, settings, "+=0");
  });
};

export default useSplitText;
