all:
	@echo "Checking prerequisites..."
	@perl prereq.pl
clean:
	@rm -rf node_modules

.PHONY: all clean
