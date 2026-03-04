import { useEffect, useRef } from "react";
import RiseLogo from "../../assets/shared/rise-logo.svg";
import "./Splash.css";

type SplashProps = {
  to: string;
};

export default function Splash({ to }: SplashProps) {
  const fade = 400;
  const splashRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const maskRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const splash = splashRef.current;
    const logo = logoRef.current;
    const span = spanRef.current;
    const mask = maskRef.current;

    const onLoad = () => {
      logo?.classList.add("run-expand");
    };

    const onLogoAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName === "expand") {
        mask?.classList.add("slide-out");
      }
    };

    const onMaskAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName === "slide-out") {
        setTimeout(() => {
          span?.classList.add("run-typography-animation");
        }, 500);
      }
    };

    const onSpanAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName === "typography-animation") {
        setTimeout(() => {
          splash?.classList.add("hide");
        }, 600);

        setTimeout(() => {
          window.location.replace(to);
        }, 600);
      }
    };

    window.addEventListener("load", onLoad);
    logo?.addEventListener("animationend", onLogoAnimationEnd);
    mask?.addEventListener("animationend", onMaskAnimationEnd);
    span?.addEventListener("animationend", onSpanAnimationEnd);

    if (document.readyState === "complete") {
      onLoad();
    }

    return () => {
      window.removeEventListener("load", onLoad);
      logo?.removeEventListener("animationend", onLogoAnimationEnd);
      mask?.removeEventListener("animationend", onMaskAnimationEnd);
      span?.removeEventListener("animationend", onSpanAnimationEnd);
    };
  }, [to]);

  return (
    <div id="splash" className="splash" ref={splashRef}>
      <img ref={logoRef} src={RiseLogo.src} alt="Rise Logo" className="logo" />

      <div className="text-container">
        <span ref={maskRef} className="mask" data-mask="reveal"></span>
        <p>
          idiomas para <span ref={spanRef}>todos</span>.
        </p>
      </div>
    </div>
  );
}
