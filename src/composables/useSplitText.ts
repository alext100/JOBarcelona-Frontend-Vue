import SplitText from "@/utils/gsap/SplitText.min";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

/**
 * Function that apply gsap library plugins ScrollTrigger, SplitText to HTML Elements and make wow effect
 * @example
     import useBreakpoints from "@/composables/useBreakpoints";
     useSplitText(".gift-card__header", "ChartsWave");
     useSplitText(".gift-card__tag", "staggerFromEnd");

     First argument is css selector of target element, second is method to apply
 */

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
