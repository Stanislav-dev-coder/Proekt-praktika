upstream eee.yyy {
				## Can be connected with "ngproxy" network
			# 
			server 127.0.0.1:3010;
}
server {
	server_name eee.yyy;
	listen 80 ;
	access_log  /var/www/log/eee-access.log;
	location / {
		proxy_pass http://eee.yyy;
	}
}

