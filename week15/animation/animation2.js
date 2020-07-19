export class Timeline {
  constructor() {
    this.animations = [];
  }
  tick() {
    const t = Date.now() - this.startTime;
    console.log("tick");
    for (let animation of this.animations) {
      if (t > animation.duration + animation.delay) continue;
      const {
        object,
        property,
        template,
        start,
        end,
        timingFunction,
        delay,
        duration
      } = animation;

      const progression = timingFunction((t - delay) / duration); // 0-1之间的数字
      const value = start + progression * (end - start);
      object[property] = template(value);
    }
    requestAnimationFrame(() => this.tick());
  }

  start() {
    this.startTime = Date.now();
    this.tick();
  }

  add(animation) {
    this.animations.push(animation);
  }
}

export class Animation {
  constructor(
    object,
    property,
    template,
    start,
    end,
    duration,
    delay,
    timingFunction
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
