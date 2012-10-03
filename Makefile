all:
	@echo "Checking prerequisites..."
	@perl prereq.pl
clean:
	@rm -rf node_modules

install:
	mkdir /usr/share/nyssrad
	cp -vrf ./src /usr/share/nyssrad
	mkdir /usr/share/nyssrad/bin
	echo "node /usr/share/nyssrad/src/nyssrad.js" > /usr/share/nyssrad/bin/nyssrad
	chmod +xxx /usr/share/nyssrad/bin/nyssrad
	cp -vrf ./node_modules /usr/share/nyssrad
	ln -s /usr/share/nyssrad/bin/nyssrad /usr/bin/nyssrad

uninstall:
	rm -vrf /usr/share/nyssrad
	rm /usr/bin/nyssrad

.PHONY: all clean
