import React from "react";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  return (
    <div
      className={`flex min-h-full max-w-screen-md flex-col justify-center gap-5 px-6 md:px-10 2xl:max-w-7xl`}
    >
      <div className="text-2xl tracking-widest md:text-5xl">你好，我是</div>
      <strong
        className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-5xl font-black tracking-widest md:text-8xl"
        style={{ WebkitTextFillColor: "transparent" }}
      >
        哲理源
      </strong>
      <TypeAnimation
        className={`text-2xl tracking-widest md:text-5xl`}
        sequence={[
          500,
          "一名前端开发工程师 。",
          1000,
          "A Web <Developer /> .",
          1000,
        ]}
        speed={10}
        repeat={Infinity}
      />

      <div className="text-2xl tracking-widest md:text-5xl">
        喜欢<span className="font-semibold text-[#00d8ff]">React</span>、
        <span className="font-semibold text-[#007acc]">TypeScript</span>
        <span className="ml-4">\owo/ ~</span>
      </div>
      <div className="text-muted-foreground text-base tracking-widest md:text-2xl">
        我在这个网站记录我的成长，努力 💪 成为一个更好的程序员。
      </div>
    </div>
  );
};

export default Home;
