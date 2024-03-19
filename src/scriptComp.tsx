import React, { useEffect } from "react";
import $ from "jquery"; // Make sure to install the @types/jquery package for TypeScript

const SendMarkRequest = (id: string | null = null) => {
  return $.ajax("#", {
    method: "POST",
    data: {
      _token: "rQ0LC9yj8p7myi0KpKekssAg9Z3KGgVlbIRsBzFF",
      id,
    },
  });
};

const ChangeTemplate = (value: any) => {
  let url = "#";
  window.location.href = url;
};

const handleThemeToggle = () => {
  const btn = document.querySelector(".btn-theme-toggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const body = document.body;
      const moonStarsSpan = document.querySelector(".btn-theme-toggle > span");

      if (body.classList.contains("light-theme")) {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        if (moonStarsSpan) {
          moonStarsSpan.classList.remove("fa-moon-stars");
          moonStarsSpan.classList.add("fa-sun-bright");
        }
      } else if (body.classList.contains("dark-theme")) {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        if (moonStarsSpan) {
          moonStarsSpan.classList.remove("fa-sun-bright");
          moonStarsSpan.classList.add("fa-moon-stars");
        }
      } else {
        if (moonStarsSpan) {
          moonStarsSpan.classList.remove("fa-moon-stars");
          moonStarsSpan.classList.add("fa-sun-bright");
        }
        body.classList.add("dark-theme");
      }
    });
  }
};

const AddRippleEffect = () => {
  useEffect(() => {
    const startEvent =
      navigator.userAgent.includes("iPhone") ||
      navigator.userAgent.includes("iPad") ||
      navigator.userAgent.includes("iPod")
        ? "touchstart"
        : "mousedown";
    const moveEvent =
      navigator.userAgent.includes("iPhone") ||
      navigator.userAgent.includes("iPad") ||
      navigator.userAgent.includes("iPod")
        ? "touchmove"
        : "mousemove";
    const endEvent: any =
      navigator.userAgent.includes("iPhone") ||
      navigator.userAgent.includes("iPad") ||
      navigator.userAgent.includes("iPod")
        ? "touchend"
        : "mouseup";

    let ink: JQuery<HTMLElement> | null | any, d: number, x: number, y: number;

    $(".ripple").on(startEvent, (e: any) => {
      const target: any = $(e.currentTarget);
      if (target.find(".ink").length === 0) {
        target.prepend("<span class='ink'></span>");
      }
      ink = target.find(".ink");
      if (ink) {
        ink.removeClass("animate");
        if (!ink.height() && !ink.width()) {
          d = Math.max(target.outerWidth(), target.outerHeight());
          ink.css({
            height: d,
            width: d,
          });
        }
        x = e.originalEvent.pageX - target.offset().left - ink.width() / 2;
        y = e.originalEvent.pageY - target.offset().top - ink.height() / 2;
        ink
          .css({
            top: y + "px",
            left: x + "px",
          })
          .addClass("animate");
      }
    });

    return () => {
      $(".ripple").off(startEvent, moveEvent, endEvent);
    };
  }, []);
};

const ScriptComp: React.FC = () => {
  useEffect(() => {
    handleThemeToggle();
    AddRippleEffect();
  }, []);

  return <div>{/* Your component JSX goes here */}</div>;
};

export default ScriptComp;
