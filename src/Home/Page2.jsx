import React from 'react';
import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import { Button } from 'antd';

function Page2() {
  return (
    <div className="home-page page2">
      <div className="home-page-wrapper">
        <div className="title-line-wrapper page2-line">
          <div className="title-line" />
        </div>
        <h2>Let’s <span>Coding</span></h2>
        <OverPack>
          <QueueAnim key="queue" type="bottom" leaveReverse className="page2-content">
            <p key="p" className="page-content">
              是否还记得你敲下的第一行代码
            </p>
            <div key="code1" className="home-code">
              <div>
                $ <span>print</span>("hello world")
              </div>
              <div>
                  hello world
              </div>
              <div>$ <span>x</span> = 5</div>
              <div>$ <span>print</span>(x)</div>
              <div>
                  5
              </div>
            </div>
            <p key="p2" className="page-content">
              需要帮助？请先阅读
              <a> 《Python3 反爬虫原理与绕过实战》 </a>
              如果未能解决，可以添加作者韦世东的微信
              <a> vansenb </a>进行提问。
            </p>
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}

export default Page2;
