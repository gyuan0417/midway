import { Controller, Get, Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { HttpClient } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;
  @Get('/')
  async home() {
    return 'Hello Midwayjs!';
  }
  @Get('/baidu')
  async updateData() {
    const httpclient = new HttpClient({
      headers: {
        'x-timeout': '5',
      },
      method: 'GET',
      timeout: 2000,
    });

    const result = await httpclient.request('https://www.baidu.com/');
    const data = result.data;
    return data.toString();
  }
  @Get('/data')
  async getDate() {
    const http = require('http');
    const https = require('https');
    const cheerio = require('cheerio');
    // 该对象解析网页中的数据
    const filterData = data => {
      // console.log('整个页面',data);
      const $ = cheerio.load(data);
      console.log('通过cheerio插件获取我们想要的dom的索引:', data.toString());
      $('#lg').each((index, el) => {
        console.log('通过cheerio插件获取我们想要的dom的索引:', index);
        console.log('通过cheerio插件获取我们想要的dom:', $(el).text());
      });
    };
    // 创建一个服务，请求url，交给上面的对象进行解析
    const server = http.createServer((req, res) => {
      let data = '';
      https.get('https://www.baidu.com/', result => {
        result.on('data', chunk => {
          data += chunk;
        });
        result.on('end', () => {
          filterData(data);
        });
      });
    });

    // 开启一个端口，进行监听，该监听运行上面的一个对象
    server.listen(5080, () => {
      console.log('localhost:5080 Listen...');
    });
  }
}
