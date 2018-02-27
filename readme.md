### Installation instructions:

Instructions for deploying on a server:
1. Go to `/var/`
	```console
	$ cd /var
	```

2. Create a directory named `node`:
	```console
	$ mkdir node
	$ cd node
	```

3. Download library:
	```console
	$ clone https://github.com/evasiarri/green-coat.git
	$ cd green-coat
	```

4. Define the database authentication details in the file `green-coat/src/resources.js`:
	```javascript
	/* ... */
	const DB_CONSTS = {
	    SERVER_NAME: '<YOUR_HOST>',
	    DB_NAME: '<YOUR_DB_NAME>',
	    USERNAME: '<YOUR_DB_USERNAME>',
	    PASSWORD: '<YOUR_DB_PASSWORD>',
	    PORT: <YOUR_DB_PORT>
	};
	/* ... */
	```

5. Define the server proxy in the file `green-coat/client/package.json`:
	```javascript
	/* ... */
	"proxy": "http(s)://<YOUR_HOST_ADDR>:3001",
	/* ... */
	```

6. Install required libraries:
	```console
	$ cd /var/node/green-coat/
	$ npm install
	$ cd client
	$ npm install
	$ cd ../employee-client
	$ npm install
	$ cd ..
	```

7. Put the files `systemd-services/greencoat_server.service`, `systemd-services/greencoat_client.service`, `systemd-services/greencoat_employee.service` under `/lib/systemd/system/`.
	```console
	$ sudo cp /var/node/green-coat/systemd-services/*.service /lib/systemd/system/
	$ sudo systemctl daemon-reload
	```

8. Now we have 3 new services named: `greencoat_server`, `greencoat_client`, `greencoat_employee`. Run these commands in order to start the new services by default upon startup:
	```console
	$ sudo systemctl enable greencoat_server
	$ sudo systemctl enable greencoat_client
	$ sudo systemctl enable greencoat_employee
	```

9. Run these commands in order to start the new services now:
	```console
	$ sudo systemctl start greencoat_server
	$ sudo systemctl start greencoat_client
	$ sudo systemctl start greencoat_employee
	```

10. Now you can use these commands to investigate and handle the services:
	```console
	$ journalctl -u greencoat_employee
	$ systemctl enable greencoat_employee
	$ systemctl start greencoat_employee
	$ systemctl stop greencoat_employee
	$ systemctl status greencoat_employee
	```
