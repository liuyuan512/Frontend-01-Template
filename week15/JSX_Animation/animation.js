export class Timeline {
  constructor() {
    this.animations = [];
    this.animationId = null;
    this.state = "inited";
  }

  tick() {
    const t = Date.now() - this.startTime;
    console.log("tick", t);

    let animations = this.animations.filter(animation => !animation.finished);
    for (let animation of this.animations) {
      // if (t > animation.duration + animation.delay) continue;
      const {
        object,
        property,
        template,
        start,
        end,
        timingFunction,
        delay,
        duration,
        addTime
      } = animation;

      const progression = timingFunction((t - delay - addTime) / duration); // 0-1之间的数字
      if (t > duration + delay + addTime) {
        animation.finished = true;
      }

      const value = animation.valueFromProgression(progression);

      object[property] = template(value);
    }
    if (animations.length) {
      this.animationId = requestAnimationFrame(() => this.tick());
    }
  }

  pause() {
    if (this.state !== "playing") return;
    this.state = "paused";
    this.pauseTime = Date.now();
    if (this.animationId !== null) cancelAnimationFrame(this.animationId);
  }

  resume() {
    if (this.state !== "paused") return;
    this.state = "playing";
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }
  start() {
    if (this.state !== "inited") return;
    this.state = "playing";
    this.startTime = Date.now();
    this.tick();
  }

  restart() {
    if (this.state === "playing") {
      this.pause();
    }
    this.animations = [];
    this.animationId = null;
    this.state = "playing";
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
  }

  add(animation, addTime) {
    this.animations.push(animation);
    animation.finished = false;
    if (this.state === "playing") {
      animation.addTime =
        addTime !== void 0 ? addTime : Date.now() - this.startTime;
    } else {
      animation.addTime = addTime !== void 0 ? addTime : 0;
    }
  }
}

export class Animation {
  constructor(
    object,
    property,
    start,
    end,
    duration,
    delay,
    timingFunction,
    template
  ) {
    this.object = object;
    this.property = property;
    this.template = template;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    this.timingFunction =
      timingFunction ||
      ((start, end) => {
        return t => start + (t / duration) * (end - start);
      });
  }

  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start); // value就是根据progression算出的值
  }
}

export class ColorAnimation {
  constructor(
    object,
    property,
    start,
    end,
    duration,
    delay,
    timingFunction,
    template
  ) {
    this.object = object;
    this.template = template || (v => `rgba(${v.r},${v.g},${v.b},${v.a})`);
    this.property = property;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    this.timingFunction =
      timingFunction ||
      ((start, end) => {
        return t => start + (t / duration) * (end - start);
      });
  }

  valueFromProgression(progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a)
    }; // value就是根据progression算出的值
  }
}

/*

let animation = new Animation(object,property,start,end,duration,delay,timingFunction);
let animation2 = new Animation(object,property,start,end,duration,delay,timingFunction);

let timeline = new Timeline;
timeline.add(animation);
timeline.add(animation2);

timeline.start()
timeline.pasue()
timeline.resume()
timeline.stop()


animation.start()
animation2.start()

animation.stop()
animation2.stop()

animation.pause()
animation2.pause()

animation.stop()
animation2.stop()

setTimeout
setInterval
requestAnimationFrame

*/
