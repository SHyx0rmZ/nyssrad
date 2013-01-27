all:
	@echo "Checking prerequisites..."
	@perl prereq.pl
	@npm install

clean:
	@rm -rf node_modules

install:
	mkdir /usr/share/nyssrad
	cp -vrf ./src /usr/share/nyssrad
	chmod +xxx /usr/share/nyssrad/src/nyssrad
	cp /usr/share/nyssrad/src/config.js.example /usr/share/nyssrad/src/config.js
	cp -vrf ./node_modules /usr/share/nyssrad
	ln -s /usr/share/nyssrad/src/nyssrad /usr/bin/nyssrad

uninstall:
	rm -vrf /usr/share/nyssrad
	rm /usr/bin/nyssrad

.PHONY: all clean
