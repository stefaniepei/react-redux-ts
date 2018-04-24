# 运维部署文档

## 一、开发环境

### node版本
* 8.9.0 （可能会根据版本迭代变更）


## 二、部署流程

### 1.在服务器存放该项目的地方拉取gitlab仓库上的代码
```
https://github.com/stefaniepei/react-redux-ts.git
```

### 2.进入文件夹内安装前端所需要的包
```
$ npm install -g cnpm
$ npm install -g ts-node
$ npm install -g typescript
$ cnpm install
```

### 3.打包命令
```
npm run deploy
```

### 4.nginx反向代理配置参考 /data1/app/services/nginx/conf/nginx.conf
````bash
http {
  include       mime.types;
  default_type  application/octet-stream;
  # max_ranges    0;
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

  log_format ip_log '$http_x_forwarded_for - $remote_user [$time_local] '
                      '"$request" $status $body_bytes_sent'
                      '"$http_referer" "$http_user_agent"';

  server_names_hash_bucket_size 128;
  client_header_buffer_size 32k;
  large_client_header_buffers 4 64k;
  client_max_body_size 100m;
  sendfile        on;
  tcp_nopush      on;
  tcp_nodelay     on;
  keepalive_timeout  120;
  server_tokens off;
  fastcgi_connect_timeout 120;
  fastcgi_send_timeout 120;
  fastcgi_read_timeout 120;
  fastcgi_buffer_size 64k;
  fastcgi_buffers 4 64k;
  fastcgi_busy_buffers_size 128k;
  fastcgi_temp_file_write_size 128k;
  fastcgi_intercept_errors on;
    
  #gzip
  gzip on;
  gzip_min_length 1k;
  gzip_buffers 4 16k;
  gzip_http_version 1.0;
  gzip_comp_level 2;
  gzip_types text/plain application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
  gzip_vary off;
  gzip_disable "MSIE [1-6]\.";

  output_buffers   1 32k;
  postpone_output  1460;

  server {
      listen 8806;
      listen       443;

      server_name  localhost;
      root /data2/www/react-redux-ts/dist;
      access_log off;
      #access_log /data1/app/services/nginx/logs/access.log ip_log;
      error_log  /data1/app/services/nginx/logs/error.log warn;

      location / {
        index  index.html index.htm;
        proxy_buffer_size 64k;
        proxy_buffers   32 32k;
        proxy_busy_buffers_size 128k;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP       $remote_addr;
        proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
        root /data2/www/react-redux-ts/dist;
      }

      location ~ .*\.(jpg|jpeg|png|gif|bmp|js|css|swf|ico)$ {
        expires 30d;
        access_log off;
      }
      location /favicon.ico {
        root /data2/www/react-redux-ts/dist;
        log_not_found off;
        access_log off;
      }
      location ~* {
        rewrite .* /index.html break;
        root /data2/www/react-redux-ts/dist;
      }
  }
  include /data1/app/services/nginx/conf/vhost/*.conf;
}
````
