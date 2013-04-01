
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

test: build
	serve -p 9200 &
	open http://localhost:9200/test


.PHONY: clean test
