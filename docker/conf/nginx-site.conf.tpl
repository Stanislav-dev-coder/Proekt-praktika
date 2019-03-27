upstream react.test {
				## Can be connected with "ngproxy" network
			#
			server 127.0.0.1:3000;
}
server {
	server_name react.test;
	listen 80 ;
	access_log  /var/www/log/react-access.log;
	location / {
		proxy_pass http://react.test;
	}
}
